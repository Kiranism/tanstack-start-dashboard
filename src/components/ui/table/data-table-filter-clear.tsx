import * as React from 'react';
import { Icons } from '@/components/icons';

/**
 * Clear affordance rendered INSIDE a PopoverTrigger button. It must not be a
 * <button> (button-in-button is invalid HTML and breaks hydration), so it is a
 * div with button semantics and Enter/Space activation.
 */
export function DataTableFilterClear({
  title,
  onReset
}: {
  title?: string;
  onReset: (event: React.MouseEvent | React.KeyboardEvent) => void;
}) {
  return (
    <div
      role='button'
      aria-label={`Clear ${title} filter`}
      tabIndex={0}
      onClick={onReset}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onReset(event);
        }
      }}
      className='focus-visible:ring-ring rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:ring-1 focus-visible:outline-none'
    >
      <Icons.xCircle />
    </div>
  );
}
