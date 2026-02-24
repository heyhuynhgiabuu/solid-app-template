# Solid App Template

Fullstack SolidJS template with the fastest frontend tooling, inspired by [nkzw-tech/fate-template](https://github.com/nkzw-tech/fate-template).

## Stack

### Client

- [SolidJS](https://www.solidjs.com/) — Reactive UI framework
- [Tailwind CSS v4](https://tailwindcss.com/) — Utility-first CSS
- [@solidjs/router](https://docs.solidjs.com/solid-router) — Client-side routing
- [tRPC Client](https://trpc.io/) — End-to-end type-safe API
- [Better Auth](https://www.better-auth.com/) — Authentication

### Server

- [Hono](https://hono.dev/) — Ultrafast web framework
- [tRPC](https://trpc.io/) — Type-safe API layer
- [Prisma](https://www.prisma.io/) — ORM with PostgreSQL
- [Better Auth](https://www.better-auth.com/) — Authentication
- [tsdown](https://github.com/nicolo-ribaudo/tsdown) — Server bundler

### Tooling

- [pnpm](https://pnpm.io/) — Fast package manager
- [Vite](https://vite.dev/) — Build tool
- [Vitest](https://vitest.dev/) — Testing
- [oxlint](https://oxc.rs/docs/guide/usage/linter) — Rust-based linter
- [oxfmt](https://oxc.rs/docs/guide/usage/formatter) — Rust-based formatter
- [tsgo](https://github.com/nicolo-ribaudo/typescript-go) — TypeScript Go rewrite for type checking

## Getting Started

### Prerequisites

- Node.js >= 20
- pnpm >= 10
- Docker (for PostgreSQL)

### Setup

```bash
# Install dependencies
pnpm install

# Start PostgreSQL
docker compose up -d

# Generate Prisma client
pnpm dev:setup

# Run database migrations
cd server && pnpm prisma migrate dev --name init

# Seed database (optional)
cd server && pnpm prisma db seed

# Start development
pnpm dev
```

The client runs on `http://localhost:5173` and the server on `http://localhost:9000`.

## Scripts

| Command       | Description                              |
| ------------- | ---------------------------------------- |
| `pnpm dev`    | Start client + server in parallel        |
| `pnpm build`  | Build both packages                      |
| `pnpm test`   | Run typecheck, tests, lint, format check |
| `pnpm lint`   | Run oxlint                               |
| `pnpm format` | Format with oxfmt                        |
| `pnpm prisma` | Run Prisma CLI from server               |

## Project Structure

```
├── client/                 # SolidJS frontend
│   ├── src/
│   │   ├── lib/           # Utilities (trpc, auth, cn)
│   │   ├── routes/        # Page components
│   │   ├── ui/            # UI components
│   │   ├── App.css        # Tailwind + design tokens
│   │   └── index.tsx      # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
├── server/                 # Hono + tRPC backend
│   ├── src/
│   │   ├── lib/           # Auth config
│   │   ├── prisma/        # Schema, client, seed
│   │   ├── trpc/          # Router init, context, routers
│   │   ├── app.ts         # Hono app
│   │   ├── index.ts       # Server entry
│   │   └── router.ts      # tRPC root router
│   ├── .env               # Environment variables
│   ├── package.json
│   ├── prisma.config.ts
│   └── tsdown.config.ts
├── .github/workflows/     # CI
├── git-hooks/             # Pre-commit formatting
├── docker-compose.yml     # PostgreSQL
├── oxlint.config.ts       # Linter config
├── .oxfmtrc.jsonc         # Formatter config
├── tsconfig.json          # TypeScript config
├── vitest.config.ts       # Test config
└── package.json           # Monorepo root
```

## License

MIT
