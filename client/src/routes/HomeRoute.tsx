import { A } from '@solidjs/router';
import { createResource, For, Show } from 'solid-js';
import { trpc } from '../lib/trpc.ts';
import Card from '../ui/Card.tsx';
import Section from '../ui/Section.tsx';

export default function HomeRoute() {
  const [data] = createResource(() => trpc.post.list.query({ limit: 10 }));

  return (
    <Section>
      <h1 class="mb-6 text-3xl font-bold">Posts</h1>
      <Show fallback={<p class="text-muted-foreground italic">Loading...</p>} when={!data.loading}>
        <Show fallback={<p class="text-muted-foreground">No posts yet.</p>} when={data()}>
          <div class="flex flex-col gap-4">
            <For each={data()!.posts}>
              {(post) => (
                <A href={`/post/${post.id}`}>
                  <Card class="transition-colors hover:bg-accent/50">
                    <div class="flex items-start justify-between">
                      <div>
                        <h2 class="text-lg font-semibold">{post.title}</h2>
                        <p class="mt-1 line-clamp-2 text-sm text-muted-foreground">
                          {post.content}
                        </p>
                      </div>
                      <div class="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{post.likes} likes</span>
                        <span>{post._count.comments} comments</span>
                      </div>
                    </div>
                    <Show when={post.author}>
                      <p class="mt-2 text-xs text-muted-foreground">by {post.author!.name}</p>
                    </Show>
                  </Card>
                </A>
              )}
            </For>
          </div>
        </Show>
      </Show>
    </Section>
  );
}
