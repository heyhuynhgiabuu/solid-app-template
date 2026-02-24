import { useParams } from '@solidjs/router';
import { createResource, createSignal, For, Show } from 'solid-js';
import { trpc } from '../lib/trpc.ts';
import Button from '../ui/Button.tsx';
import Card from '../ui/Card.tsx';
import Input from '../ui/Input.tsx';
import Section from '../ui/Section.tsx';

export default function PostRoute() {
  const params = useParams<{ id: string }>();
  const [post, { refetch }] = createResource(
    () => params.id,
    (id) => trpc.post.byId.query({ id }),
  );

  const [comment, setComment] = createSignal('');
  const [liking, setLiking] = createSignal(false);

  const handleLike = async () => {
    setLiking(true);
    try {
      await trpc.post.like.mutate({ id: params.id });
      refetch();
    } finally {
      setLiking(false);
    }
  };

  const handleAddComment = async (e: Event) => {
    e.preventDefault();
    const content = comment().trim();
    if (!content) {
      return;
    }

    await trpc.comment.add.mutate({ content, postId: params.id });
    setComment('');
    refetch();
  };

  return (
    <Section>
      <Show fallback={<p class="text-muted-foreground italic">Loading...</p>} when={!post.loading}>
        <Show fallback={<p class="text-muted-foreground">Post not found.</p>} when={post()}>
          {(p) => (
            <>
              <Card>
                <h1 class="text-2xl font-bold">{p().title}</h1>
                <Show when={p().author}>
                  <p class="mt-1 text-sm text-muted-foreground">by {p().author!.name}</p>
                </Show>
                <p class="mt-4 whitespace-pre-wrap">{p().content}</p>
                <div class="mt-4 flex items-center gap-4">
                  <Button disabled={liking()} onClick={handleLike} size="sm" variant="outline">
                    {liking() ? 'Liking...' : `Like (${p().likes})`}
                  </Button>
                  <span class="text-sm text-muted-foreground">{p()._count.comments} comments</span>
                </div>
              </Card>

              <div class="mt-8">
                <h2 class="mb-4 text-lg font-semibold">Comments</h2>
                <form class="mb-6 flex gap-2" onSubmit={handleAddComment}>
                  <Input
                    onInput={(e) => setComment(e.currentTarget.value)}
                    placeholder="Add a comment..."
                    type="text"
                    value={comment()}
                  />
                  <Button size="sm" type="submit">
                    Post
                  </Button>
                </form>

                <div class="flex flex-col gap-3">
                  <For each={p().comments}>
                    {(c) => (
                      <Card class="p-4">
                        <p class="text-sm">{c.content}</p>
                        <Show when={c.author}>
                          <p class="mt-1 text-xs text-muted-foreground">by {c.author!.name}</p>
                        </Show>
                      </Card>
                    )}
                  </For>
                </div>
              </div>
            </>
          )}
        </Show>
      </Show>
    </Section>
  );
}
