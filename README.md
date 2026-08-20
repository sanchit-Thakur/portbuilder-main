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

```mermaid
graph TD
    A[Client UI / Next.js & Tailwind CSS] --> B[State Management / Zustand]
    A --> C[API Routes & Server Actions]
    C --> D[(SQLite - Local Dev)]
    C --> E[(MySQL - Production)]
