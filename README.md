<div align="center">

# 🚀 PortBuilder
43
**Build, customize, and deploy your developer portfolio in minutes.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Status](https://img.shields.io/badge/Status-Active-success.svg)]()

[Live Demo](https://your-demo-link.com) • [Report Bug](https://github.com/sanchit-Thakur/portbuilder/issues) • [Request Feature](https://github.com/sanchit-Thakur/portbuilder/issues)

</div>

---

## 📌 Overview

**PortBuilder** is an interactive web platform designed to help developers, designers, and creators generate sleek, responsive, and SEO-friendly personal portfolios without writing boilerplate code. Customize sections, preview in real time, and export your site instantly.

---

## ✨ Key Features

* **⚡ Real-time Live Preview:** Watch changes update instantaneously as you edit content and styles.
* **🎨 Modern Themes:** Switch effortlessly between curated dark, light, and gradient aesthetic templates.
* **🧩 Modular Sections:** Add, remove, and reorder Hero, About, Skills, Projects, Experience, and Contact components.
* **📱 Fully Responsive:** Clean layout architecture optimized across mobile, tablet, and desktop screens.
* **📦 Export & Deploy:** Download production-ready code or deploy directly to platforms like Vercel or GitHub Pages.

---

## 🛠️ Tech Stack

* **Frontend:** React / Next.js, Tailwind CSS
* **Icons & UI Components:** Lucide React / Radix UI
* **State Management:** Zustand / React Context
* **Deployment:** Vercel

---

## 🚀 Getting Started

Follow these steps to run PortBuilder locally on your machine.

### Prerequisites

* [Node.js](https://nodejs.org/) (v18.0.0 or higher)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation & Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sanchit-Thakur/portbuilder-main.git
   cd portbuilder-main
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   *For zero-config local development, PortBuilder automatically initializes an SQLite database in `./data/portbuilder.db` if MySQL credentials are not set.*

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploying to Production (Vercel / Railway / Cloud)

### Environment Variables

Set the following environment variables in your Vercel Project Settings:

| Key | Value | Description |
|---|---|---|
| `JWT_SECRET` | `your-secure-random-secret` | Secret key used to sign session JWT tokens |
| `MYSQL_HOST` | `your-db-host.railway.app` | Database host URL |
| `MYSQL_PORT` | `3306` | Database port |
| `MYSQL_USER` | `root` | Database user |
| `MYSQL_PASSWORD` | `your-db-password` | Database password |
| `MYSQL_DATABASE` | `portfolio_builder` | Database name |

### Deployment Steps (Vercel)

1. Push your code to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Add `JWT_SECRET` and MySQL connection environment variables in Vercel.
4. Click **Deploy**. Tables will be auto-migrated on first request!

