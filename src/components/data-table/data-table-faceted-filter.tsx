import * as React from 'react';

import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox';
import { type Column, type RowData, Subscribe } from '@tanstack/react-table';

import type { DataTableFeatures } from '@/lib/data-table-features';
import type { FilterOption } from '@/lib/data-table-types';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxSeparator
} from '@/components/ui/combobox';
import { Separator } from '@/components/ui/separator';
import { IconCircleX, IconCirclePlus } from '@tabler/icons-react';

interface DataTableFacetedFilterProps<TData extends RowData, TValue> {
  column?: Column<DataTableFeatures, TData, TValue>;
  title?: string;
  options: FilterOption[];
  multiple?: boolean;
}

export function DataTableFacetedFilter<TData extends RowData, TValue>({
  column,
  ...props
}: DataTableFacetedFilterProps<TData, TValue>) {
  if (!column) {
    return <DataTableFacetedFilterContent column={column} {...props} />;
  }

  return (
    <Subscribe source={column.table.atoms.columnFilters} selector={() => column.getFilterValue()}>
      {(filterValue) => (
        <DataTableFacetedFilterContent column={column} columnFilterValue={filterValue} {...props} />
      )}
    </Subscribe>
  );
}

interface DataTableFacetedFilterContentProps<
  TData extends RowData,
  TValue
> extends DataTableFacetedFilterProps<TData, TValue> {
  columnFilterValue?: unknown;
}

// Local patch: built on Base UI Combobox instead of DiceUI Faceted, which needs
// cmdk (and through it Radix). Same trigger, badges and list as upstream.
function DataTableFacetedFilterContent<TData extends RowData, TValue>({
  column,
  title = column?.columnDef.meta?.label ?? column?.id,
  options,
  multiple = false,
  columnFilterValue
}: DataTableFacetedFilterContentProps<TData, TValue>) {
  const [open, setOpen] = React.useState(false);
  const selectedValues = Array.isArray(columnFilterValue)
    ? columnFilterValue.filter((value): value is string => typeof value === 'string')
    : [];
  const selectedOptions = options.filter((option) => selectedValues.includes(option.value));
  const hasSelection = selectedValues.length > 0;

  // The combobox always holds an array; single-select keeps only the newest
  // pick and closes, like a select.
  function onValueChange(next: FilterOption[]) {
    let values = next.map((option) => option.value);
    if (!multiple) {
      const added = values.find((value) => !selectedValues.includes(value));
      values = added ? [added] : [];
      setOpen(false);
    }
    column?.setFilterValue(values.length > 0 ? values : undefined);
  }

  function onReset(event?: React.SyntheticEvent) {
    event?.stopPropagation();
    column?.setFilterValue(undefined);
  }

  return (
    <Combobox
      multiple
      items={options}
      value={selectedOptions}
      onValueChange={onValueChange}
      open={open}
      onOpenChange={setOpen}
    >
      <ComboboxPrimitive.Trigger
        aria-label={title}
        render={<Button variant='outline' className='border-dashed' />}
        className='justify-between text-left'
      >
        {hasSelection ? (
          <span
            aria-hidden='true'
            className='rounded-sm opacity-70 transition-opacity hover:opacity-100'
            onMouseDown={(event) => event.stopPropagation()}
            onClick={onReset}
          >
            <IconCircleX />
          </span>
        ) : (
          <IconCirclePlus />
        )}
        {title}
        {hasSelection && (
          <>
            <Separator
              orientation='vertical'
              className='mx-0.5 data-vertical:h-4 data-vertical:self-center'
            />
            <div className='flex w-max max-w-full flex-wrap items-center gap-1'>
              {selectedOptions.length > 2 ? (
                <FilterBadge>{selectedOptions.length} selected</FilterBadge>
              ) : (
                selectedOptions.map((option) => (
                  <FilterBadge key={option.value}>
                    <span className='truncate'>{option.label}</span>
                  </FilterBadge>
                ))
              )}
            </div>
          </>
        )}
      </ComboboxPrimitive.Trigger>
      <ComboboxContent aria-label={`${title} filter`} className='w-50'>
        <ComboboxInput showTrigger={false} placeholder={title} />
        <ComboboxEmpty>No results found.</ComboboxEmpty>
        <ComboboxList className='max-h-75'>
          {(option: FilterOption) => (
            <ComboboxItem key={option.value} value={option}>
              {option.icon && <option.icon />}
              <span className='flex-1 truncate'>{option.label}</span>
              {option.count !== undefined && (
                <span className='font-mono text-xs text-muted-foreground'>{option.count}</span>
              )}
            </ComboboxItem>
          )}
        </ComboboxList>
        {hasSelection && (
          <>
            <ComboboxSeparator className='mx-0 my-0' />
            <div className='p-1'>
              <Button variant='ghost' size='sm' className='w-full font-normal' onClick={onReset}>
                Clear filters
              </Button>
            </div>
          </>
        )}
      </ComboboxContent>
    </Combobox>
  );
}

function FilterBadge({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'flex h-[calc(--spacing(5.25))] w-fit max-w-full min-w-0 items-center justify-center gap-1 rounded-sm bg-input/60 px-1.5 text-xs font-medium whitespace-nowrap text-foreground',
        className
      )}
      {...props}
    />
  );
}
