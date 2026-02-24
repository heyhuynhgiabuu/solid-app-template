import type { JSX } from 'solid-js';
import { cn } from '../lib/cn.ts';

type CardProps = JSX.HTMLAttributes<HTMLDivElement>;

export default function Card(props: CardProps) {
  return (
    <div
      {...props}
      class={cn('rounded-lg border bg-card p-6 text-card-foreground shadow-sm', props.class)}
    />
  );
}
