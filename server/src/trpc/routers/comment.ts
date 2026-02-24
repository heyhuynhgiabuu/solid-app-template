import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { procedure, router } from '../init.ts';

export const commentRouter = router({
  add: procedure
    .input(
      z.object({
        content: z.string().min(1, 'Content is required.'),
        postId: z.string().min(1, 'Post id is required.'),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to add a comment.',
        });
      }

      const post = await ctx.prisma.post.findUnique({
        where: { id: input.postId },
      });
      if (!post) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Post not found.' });
      }

      return ctx.prisma.comment.create({
        data: {
          authorId: ctx.user.id,
          content: input.content,
          postId: input.postId,
        },
        include: {
          author: {
            select: { email: true, id: true, image: true, name: true },
          },
        },
      });
    }),

  delete: procedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
    const comment = await ctx.prisma.comment.findUnique({
      select: { authorId: true },
      where: { id: input.id },
    });

    if (!comment) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Comment not found.',
      });
    }

    if (ctx.user && comment.authorId !== ctx.user.id) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'You can only delete your own comments.',
      });
    }

    return ctx.prisma.comment.delete({ where: { id: input.id } });
  }),

  search: procedure
    .input(
      z.object({
        cursor: z.string().optional(),
        limit: z.number().min(1).max(50).default(10),
        query: z.string().min(1, 'Search query is required.'),
      }),
    )
    .query(async ({ ctx, input }) => {
      const comments = await ctx.prisma.comment.findMany({
        cursor: input.cursor ? { id: input.cursor } : undefined,
        include: {
          author: {
            select: { email: true, id: true, image: true, name: true },
          },
          post: { select: { id: true, title: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: input.limit + 1,
        where: {
          content: { contains: input.query, mode: 'insensitive' },
        },
      });

      let nextCursor: string | undefined;
      if (comments.length > input.limit) {
        const next = comments.pop()!;
        nextCursor = next.id;
      }

      return { comments, nextCursor };
    }),
});
