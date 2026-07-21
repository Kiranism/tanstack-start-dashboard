import * as React from 'react';

import { cn } from '@/lib/utils';

function AspectRatio({
  ratio = 1,
  className,
  ...props
}: React.ComponentProps<'div'> & { ratio?: number }) {
  return (
    <div
      data-slot='aspect-ratio'
      style={
        {
          '--ratio': ratio
        } as React.CSSProperties
      }
      className={cn('relative aspect-(--ratio)', className)}
      {...props}
    />
  );
}

export { AspectRatio };
