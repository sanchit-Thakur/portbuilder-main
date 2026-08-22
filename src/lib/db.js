import fs from 'fs';
import path from 'path';

// Use globalThis to maintain database connections across Next.js HMR reloads
const globalForDb = globalThis;

if (!globalForDb._portbuilderDbState) {
  globalForDb._portbuilderDbState = {
    mysqlPool: null,
    sqliteDb: null,
    dbEngine: null,
    getEnginePromise: null,
    dbInitPromise: null,
  };
}

const dbState = globalForDb._portbuilderDbState;

function getMysqlConfig() {
  const connectionUri = process.env.DATABASE_URL || process.env.MYSQL_URL || process.env.MYSQL_URI;
  if (connectionUri) {
    try {
      const url = new URL(connectionUri);
      const host = url.hostname;
      const port = url.port ? parseInt(url.port) : 3306;
      const user = decodeURIComponent(url.username || '');
      const password = decodeURIComponent(url.password || '');
      const database = url.pathname.replace(/^\//, '') || 'portfolio_builder';
      const isLocal = host === 'localhost' || host === '127.0.0.1';
      const ssl = (!isLocal || process.env.MYSQL_SSL === 'true') ? { rejectUnauthorized: false } : undefined;
      return { host, port, user, password, database, ssl };
    } catch (e) {
      console.warn('⚠️ Could not parse connection URL, falling back to direct env vars:', e.message);
    }
  }

  if (process.env.MYSQL_HOST && process.env.MYSQL_USER) {
    const host = process.env.MYSQL_HOST;
    const isLocal = host === 'localhost' || host === '127.0.0.1';
    const ssl = (!isLocal || process.env.MYSQL_SSL === 'true') ? { rejectUnauthorized: false } : undefined;
    return {
      host,
      port: parseInt(process.env.MYSQL_PORT || '3306'),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'portfolio_builder',
      ssl,
    };
  }

  return null;
}

export async function getEngine() {
  if (dbState.dbEngine) return dbState.dbEngine;

  if (dbState.getEnginePromise) {
    return dbState.getEnginePromise;
  }

  dbState.getEnginePromise = (async () => {
    // Dynamically load .env.local if MYSQL_HOST / DATABASE_URL is not yet loaded into process.env
    if (!process.env.MYSQL_HOST && !process.env.DATABASE_URL) {
      try {
        const envPath = path.join(process.cwd(), '.env.local');
        if (fs.existsSync(envPath)) {
          const content = fs.readFileSync(envPath, 'utf8');
          content.split('\n').forEach(line => {
            const match = line.match(/^\s*([\w_]+)\s*=\s*(.*)\s*$/);
            if (match && !process.env[match[1]]) {
              process.env[match[1]] = match[2].trim();
            }
          });
        }
      } catch {}
    }

    const mysqlConfig = getMysqlConfig();

    if (mysqlConfig) {
      try {
        const mysql = await import('mysql2/promise');

        // Bootstrap: Attempt to create database if permitted (e.g. local MySQL)
        try {
          const bootstrapConnection = await mysql.createConnection({
            host: mysqlConfig.host,
            user: mysqlConfig.user,
            password: mysqlConfig.password,
            port: mysqlConfig.port,
            ssl: mysqlConfig.ssl,
            connectTimeout: 4000,
          });
          await bootstrapConnection.execute(`CREATE DATABASE IF NOT EXISTS \`${mysqlConfig.database}\``);
          await bootstrapConnection.end();
        } catch (bootstrapErr) {
          // Cloud providers may restrict CREATE DATABASE, which is normal
        }

        dbState.mysqlPool = mysql.createPool({
          host: mysqlConfig.host,
          user: mysqlConfig.user,
          password: mysqlConfig.password,
          database: mysqlConfig.database,
          port: mysqlConfig.port,
          ssl: mysqlConfig.ssl,
          waitForConnections: true,
          connectionLimit: 5,
          queueLimit: 0,
          connectTimeout: 5000,
          enableKeepAlive: true,
          keepAliveInitialDelay: 10000,
        });

        // Quick ping test
        const conn = await dbState.mysqlPool.getConnection();
        conn.release();
        dbState.dbEngine = 'mysql';
        console.log(`✅ Using MySQL database engine (${mysqlConfig.host}:${mysqlConfig.port}/${mysqlConfig.database})`);
        return dbState.dbEngine;
      } catch (err) {
        console.warn('⚠️ MySQL connection failed, falling back to SQLite:', err.message);
        if (dbState.mysqlPool) {
          try { await dbState.mysqlPool.end(); } catch {}
          dbState.mysqlPool = null;
        }
      }
    }

    // Fallback to SQLite (zero config, works everywhere)
    if (dbState.sqliteDb) {
      dbState.dbEngine = 'sqlite';
      return dbState.dbEngine;
    }

    try {
      const Database = (await import('better-sqlite3')).default;
      
      // Determine writable directory for SQLite file
      let dbDir = path.join(process.cwd(), 'data');
      let isWritable = false;
      try {
        if (!fs.existsSync(dbDir)) {
          fs.mkdirSync(dbDir, { recursive: true });
        }
        const testFile = path.join(dbDir, `.perm_test_${Date.now()}`);
        fs.writeFileSync(testFile, '1');
        fs.unlinkSync(testFile);
        isWritable = true;
      } catch {
        isWritable = false;
      }

      if (!isWritable) {
        dbDir = '/tmp';
        try {
          if (!fs.existsSync(dbDir)) {
            fs.mkdirSync(dbDir, { recursive: true });
          }
        } catch {}
      }

      const dbPath = path.join(dbDir, 'portbuilder.db');

      try {
        dbState.sqliteDb = new Database(dbPath, { readonly: false, timeout: 5000 });
        try {
          dbState.sqliteDb.pragma('journal_mode = WAL');
        } catch {
          dbState.sqliteDb.pragma('journal_mode = DELETE');
        }
      } catch (sqliteOpenErr) {
        console.warn(`⚠️ Primary SQLite path (${dbPath}) failed to open (${sqliteOpenErr.message}), trying fallback /tmp path...`);
        const fallbackDbPath = path.join('/tmp', 'portbuilder.db');
        dbState.sqliteDb = new Database(fallbackDbPath, { readonly: false, timeout: 5000 });
        dbState.sqliteDb.pragma('journal_mode = DELETE');
      }

      dbState.sqliteDb.pragma('foreign_keys = ON');
      dbState.dbEngine = 'sqlite';
      console.log(`✅ Using SQLite database engine (${dbState.sqliteDb.name || dbPath})`);
      return dbState.dbEngine;
    } catch (err) {
      console.error('❌ Failed to initialize SQLite engine:', err);
      throw err;
    }
  })().catch((err) => {
    dbState.getEnginePromise = null;
    throw err;
  });

  return dbState.getEnginePromise;
}

export async function query(sql, params = []) {
  const engine = await getEngine();
  const sanitizedParams = params.map(p => (p === undefined ? null : typeof p === 'boolean' ? (p ? 1 : 0) : p));
  
  if (engine === 'mysql') {
    const [rows] = await dbState.mysqlPool.execute(sql, sanitizedParams);
    return rows;
  } else {
    // SQLite query execution
    const trimmedSql = sql.trim();
    const isSelect = /^SELECT/i.test(trimmedSql);
    
    if (isSelect) {
      const stmt = dbState.sqliteDb.prepare(sql);
      return stmt.all(...sanitizedParams);
    } else {
      const stmt = dbState.sqliteDb.prepare(sql);
      const res = stmt.run(...sanitizedParams);
      return res;
    }
  }
}

export async function queryOne(sql, params = []) {
  const rows = await query(sql, params);
  if (Array.isArray(rows)) {
    return rows[0] || null;
  }
  return rows || null;
}

export async function initDatabase() {
  const engine = await getEngine();

  if (engine === 'mysql') {
    const connection = await dbState.mysqlPool.getConnection();
    try {
      await connection.execute(`
        CREATE TABLE IF NOT EXISTS users (
          id VARCHAR(36) PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          username VARCHAR(100) UNIQUE NOT NULL,
          full_name VARCHAR(255) DEFAULT '',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      await connection.execute(`
        CREATE TABLE IF NOT EXISTS portfolios (
          id VARCHAR(36) PRIMARY KEY,
          user_id VARCHAR(36) NOT NULL,
          theme VARCHAR(50) DEFAULT 'minimal-elegance',
          accent_color VARCHAR(7) DEFAULT '#6C63FF',
          tagline VARCHAR(500) DEFAULT '',
          bio TEXT,
          profile_image VARCHAR(500) DEFAULT '',
          hero_title VARCHAR(255) DEFAULT '',
          hero_subtitle VARCHAR(500) DEFAULT '',
          cta_text VARCHAR(100) DEFAULT 'View My Work',
          cta_link VARCHAR(255) DEFAULT '#projects',
          about_text TEXT,
          about_image VARCHAR(500) DEFAULT '',
          resume_url VARCHAR(500) DEFAULT '',
          location VARCHAR(255) DEFAULT '',
          phone VARCHAR(50) DEFAULT '',
          website VARCHAR(255) DEFAULT '',
          linkedin VARCHAR(255) DEFAULT '',
          github VARCHAR(255) DEFAULT '',
          twitter VARCHAR(255) DEFAULT '',
          dribbble VARCHAR(255) DEFAULT '',
          behance VARCHAR(255) DEFAULT '',
          youtube VARCHAR(255) DEFAULT '',
          instagram VARCHAR(255) DEFAULT '',
          sections_order JSON DEFAULT NULL,
          is_published BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);

      await connection.execute(`
        CREATE TABLE IF NOT EXISTS skills (
          id VARCHAR(36) PRIMARY KEY,
          portfolio_id VARCHAR(36) NOT NULL,
          name VARCHAR(100) NOT NULL,
          category VARCHAR(100) DEFAULT 'General',
          proficiency INT DEFAULT 80,
          sort_order INT DEFAULT 0,
          FOREIGN KEY (portfolio_id) REFERENCES portfolios(id) ON DELETE CASCADE
        )
      `);

      await connection.execute(`
        CREATE TABLE IF NOT EXISTS projects (
          id VARCHAR(36) PRIMARY KEY,
          portfolio_id VARCHAR(36) NOT NULL,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          short_description VARCHAR(500) DEFAULT '',
          image VARCHAR(500) DEFAULT '',
          tech_stack JSON DEFAULT NULL,
          live_url VARCHAR(500) DEFAULT '',
          github_url VARCHAR(500) DEFAULT '',
          category VARCHAR(100) DEFAULT '',
          impact_metrics VARCHAR(500) DEFAULT '',
          featured BOOLEAN DEFAULT FALSE,
          sort_order INT DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (portfolio_id) REFERENCES portfolios(id) ON DELETE CASCADE
        )
      `);

      await connection.execute(`
        CREATE TABLE IF NOT EXISTS experiences (
          id VARCHAR(36) PRIMARY KEY,
          portfolio_id VARCHAR(36) NOT NULL,
          company VARCHAR(255) NOT NULL,
          role VARCHAR(255) NOT NULL,
          description TEXT,
          start_date VARCHAR(20) DEFAULT '',
          end_date VARCHAR(20) DEFAULT '',
          is_current BOOLEAN DEFAULT FALSE,
          location VARCHAR(255) DEFAULT '',
          sort_order INT DEFAULT 0,
          FOREIGN KEY (portfolio_id) REFERENCES portfolios(id) ON DELETE CASCADE
        )
      `);

      await connection.execute(`
        CREATE TABLE IF NOT EXISTS education (
          id VARCHAR(36) PRIMARY KEY,
          portfolio_id VARCHAR(36) NOT NULL,
          institution VARCHAR(255) NOT NULL,
          degree VARCHAR(255) NOT NULL,
          field VARCHAR(255) DEFAULT '',
          start_date VARCHAR(20) DEFAULT '',
          end_date VARCHAR(20) DEFAULT '',
          description TEXT,
          sort_order INT DEFAULT 0,
          FOREIGN KEY (portfolio_id) REFERENCES portfolios(id) ON DELETE CASCADE
        )
      `);

      await connection.execute(`
        CREATE TABLE IF NOT EXISTS testimonials (
          id VARCHAR(36) PRIMARY KEY,
          portfolio_id VARCHAR(36) NOT NULL,
          name VARCHAR(255) NOT NULL,
          role VARCHAR(255) DEFAULT '',
          company VARCHAR(255) DEFAULT '',
          text TEXT NOT NULL,
          image VARCHAR(500) DEFAULT '',
          sort_order INT DEFAULT 0,
          FOREIGN KEY (portfolio_id) REFERENCES portfolios(id) ON DELETE CASCADE
        )
      `);

      await connection.execute(`
        CREATE TABLE IF NOT EXISTS analytics (
          id VARCHAR(36) PRIMARY KEY,
          portfolio_id VARCHAR(36) NOT NULL,
          page_path VARCHAR(500) DEFAULT '/',
          referrer VARCHAR(500) DEFAULT '',
          user_agent VARCHAR(500) DEFAULT '',
          ip_address VARCHAR(45) DEFAULT '',
          visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (portfolio_id) REFERENCES portfolios(id) ON DELETE CASCADE
        )
      `);

      await connection.execute(`
        CREATE TABLE IF NOT EXISTS feedbacks (
          id VARCHAR(36) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          category VARCHAR(100) DEFAULT 'General',
          rating INT DEFAULT 5,
          message TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      connection.release();
    } catch (err) {
      connection.release();
      throw err;
    }
  } else {
    // SQLite Tables Creation
    dbState.sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        username TEXT UNIQUE NOT NULL,
        full_name TEXT DEFAULT '',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS portfolios (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        theme TEXT DEFAULT 'minimal-elegance',
        accent_color TEXT DEFAULT '#6C63FF',
        tagline TEXT DEFAULT '',
        bio TEXT,
        profile_image TEXT DEFAULT '',
        hero_title TEXT DEFAULT '',
        hero_subtitle TEXT DEFAULT '',
        cta_text TEXT DEFAULT 'View My Work',
        cta_link TEXT DEFAULT '#projects',
        about_text TEXT,
        about_image TEXT DEFAULT '',
        resume_url TEXT DEFAULT '',
        location TEXT DEFAULT '',
        phone TEXT DEFAULT '',
        website TEXT DEFAULT '',
        linkedin TEXT DEFAULT '',
        github TEXT DEFAULT '',
        twitter TEXT DEFAULT '',
        dribbble TEXT DEFAULT '',
        behance TEXT DEFAULT '',
        youtube TEXT DEFAULT '',
        instagram TEXT DEFAULT '',
        sections_order TEXT DEFAULT NULL,
        is_published INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS skills (
        id TEXT PRIMARY KEY,
        portfolio_id TEXT NOT NULL,
        name TEXT NOT NULL,
        category TEXT DEFAULT 'General',
        proficiency INTEGER DEFAULT 80,
        sort_order INTEGER DEFAULT 0,
        FOREIGN KEY (portfolio_id) REFERENCES portfolios(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        portfolio_id TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        short_description TEXT DEFAULT '',
        image TEXT DEFAULT '',
        tech_stack TEXT DEFAULT NULL,
        live_url TEXT DEFAULT '',
        github_url TEXT DEFAULT '',
        category TEXT DEFAULT '',
        impact_metrics TEXT DEFAULT '',
        featured INTEGER DEFAULT 0,
        sort_order INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (portfolio_id) REFERENCES portfolios(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS experiences (
        id TEXT PRIMARY KEY,
        portfolio_id TEXT NOT NULL,
        company TEXT NOT NULL,
        role TEXT NOT NULL,
        description TEXT,
        start_date TEXT DEFAULT '',
        end_date TEXT DEFAULT '',
        is_current INTEGER DEFAULT 0,
        location TEXT DEFAULT '',
        sort_order INTEGER DEFAULT 0,
        FOREIGN KEY (portfolio_id) REFERENCES portfolios(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS education (
        id TEXT PRIMARY KEY,
        portfolio_id TEXT NOT NULL,
        institution TEXT NOT NULL,
        degree TEXT NOT NULL,
        field TEXT DEFAULT '',
        start_date TEXT DEFAULT '',
        end_date TEXT DEFAULT '',
        description TEXT,
        sort_order INTEGER DEFAULT 0,
        FOREIGN KEY (portfolio_id) REFERENCES portfolios(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS testimonials (
        id TEXT PRIMARY KEY,
        portfolio_id TEXT NOT NULL,
        name TEXT NOT NULL,
        role TEXT DEFAULT '',
        company TEXT DEFAULT '',
        text TEXT NOT NULL,
        image TEXT DEFAULT '',
        sort_order INTEGER DEFAULT 0,
        FOREIGN KEY (portfolio_id) REFERENCES portfolios(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS analytics (
        id TEXT PRIMARY KEY,
        portfolio_id TEXT NOT NULL,
        page_path TEXT DEFAULT '/',
        referrer TEXT DEFAULT '',
        user_agent TEXT DEFAULT '',
        ip_address TEXT DEFAULT '',
        visited_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (portfolio_id) REFERENCES portfolios(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS feedbacks (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        category TEXT DEFAULT 'General',
        rating INTEGER DEFAULT 5,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }
}

export function ensureDbInitialized() {
  if (!dbState.dbInitPromise) {
    dbState.dbInitPromise = initDatabase().catch((err) => {
      dbState.dbInitPromise = null;
      throw err;
    });
  }
  return dbState.dbInitPromise;
}
