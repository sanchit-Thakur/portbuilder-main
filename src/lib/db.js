import mysql from 'mysql2/promise';

let pool = null;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'portfolio_builder',
      port: parseInt(process.env.MYSQL_PORT || '3306'),
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}

export async function query(sql, params = []) {
  const pool = getPool();
  const [rows] = await pool.execute(sql, params);
  return rows;
}

export async function queryOne(sql, params = []) {
  const rows = await query(sql, params);
  return rows[0] || null;
}

export async function initDatabase() {
  const dbName = process.env.MYSQL_DATABASE || 'portfolio_builder';
  
  // Connect to MySQL server without selecting a database first to ensure it exists
  const bootstrapConnection = await mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    port: parseInt(process.env.MYSQL_PORT || '3306'),
  });
  
  await bootstrapConnection.execute(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
  await bootstrapConnection.end();

  const pool = getPool();
  const connection = await pool.getConnection();

  try {
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        username VARCHAR(100) UNIQUE NOT NULL,
        full_name VARCHAR(255) DEFAULT '',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
    // Drop previous feedbacks table to recreate with new schema (without portfolio_id)
    try {
      await connection.execute(`DROP TABLE IF EXISTS feedbacks`);
    } catch (e) {}

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

    console.log('✅ Database tables initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization error:', error.message);
    throw error;
  } finally {
    connection.release();
  }
}

// Initialize database on first import
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
