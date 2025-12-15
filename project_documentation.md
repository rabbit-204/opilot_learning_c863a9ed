# Project Documentation: Opilot Learning - Course Management System

## 1. Architecture Overview

The project is built using the **Remix** framework (React-based SSR), leveraging standard web standards for data loading and mutations. Due to the unavailability of the actual backend and private UI libraries during the development phase, a **Mocking Architecture** was implemented to simulate a full-stack environment.

### Key Architectural Layers:
* **Frontend (Remix Routes & Components):**
    * Follows a resource-oriented route structure (`/courses`, `/courses/new`, `/meta`).
    * Uses Remix `loader` for server-side data fetching and `action` for handling mutations (Create, Update, Delete).
    * **UI Abstraction:** All UI components (`Box`, `Button`, `Table`, etc.) are imported from an abstract path `@aic-kits/react`. In this environment, they are aliased to a local Mock System.
* **Service Layer (Mock):**
    * `CourseService`: Simulates database operations for courses. Implements in-memory logic for **Filtering (AND logic)**, **Sorting**, and **Pagination** to mimic real API behavior.
    * `MetaService`: Handles CRUD operations for Categories, SubCategories, and Tags with relational integrity checks (e.g., preventing deletion of categories in use).
* **Data Model:**
    * Strongly typed TypeScript interfaces (`Course`, `CourseFilter`, `WordPressEntity`) ensure type safety across the application.

## 2. Improvements Beyond Requirements

While the core requirements focused on functionality, several technical improvements were made to ensure robustness and developer experience:

1.  **Robust Mocking System:**
    * Instead of simple placeholders, the Mock UI Library (`aic-kits.tsx`) was engineered to handle **polymorphic props** and **style extraction**.
    * Implemented a "Clean Props" pattern to separate custom style props (like `fw`, `bgColor`) from valid HTML attributes, preventing React Hydration Mismatches.
2.  **Advanced Filtering Logic in Memory:**
    * The mock service supports complex filtering scenarios (e.g., search query combined with multiple dropdowns and date ranges) rather than just returning static lists.
3.  **TypeScript Enhancement:**
    * Refactored legacy/demo code to include explicit type definitions for callback parameters (e.g., in `List` and `Carousel` render props), eliminating implicit `any` errors.
4.  **Vite Configuration for DX:**
    * Configured `vite.config.ts` with dynamic aliases (`process.cwd()`) to ensure absolute path resolution for mock files, making the setup portable across different environments.

## 3. Challenges & Solutions

### Challenge 1: Private Dependency Unavailability
**Issue:** The project relied on a private package `@aic-kits/react` and `@phosphor-icons/react` which were not accessible in the development environment, causing "Cannot find module" errors.
**Solution:**
* Created a local **Mock System** (`app/mocks/aic-kits.tsx`).
* Configured **Vite Aliases** (`resolve.alias`) to intercept imports to `@aic-kits/react` and redirect them to the local mock file.
* Updated `tsconfig.json` to ensure TypeScript intellisense recognized the aliased paths.

### Challenge 2: React Hydration Mismatches
**Issue:** The initial mock components spread all received props (`...props`) directly to the underlying DOM elements. Custom props like `loading="true"` or `bgColor="primary"` caused React to throw "Hydration failed" errors because the server-rendered HTML differed from the client's expectation (invalid DOM attributes).
**Solution:**
* Refactored all mock components to use **Destructuring**.
* Extracted custom props (style, logic) to compute inline styles or classes.
* Only passed valid HTML attributes to the actual DOM elements (`div`, `button`, etc.).

### Challenge 3: Missing Exports & Type Errors
**Issue:** The demo page (`_public._index.tsx`) failed to load due to missing named exports in the mock file and "Implicit any" TypeScript errors in render callbacks.
**Solution:**
* Systematically added all missing components (`Accordion`, `Carousel`, `Art`, `Base`) to the mock file.
* Updated `app/mocks/phosphor-icons.tsx` to export all required icons.
* Applied explicit types (e.g., `item: typeof listItems[0]`) to all map/render callbacks in the consumer code.

---
*Documentation generated on 15/12/2025*