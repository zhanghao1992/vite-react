# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + Vite application serving as a development playground for testing and demonstrating various third-party libraries and UI patterns. The project uses **pnpm** as the package manager.

**Tech Stack:**
- React 18.3.1 with Vite 5.4.10
- React Router v6 (browser router mode)
- Ant Design 5.x for UI components
- Tailwind CSS 4.x for utility styling
- JavaScript (no TypeScript)

## Common Commands

```bash
# Development
pnpm dev              # Start dev server (http://localhost:5173)

# Building
pnpm build           # Build for production
pnpm preview         # Preview production build locally

# Code Quality
pnpm lint            # Run ESLint
```

## Architecture

### Routing
Routes are centrally defined in `src/routes/index.jsx` using React Router v6's `createBrowserRouter`. The app uses a layout-based pattern with:
- **MainLayout**: Root layout at `src/layout/main/index.jsx` containing navigation and structure
- **Outlet pattern**: Child routes render via `<Outlet />` in the layout
- **Default route**: Unknown paths redirect to `/supabasec`

All page routes are nested under the main layout at path `/`. To add a new page:
1. Create component in `src/pages/[page-name]/`
2. Import and add route in `src/routes/index.jsx`
3. Optionally add navigation link in `src/layout/main/index.jsx`

### Page Organization
Each feature/demo lives in `src/pages/` as a self-contained directory (e.g., `src/pages/react-query/`, `src/pages/tinymce/`). Pages are organized by functionality rather than by file type.

### API Proxy
Development server proxies `/api/*` requests to `https://www.mocklib.com` via Vite configuration (see `vite.config.js:8-14`).

### State Management
- **React Query (TanStack Query)**: Used in `src/pages/react-query/` for server state
- **Local component state**: useState for component-level state
- No Redux or global state management

### Styling Approach
Mixed approach used across the application:
- **Ant Design**: Primary component library
- **Tailwind CSS**: Utility classes (v4+)
- **CSS Modules**: For component-scoped styles (`.module.less`, `.module.css`)
- **Global CSS**: `src/assets/css/app.css`

### Error Handling
React Error Boundary is implemented at `src/pages/ErrorBoundary/` and can wrap components for error isolation.

## Key Libraries Demonstrated

| Library | Purpose | Location |
|---------|---------|----------|
| TinyMCE | Rich text editor | `src/pages/tinymce/` |
| React Query | Server state management | `src/pages/react-query/` |
| AHooks | React hooks utility | `src/pages/ahooks/` |
| Alova | HTTP client | `src/pages/alova/` |
| DHTMLX Gantt | Gantt charts | `src/pages/gantt/` |
| Supabase | Backend integration | `src/pages/supabasec/` |
| Ethers | Ethereum | Used in GIS pages |

## Code Conventions

- **Language**: Code comments and UI use Chinese
- **File headers**: Many files have koroFileHeader-style comments with author info
- **Component exports**: Default exports preferred
- **Route imports**: All page components imported in `src/routes/index.jsx`
