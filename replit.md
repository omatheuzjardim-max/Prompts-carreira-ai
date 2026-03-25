# Workspace

## Overview

pnpm workspace monorepo. Contains a landing page clone of luvadeaplicativo.com built with React + Vite using plain CSS (no UI framework).

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5 (api-server, unused)
- **Frontend**: React + Vite, plain CSS, wouter routing

## Structure

```
artifacts-monorepo/
├── artifacts/
│   ├── luva-landing/          # Main landing page (React + Vite, plain CSS)
│   │   ├── src/
│   │   │   ├── App.tsx        # Home page + wouter router
│   │   │   ├── main.tsx       # Entry point
│   │   │   ├── index.css      # Home page styles (dark theme, orange glow)
│   │   │   ├── claude.css     # ClaudeExtension page styles
│   │   │   └── pages/
│   │   │       └── ClaudeExtension.tsx
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   └── package.json
│   └── api-server/            # Express API (not used by landing)
├── lib/                       # Shared libraries (codegen, db, etc.)
├── pnpm-workspace.yaml
└── package.json
```

## Pages

- `/` — Home page (luvadeaplicativo.com clone): grid background, particles canvas, spinning avatar ring, spark effects, floating mockup, scroll reveals
- `/claudeextension/` — Claude Extension page clone: email capture form, tutorial reveal on submit

## Frontend Details

- Zero UI component library — pure CSS only
- Fonts: Inter + Space Mono via Google Fonts
- All animations via CSS keyframes + vanilla JS in `useEffect`
- Routing: wouter (lightweight, ~2kb)

## Key Commands

- `pnpm --filter @workspace/luva-landing run dev` — dev server
- `pnpm --filter @workspace/luva-landing run build` — production build
