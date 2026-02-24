import { A } from '@solidjs/router';
import { createSignal, onMount, Show } from 'solid-js';
import { authClient } from '../lib/auth.ts';

export default function Header() {
  const [user, setUser] = createSignal<{ name: string } | null>(null);

  onMount(async () => {
    const session = await authClient.getSession();
    if (session.data?.user) {
      setUser(session.data.user);
    }
  });

  const handleSignOut = async () => {
    await authClient.signOut();
    setUser(null);
    window.location.href = '/';
  };

  return (
    <header class="border-b border-border">
      <div class="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <A class="text-xl font-bold" href="/">
          Solid App
        </A>
        <nav class="flex items-center gap-4">
          <A class="text-sm text-muted-foreground hover:text-foreground" href="/">
            Home
          </A>
          <Show
            fallback={
              <A
                class="rounded-md bg-foreground px-3 py-1.5 text-sm text-background hover:bg-foreground/90"
                href="/login"
              >
                Sign In
              </A>
            }
            when={user()}
          >
            <span class="text-sm text-muted-foreground">{user()!.name}</span>
            <button
              class="text-sm text-muted-foreground hover:text-foreground"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </Show>
        </nav>
      </div>
    </header>
  );
}
