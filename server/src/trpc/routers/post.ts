import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { procedure, router } from '../init.ts';

export const postRouter = router({
  byId: procedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const post = await ctx.prisma.post.findUnique({
      include: {
        _count: { select: { comments: true } },
        author: {
          select: { email: true, id: true, image: true, name: true },
        },
        comments: {
          include: {
            author: {
              select: { email: true, id: true, image: true, name: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
      where: { id: input.id },
    });

    if (!post) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Post not found.' });
    }

    return post;
  }),

  like: procedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
    const post = await ctx.prisma.post.findUnique({
      where: { id: input.id },
    });
    if (!post) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Post not found.' });
    }

    return ctx.prisma.post.update({
      data: { likes: { increment: 1 } },
      where: { id: input.id },
    });
  }),

  list: procedure
    .input(
      z.object({
        cursor: z.string().optional(),
        limit: z.number().min(1).max(50).default(10),
      }),
    )
    .query(async ({ ctx, input }) => {
      const posts = await ctx.prisma.post.findMany({
        cursor: input.cursor ? { id: input.cursor } : undefined,
        include: {
          _count: { select: { comments: true } },
          author: {
            select: { email: true, id: true, image: true, name: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: input.limit + 1,
      });

      let nextCursor: string | undefined;
      if (posts.length > input.limit) {
        const next = posts.pop()!;
        nextCursor = next.id;
      }

      return { nextCursor, posts };
    }),

  unlike: procedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
    return ctx.prisma.$transaction(async (tx) => {
      const post = await tx.post.findUnique({
        select: { likes: true },
        where: { id: input.id },
      });

      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Post not found.',
        });
      }

      if (post.likes <= 0) {
        return tx.post.findUniqueOrThrow({ where: { id: input.id } });
      }

      return tx.post.update({
        data: { likes: { decrement: 1 } },
        where: { id: input.id },
      });
    });
  }),
});
