import type { JSX } from 'solid-js';
import { cn } from '../lib/cn.ts';

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'default' | 'sm' | 'lg';
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost';
};

const variants: Record<string, string> = {
  default: 'bg-foreground text-background hover:bg-foreground/90',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
};

const sizes: Record<string, string> = {
  default: 'h-10 px-4 py-2',
  lg: 'h-11 px-8',
  sm: 'h-9 px-3',
};

export default function Button(props: ButtonProps) {
  const variant = () => props.variant || 'default';
  const size = () => props.size || 'default';

  return (
    <button
      {...props}
      class={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        variants[variant()],
        sizes[size()],
        props.class,
      )}
    />
  );
}
