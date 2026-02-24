import { createSignal } from 'solid-js';
import { authClient } from '../lib/auth.ts';
import Button from '../ui/Button.tsx';
import Card from '../ui/Card.tsx';
import Input from '../ui/Input.tsx';
import Section from '../ui/Section.tsx';

export default function SignInRoute() {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [name, setName] = createSignal('');
  const [isSignUp, setIsSignUp] = createSignal(false);
  const [error, setError] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp()) {
        const result = await authClient.signUp.email({
          email: email(),
          name: name(),
          password: password(),
        });
        if (result.error) {
          setError(result.error.message || 'Sign up failed.');
          return;
        }
      } else {
        const result = await authClient.signIn.email({
          email: email(),
          password: password(),
        });
        if (result.error) {
          setError(result.error.message || 'Sign in failed.');
          return;
        }
      }
      window.location.href = '/';
    } catch {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section class="flex items-center justify-center">
      <Card class="w-full max-w-md">
        <h1 class="mb-6 text-2xl font-bold">{isSignUp() ? 'Create Account' : 'Sign In'}</h1>

        {error() && (
          <div class="mb-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {error()}
          </div>
        )}

        <form class="flex flex-col gap-4" onSubmit={handleSubmit}>
          {isSignUp() && (
            <Input
              onInput={(e) => setName(e.currentTarget.value)}
              placeholder="Name"
              required
              type="text"
              value={name()}
            />
          )}
          <Input
            onInput={(e) => setEmail(e.currentTarget.value)}
            placeholder="Email"
            required
            type="email"
            value={email()}
          />
          <Input
            minLength={8}
            onInput={(e) => setPassword(e.currentTarget.value)}
            placeholder="Password"
            required
            type="password"
            value={password()}
          />
          <Button disabled={loading()} type="submit">
            {loading() ? 'Loading...' : isSignUp() ? 'Create Account' : 'Sign In'}
          </Button>
        </form>

        <p class="mt-4 text-center text-sm text-muted-foreground">
          {isSignUp() ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            class="text-foreground underline hover:no-underline"
            onClick={() => setIsSignUp(!isSignUp())}
            type="button"
          >
            {isSignUp() ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </Card>
    </Section>
  );
}
