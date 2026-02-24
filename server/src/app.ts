import { trpcServer } from '@hono/trpc-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { auth } from './lib/auth.ts';
import prisma from './prisma/prisma.ts';
import { appRouter } from './router.ts';
import { createContext } from './trpc/context.ts';

try {
  await prisma.$connect();
} catch (error) {
  console.error('Prisma Database Connection Error\n', error);
  process.exit(1);
}

const origin = process.env.CLIENT_DOMAIN || 'http://localhost:5173';
const app = new Hono();

app.use(
  cors({
    credentials: true,
    origin,
  }),
);

app.use(
  '/trpc/*',
  trpcServer({
    createContext: (_, context) => createContext({ context }),
    router: appRouter,
  }),
);

app.on(['POST', 'GET'], '/api/auth/*', ({ req }) => auth.handler(req.raw));

app.all('/*', (context) => context.redirect(origin));

export default app;
