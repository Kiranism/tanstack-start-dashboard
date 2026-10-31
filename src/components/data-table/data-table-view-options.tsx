import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox';
import { type ReactTable, type RowData, Subscribe } from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import * as React from 'react';

import type { DataTableFeatures } from '@/lib/data-table-features';

import { Button } from '@/components/ui/button';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList
} from '@/components/ui/combobox';
import { IconSettings } from '@tabler/icons-react';

interface ColumnOption {
  value: string;
  label: string;
}

interface DataTableViewOptionsProps<TData extends RowData> extends React.ComponentProps<
  typeof ComboboxContent
> {
  table: ReactTable<DataTableFeatures, TData, unknown>;
  disabled?: boolean;
}

// Local patch: built on Base UI Combobox instead of DiceUI Faceted, which needs
// cmdk (and through it Radix).
export function DataTableViewOptions<TData extends RowData>({
  table,
  disabled,
  className,
  ...props
}: DataTableViewOptionsProps<TData>) {
  const columns = React.useMemo(
    () =>
      table
        .getAllColumns()
        .filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide()),
    [table]
  );
  const options = React.useMemo<ColumnOption[]>(
    () =>
      columns.map((column) => ({
        value: column.id,
        label: column.columnDef.meta?.label ?? column.id
      })),
    [columns]
  );

  return (
    <Subscribe source={table.atoms.columnVisibility}>
      {(columnVisibility) => (
        <Combobox
          multiple
          items={options}
          value={options.filter((option) => columnVisibility[option.value] !== false)}
          onValueChange={(next: ColumnOption[]) => {
            const visible = new Set(next.map((option) => option.value));
            for (const column of columns) {
              const isVisible = visible.has(column.id);
              if (isVisible !== (columnVisibility[column.id] !== false)) {
                column.toggleVisibility(isVisible);
              }
            }
          }}
        >
          <ComboboxPrimitive.Trigger
            render={
              <Button
                aria-label='View columns'
                variant='outline'
                className='ms-auto hidden lg:flex'
                disabled={disabled}
              />
            }
          >
            <IconSettings className='text-muted-foreground' />
            View
          </ComboboxPrimitive.Trigger>
          <ComboboxContent
            aria-label='Columns'
            align='center'
            className={cn('w-44', className)}
            {...props}
          >
            <ComboboxInput showTrigger={false} placeholder='Search columns...' />
            <ComboboxEmpty>No columns found.</ComboboxEmpty>
            <ComboboxList>
              {(option: ColumnOption) => (
                <ComboboxItem key={option.value} value={option}>
                  <span className='truncate'>{option.label}</span>
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      )}
    </Subscribe>
  );
}
