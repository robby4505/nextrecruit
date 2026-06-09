# 🚀 NextHire: Enterprise HR Onboarding Platform (Portfolio)

A showcase of modern Front-End engineering, featuring a high-converting marketing landing page and a fully functional enterprise-grade onboarding dashboard. Built to demonstrate proficiency in modern component-based architecture, state management, and premium UI/UX implementation.

---

## 🌟 Projects Overview

This repository contains two distinct applications built with two different industry-leading frameworks, demonstrating versatility and deep technical understanding of the front-end ecosystem.

### 1. The Marketing Landing Page (`/vue-marketing`)
A sleek, modern, and high-performance landing page designed to convert visitors into users. Features a "Web3/Premium SaaS" aesthetic.
- **Framework:** Vue 3 (Composition API) + Vite
- **Styling:** Pure SCSS (No utility frameworks) with Mesh Gradients and Glassmorphism.
- **Key Features:**
  - Interactive "Bento Box" grid layout.
  - Interactive Chart.js integration right on the hero section.
  - Mouse-tracking glow effects and CSS noise texturing for a premium feel.

### 2. The HR Dashboard (`/angular-onboarding`)
A robust, scalable Single Page Application (SPA) designed to manage employee onboarding pipelines. Features a clean, accessible "Stripe-like" corporate aesthetic.
- **Framework:** Angular 17+ (Standalone Components, Signals)
- **Styling:** Pure SCSS with strict CSS variables and custom design system.
- **Key Features:**
  - **Modern State Management:** Fully relies on Angular Signals (`signal`, `computed`) for reactive data flow without external libraries like NgRx.
  - **Interactive Global Service:** Employee data is synchronized across multiple routes using a centralized `EmployeeService`.
  - **Dynamic Routing:** Seamless SPA navigation across Dashboard, Employees, Analytics, and Settings modules.
  - **Live Data Visualizations:** Real-time interactive charts (Line & Doughnut) via `Chart.js` & `ng2-charts` that react instantly to state changes.
  - **Complete CRUD Simulation:** Search filtering, adding new hires with randomized mock data (Platforms, Roles, Departments), status cycling, and item deletion.

---

## 🛠️ Technology Stack

| Category | Technologies Used |
| :--- | :--- |
| **Core Frameworks** | Angular 17, Vue 3 |
| **Build Tools** | Angular CLI, Vite, esbuild |
| **Styling** | SCSS / SASS, CSS Variables (Custom Design System) |
| **State Management** | Angular Signals (`signal()`, `computed()`), Vue Composition API |
| **Data Visualization**| Chart.js, `ng2-charts`, `vue-chartjs` |
| **Routing** | Angular Router (`RouterModule`) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Running the Angular Dashboard
```bash
cd angular-onboarding
npm install
npm run dev
```
> The dashboard will be available at `http://localhost:4200`

### Running the Vue Marketing Page
```bash
cd vue-marketing
npm install
npm run dev
```
> The marketing page will be available at `http://localhost:5173`

---

## 💡 Architecture Highlights (For Reviewers)

*   **Zero Tailwind Dependency:** All CSS is custom-written, demonstrating a deep understanding of Flexbox, CSS Grid, stacking contexts, and responsive design principles.
*   **Reactive Programming:** Heavily utilizes modern reactive primitives (`Signals` in Angular) instead of legacy approaches, showcasing up-to-date technical relevance.
*   **Separation of Concerns:** Strict adherence to component-based architecture. Layout wrappers are isolated from page content, and data manipulation is abstracted into services.

---
*Designed & Developed as a technical showcase for Senior Front-End Engineering roles.*
