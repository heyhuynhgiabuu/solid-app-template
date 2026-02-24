import type { JSX } from 'solid-js';
import { cn } from '../lib/cn.ts';

type SectionProps = JSX.HTMLAttributes<HTMLElement>;

export default function Section(props: SectionProps) {
  return <section {...props} class={cn('mx-auto max-w-4xl px-6 py-8', props.class)} />;
}
