# Opilot Learning - Course Management System

A modern, full-stack web application for managing online educational courses, built with **Remix**, **React**, and **TypeScript**.

> **Note:** This project utilizes a **Mock Architecture** to simulate Backend services and Private UI Libraries (`@aic-kits/react`), allowing development and testing without external dependencies.

## 🚀 Features

* **Course Management (CRUD):**
    * View all courses with advanced filtering (Search, Category, Date Range, Status).
    * Create new courses with validation.
    * Edit existing course details (Read-only Title).
    * Secure deletion with confirmation.
* **Meta Management:**
    * Manage Categories, Sub-Categories, and Tags via a Tabbed Interface.
    * Data integrity checks (prevent deleting categories in use).
* **UI/UX:**
    * Responsive design using **TailwindCSS**.
    * Interactive components (Carousel, Accordion, Debounced Search).
    * Optimized for Server-Side Rendering (SSR).

## 🛠 Tech Stack

* **Framework:** [Remix](https://remix.run/) (React Router v7 architecture)
* **Language:** TypeScript
* **Styling:** TailwindCSS
* **Build Tool:** Vite
* **Icons:** Phosphor Icons (Mocked)

## 📂 Architecture & Mocking System

Due to the unavailability of private dependencies (`@aic-kits/react`) and the backend API during this phase, a local mocking system was engineered:

1.  **Mock UI Library (`app/mocks/aic-kits.tsx`):**
    * Replicates the API of the private design system.
    * Implements "Clean Props" pattern to separate styling props (`fw`, `bgColor`) from DOM attributes to prevent React Hydration errors.
2.  **Mock Data Services:**
    * `CourseService`: Simulates database queries with in-memory filtering (AND logic), sorting, and pagination.
    * `MetaService`: Handles relational data logic for Categories and Tags.
3.  **Vite Configuration:**
    * Uses `resolve.alias` to redirect imports from `@aic-kits/react` to the local mock file.

## ⚡️ Getting Started

### Prerequisites
* Node.js (v18 or higher)
* npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone <your-repo-url>
    cd opilot-learning
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Important:** Ensure the Mock files exist.
    * `app/mocks/aic-kits.tsx`
    * `app/mocks/phosphor-icons.tsx`
    *(These are required for the app to compile)*

### Running the App

Start the development server:

```bash
npm run dev
# or
yarn dev