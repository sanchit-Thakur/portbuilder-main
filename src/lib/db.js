import fs from 'fs';
import path from 'path';

let mysqlPool = null;
let sqliteDb = null;
let dbEngine = null; // 'mysql' | 'sqlite'

export async function getEngine() {
  if (dbEngine) return dbEngine;

  // Check if MySQL connection environment variables are explicitly provided
  const hasMysqlConfig = process.env.MYSQL_HOST && process.env.MYSQL_USER;

  if (hasMysqlConfig) {
    try {
      const mysql = await import('mysql2/promise');
      const dbName = process.env.MYSQL_DATABASE || 'portfolio_builder';

      // Bootstrap: Create database if it doesn't exist yet before creating pool
      try {
        const bootstrapConnection = await mysql.createConnection({
          host: process.env.MYSQL_HOST,
          user: process.env.MYSQL_USER,
          password: process.env.MYSQL_PASSWORD || '',
          port: parseInt(process.env.MYSQL_PORT || '3306'),
        });
        await bootstrapConnection.execute(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
        await bootstrapConnection.end();
      } catch (bootstrapErr) {
        console.warn('⚠️ MySQL bootstrap warning:', bootstrapErr.message);
      }

      mysqlPool = mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD || '',
        database: dbName,
        port: parseInt(process.env.MYSQL_PORT || '3306'),
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });

      // Quick ping test
      const conn = await mysqlPool.getConnection();
      conn.release();
      dbEngine = 'mysql';
      console.log('✅ Using MySQL database engine');
      return dbEngine;
    } catch (err) {
      console.warn('⚠️ MySQL connection failed, falling back to SQLite:', err.message);
    }
  }

  // Fallback to SQLite (zero config, works everywhere)
  try {
    const Database = (await import('better-sqlite3')).default;
    
    // Choose writable directory for SQLite file
    let dbDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dbDir)) {
      try {
        fs.mkdirSync(dbDir, { recursive: true });
      } catch {
        dbDir = '/tmp';
      }
    }
    const dbPath = path.join(dbDir, 'portbuilder.db');
    sqliteDb = new Database(dbPath);
    sqliteDb.pragma('journal_mode = WAL');
    sqliteDb.pragma('foreign_keys = ON');
    dbEngine = 'sqlite';
    console.log(`✅ Using SQLite database engine (${dbPath})`);
    return dbEngine;
  } catch (err) {
    console.error('❌ Failed to initialize SQLite engine:', err);
    throw err;
  }
}

export async function query(sql, params = []) {
  const engine = await getEngine();
  
  if (engine === 'mysql') {
    const [rows] = await mysqlPool.execute(sql, params);
    return rows;
  } else {
    // SQLite query execution
    // Sanitize JSON array bindings for SQLite
    const sanitizedParams = params.map(p => (typeof p === 'boolean' ? (p ? 1 : 0) : p));
    const trimmedSql = sql.trim();
    const isSelect = /^SELECT/i.test(trimmedSql);
    
    if (isSelect) {
      const stmt = sqliteDb.prepare(sql);
      return stmt.all(...sanitizedParams);
    } else {
      const stmt = sqliteDb.prepare(sql);
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
    const mysql = await import('mysql2/promise');
    const dbName = process.env.MYSQL_DATABASE || 'portfolio_builder';
    try {
      const bootstrapConnection = await mysql.createConnection({
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '',
        port: parseInt(process.env.MYSQL_PORT || '3306'),
      });
      await bootstrapConnection.execute(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
      await bootstrapConnection.end();
    } catch {}

    const connection = await mysqlPool.getConnection();
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
    sqliteDb.exec(`
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

let dbInitPromise = null;
export function ensureDbInitialized() {
  if (!dbInitPromise) {
    dbInitPromise = initDatabase().catch((err) => {
      dbInitPromise = null;
      throw err;
    });
  }
  return dbInitPromise;
}
