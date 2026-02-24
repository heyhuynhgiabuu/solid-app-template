import prisma from './prisma.ts';

async function seed() {
  console.log('Seeding database...');

  const user = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      emailVerified: true,
      name: 'Admin',
      updatedAt: new Date(),
    },
  });

  const posts = [
    {
      content: 'This is the first post on the platform!',
      title: 'Hello World',
    },
    {
      content:
        'SolidJS is a reactive JavaScript framework that compiles to efficient imperative code.',
      title: 'Getting Started with SolidJS',
    },
    {
      content:
        'Using tRPC with Hono on the server and SolidJS on the client for end-to-end type safety.',
      title: 'Fullstack TypeScript',
    },
  ];

  for (const post of posts) {
    await prisma.post.create({
      data: {
        ...post,
        authorId: user.id,
      },
    });
  }

  console.log(`Seeded ${posts.length} posts for user ${user.email}`);
}

try {
  await seed();
} catch (error) {
  console.error(error);
} finally {
  await prisma.$disconnect();
}
