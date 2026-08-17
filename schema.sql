-- ============================================================
-- PortBuilder MySQL Database Schema
-- Compatible with MySQL Workbench & MySQL 5.7+ / 8.0+
-- ============================================================

-- 1. Create & Select Database
CREATE DATABASE IF NOT EXISTS portfolio_builder
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE portfolio_builder;

-- 2. Users Table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  full_name VARCHAR(255) DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Portfolios Table
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
  CONSTRAINT fk_portfolios_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Skills Table
CREATE TABLE IF NOT EXISTS skills (
  id VARCHAR(36) PRIMARY KEY,
  portfolio_id VARCHAR(36) NOT NULL,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(100) DEFAULT 'General',
  proficiency INT DEFAULT 80,
  sort_order INT DEFAULT 0,
  CONSTRAINT fk_skills_portfolio FOREIGN KEY (portfolio_id) REFERENCES portfolios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Projects Table
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
  CONSTRAINT fk_projects_portfolio FOREIGN KEY (portfolio_id) REFERENCES portfolios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Experiences Table
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
  CONSTRAINT fk_experiences_portfolio FOREIGN KEY (portfolio_id) REFERENCES portfolios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Education Table
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
  CONSTRAINT fk_education_portfolio FOREIGN KEY (portfolio_id) REFERENCES portfolios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id VARCHAR(36) PRIMARY KEY,
  portfolio_id VARCHAR(36) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) DEFAULT '',
  company VARCHAR(255) DEFAULT '',
  text TEXT NOT NULL,
  image VARCHAR(500) DEFAULT '',
  sort_order INT DEFAULT 0,
  CONSTRAINT fk_testimonials_portfolio FOREIGN KEY (portfolio_id) REFERENCES portfolios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Analytics Table
CREATE TABLE IF NOT EXISTS analytics (
  id VARCHAR(36) PRIMARY KEY,
  portfolio_id VARCHAR(36) NOT NULL,
  page_path VARCHAR(500) DEFAULT '/',
  referrer VARCHAR(500) DEFAULT '',
  user_agent VARCHAR(500) DEFAULT '',
  ip_address VARCHAR(45) DEFAULT '',
  visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_analytics_portfolio FOREIGN KEY (portfolio_id) REFERENCES portfolios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. Feedbacks Table
CREATE TABLE IF NOT EXISTS feedbacks (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  category VARCHAR(100) DEFAULT 'General',
  rating INT DEFAULT 5,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
