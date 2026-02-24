import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../server/src/router.ts';

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      fetch: (input, init) =>
        fetch(input, {
          ...init,
          credentials: 'include',
        }),
      url: '/trpc',
    }),
  ],
});
