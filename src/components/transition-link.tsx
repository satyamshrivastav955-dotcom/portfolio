'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { useProjectNavigation } from './page-transitions';

export default function TransitionLink(props: ComponentProps<typeof Link>) {
  const navigate = useProjectNavigation();
  return <Link {...props} onNavigate={(event) => {
    props.onNavigate?.(event);
    if (navigate && typeof props.href === 'string' && props.href.startsWith('/projects/')) {
      event.preventDefault();
      navigate(props.href);
    }
  }} />;
}
