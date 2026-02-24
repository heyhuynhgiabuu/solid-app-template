import { parseArgs, styleText } from 'node:util';
import { serve } from '@hono/node-server';
import app from './app.ts';

const {
  values: { port: portArg },
} = parseArgs({
  options: {
    port: {
      default: '9000',
      short: 'p',
      type: 'string',
    },
  },
});

const port = Number.parseInt(portArg || '9000', 10) || 9000;

serve({ fetch: app.fetch, port }, () =>
  console.log(
    `${styleText(['green', 'bold'], ' ➜')} Server running on port ${styleText('bold', String(port))}.\n`,
  ),
);
