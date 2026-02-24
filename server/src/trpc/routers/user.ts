import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { procedure, router } from '../init.ts';

export const userRouter = router({
  update: procedure
    .input(
      z.object({
        name: z
          .string()
          .trim()
          .min(2, 'Name must be at least 2 characters.')
          .max(50, 'Name must be at most 50 characters.'),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to update your name.',
        });
      }

      return ctx.prisma.user.update({
        data: { name: input.name, updatedAt: new Date() },
        select: {
          email: true,
          id: true,
          image: true,
          name: true,
        },
        where: { id: ctx.user.id },
      });
    }),

  viewer: procedure.query(async ({ ctx }) => {
    if (!ctx.user) {
      return null;
    }

    return ctx.prisma.user.findUnique({
      select: {
        createdAt: true,
        email: true,
        id: true,
        image: true,
        name: true,
      },
      where: { id: ctx.user.id },
    });
  }),
});
