import { join } from 'node:path';
import dotenv from 'dotenv';
import { defineConfig } from 'prisma/config';

const root = process.cwd();
dotenv.config({
  path: join(root, '.env'),
});

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
  migrations: {
    seed: `node --no-warnings --experimental-specifier-resolution=node --loader ts-node/esm --env-file .env src/prisma/seed.ts`,
  },
  schema: './src/prisma/schema.prisma',
});
