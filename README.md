# 🚀 Design System & Data Dashboard Playground

An Angular learning project focused on **component architecture**, **state management**, and **real-world frontend patterns**.

## 🎯 Purpose

This project is a hands-on interview preparation tool that covers:

- **Design System**: Reusable UI components (Button, Input, Modal, Select)
- **Data Layer**: Mock API services, RxJS streams, Angular Signals
- **Architecture**: Smart/Dumb components, SOLID principles, Clean Code

## 🏗️ Project Structure

```
src/app/
├── core/               # Singleton services, guards, interceptors (app-wide)
│   ├── services/       # Global services (API, auth, etc.)
│   ├── interceptors/   # HTTP interceptors
│   └── guards/         # Route guards
├── shared/             # Shared utilities (used across features)
│   ├── utils/          # Helper functions
│   ├── pipes/          # Custom pipes
│   └── directives/     # Custom directives
├── ui/                 # Design System (presentational/dumb components)
│   └── components/     # Button, Input, Modal, Select, etc.
├── features/           # Feature modules (smart/container components)
│   └── dashboard/      # Dashboard feature
└── models/             # TypeScript interfaces and types
```

## 🛠️ Tech Stack

- **Angular 21** (Standalone Components, Signals)
- **RxJS 7** (Reactive data flows)
- **SCSS** (Design tokens via CSS Custom Properties)
- **TypeScript 5.9** (Strict mode)
- **Vitest** (Unit testing)

## 📦 Getting Started

```bash
npm install
npm start          # → http://localhost:4200
npm test           # → run unit tests
```

## 📝 Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short description>

Types: feat, fix, refactor, style, docs, test, chore
Scope: ui, core, dashboard, shared, config
```

**Examples:**
```
feat(ui): add Button component with loading state
fix(core): handle API timeout in data service
refactor(dashboard): extract filter logic into separate stream
docs(readme): update project structure
chore(config): add path aliases to tsconfig
```

## 📈 Progress

- [x] Level 1: Foundation & Scaffolding
- [ ] Level 2: Design System Components
- [ ] Level 3: Data Layer & RxJS
- [ ] Level 4: Dashboard Feature
- [ ] Level 5: Architecture Polish
