<div align="center">

# 🚀 PortBuilder

**Build, customize, and deploy your developer portfolio in minutes.**

[![Live Demo](https://img.shields.io/badge/Demo-portbuilder--main.vercel.app-blue?style=for-the-badge&logo=vercel)](https://portbuilder-main.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](https://github.com/sanchit-Thakur/portbuilder-main/pulls)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-key-features">Key Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-environment-variables">Configuration</a> • 
  <a href="#-deployment">Deployment</a>
</p>

---

</div>

## 📌 Overview

**PortBuilder** is an interactive web platform designed to help developers, designers, and creators generate sleek, responsive, and SEO-friendly personal portfolios without writing boilerplate code. Customize sections, preview in real time, and export your site instantly.

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| 📄 **Integrated Resume Builder** | Generate ATS-friendly resumes directly from your portfolio data. Export via PDF print or one-click HTML download. |
| ⚡ **Real-time Live Preview** | Instant visual feedback as you customize layouts, typography, and section content. |
| 🎨 **Modern Themes** | Curated Dark, Light, and Gradient presets crafted with high accessibility and contrast standards. |
| 🧩 **Modular Architecture** | Toggle and reorder Hero, About, Skills, Projects, Experience, Education, and Contact blocks. |
| 📱 **Responsive Design** | Pixel-perfect layouts adapted seamlessly for mobile, tablet, and desktop viewports. |
| 📦 **Export & Deploy** | Download production-ready source code or ship directly to Vercel and Railway. |

---

## 🛠️ Tech Stack

* **Frontend:** React / Next.js, Vanilla CSS & Glassmorphism Design System
* **Icons & UI:** Custom Glass & SVG Components
* **State Management:** React Hooks & Context
* **Database:** SQLite (local zero-config) / Cloud MySQL (production serverless via `DATABASE_URL`)
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

Set the following environment variables in your **Vercel Project Settings > Environment Variables**:

| Key | Example Value | Description |
|---|---|---|
| `JWT_SECRET` | `your-secure-random-secret` | **Required.** Secret key used to sign session JWT tokens. |
| `DATABASE_URL` | `mysql://user:pass@host:3306/portfolio_builder` | **Recommended.** Connection string for cloud MySQL (TiDB Cloud, Railway, Aiven, Supabase). |
| `MYSQL_HOST` | `gateway01.us-east-1.prod.aws.tidbcloud.com` | Alternative: Database host URL |
| `MYSQL_PORT` | `3306` | Alternative: Database port (default: 3306) |
| `MYSQL_USER` | `root` | Alternative: Database user |
| `MYSQL_PASSWORD` | `your-db-password` | Alternative: Database password |
| `MYSQL_DATABASE` | `portfolio_builder` | Alternative: Database name |

> 💡 **Tip for Vercel Deployments:** Because Vercel serverless functions are stateless, connecting a remote MySQL database (such as **TiDB Cloud Serverless (Free)**, **Railway MySQL**, or **Aiven**) using `DATABASE_URL` ensures all your portfolio edits and user registrations are permanently saved across all function instances.

### Deployment Steps (Vercel)

1. Push your code to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. Add `JWT_SECRET` and your `DATABASE_URL` (or `MYSQL_*` credentials) in Vercel.
4. Click **Deploy**. Tables and schema will be auto-migrated on your first request!
