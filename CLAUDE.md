# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Hero's landing page and portfolio built with **Next.js 16** and **React 19**. A bilingual (English/Spanish) portfolio featuring interactive 3D elements, smooth animations, and project showcases.

## Tech Stack

- **Framework**: Next.js 16.1.6 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4 with PostCSS
- **3D**: Three.js (v0.183.2)
- **State Management**: Zustand (v5) with sessionStorage persistence
- **Internationalization**: next-intl (v4.8.3)
- **Runtime**: React 19.2.3 with React DOM 19.2.3

## Development Commands

```bash
# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Architecture

### Directory Structure

- **`app/[locale]/`** – App Router structure. The `[locale]` dynamic segment handles i18n routing for both "en" and "es".
- **`app/components/landing/`** – Organized into modular sections:
  - `navbar/` – Navigation with language switcher and mobile menu
  - `footer/` – Contact section with form and footer bar
  - `projects/` – Project showcase with data-driven rows and panels
  - `scroll-animator/` – Scroll-triggered animations
  - `icons/` – SVG icon components (exported via index.ts)
- **`app/components/icons/`** – Reusable icon components (ArrowRight, LinkedIn, Sun, Moon, Email)
- **`app/store/`** – Zustand stores. Currently uses `uiStore` to track initial page load completion using sessionStorage (prevents repeat animations on page reload).
- **`i18n/`** – I18n configuration:
  - `routing.ts` – Defines locales ("en", "es")
  - `request.ts` – Server-side i18n context
- **`messages/`** – Translation files (en.json, es.json)
- **`public/`** – Static assets including images and videos

### Key Patterns

#### Component Structure
Components under `landing/` follow a consistent pattern:
- Main component exported from `index.tsx`
- Supporting components co-located (e.g., `NavLinks.tsx`, `FooterBar.tsx`)
- Custom hooks (e.g., `useNavbar.ts`, `useContactForm.ts`) for logic separation
- Type definitions in `types.ts` files

#### Data-Driven Components
Projects and navigation use `data.ts` files to define structure:
- **Projects**: `ProjectRow` and `ProjectPanel` display items from project data
- **Navbar**: Links and configuration loaded from data files

#### Internationalization
- Uses `next-intl` Server Components for async translations
- Layout uses `generateStaticParams` to pre-render all locale variants
- Metadata generated per-locale via `getTranslations`
- Messages passed to client via `NextIntlClientProvider`

#### State Management
- Single Zustand store (`uiStore`) for UI-wide state
- Uses `persist` middleware with sessionStorage (cleared on page reload)
- Tracks `initialLoadComplete` to control initial animations

#### Styling
- Tailwind CSS 4 with utility-first approach
- Custom CSS variables for theme (dark/light modes via CSS)
- No component libraries; all components built from scratch

#### 3D and Animations
- Three.js for 3D elements (QuantumCloudLoader visible in projects)
- Intersection Observer patterns for scroll-triggered animations
- CSS transitions and animations for smooth interactions

## TypeScript Configuration

- **Target**: ES2017
- **JSX Mode**: react-jsx
- **Strict Mode**: Enabled
- **Path Aliases**: `@/*` maps to repository root

## ESLint Configuration

Uses Next.js recommended configs:
- `eslint-config-next/core-web-vitals` – Web Vitals linting
- `eslint-config-next/typescript` – TypeScript rules

Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

## Development Workflow

### Adding a New Section
1. Create a folder under `app/components/landing/{section}/`
2. Write component files: `index.tsx`, supporting components, `types.ts`, custom hooks
3. Implement data via `data.ts` if needed
4. Add translations to `messages/en.json` and `messages/es.json`
5. Import and compose in the main page (`app/[locale]/page.tsx`)

### Adding Translations
- Update `messages/en.json` for English
- Update `messages/es.json` for Spanish
- Use `useTranslations()` in Client Components or `getTranslations()` in Server Components

### Testing 3D Elements
- Three.js components render client-side only
- Use browser DevTools to inspect canvas elements
- Test across different viewport sizes (responsive 3D scaling)

## Important Notes

- **No `src/` directory**: App structure lives at the root (`app/`, `i18n/`, `messages/`, `public/`)
- **Next.js 16**: Uses App Router exclusively; no Pages Router
- **React 19**: Uses latest React features; no legacy patterns
- **Bilingual**: Always maintain parity between en.json and es.json
- **Session State**: UI store uses sessionStorage, so state persists during the session but resets on browser tab close
