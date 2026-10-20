import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import type { Product } from '../../api/types';
import type { Column, ColumnDef } from '@tanstack/react-table';
import type { DataTableFeatures } from '@/lib/data-table-features';
import { getColumnOptions } from '@/lib/data-table-parsers';
import { Icons } from '@/components/icons';
import { CellAction } from './cell-action';
import { productsColumnConfigs } from './search-params';
import { CATEGORY_OPTIONS } from './options';

export const columns: ColumnDef<DataTableFeatures, Product>[] = [
  {
    accessorKey: 'photo_url',
    header: 'IMAGE',
    cell: ({ row }) => {
      return (
        <div className='relative aspect-square'>
          <img
            src={row.getValue('photo_url')}
            alt={row.getValue('name')}
            className='h-full w-full rounded-lg object-cover'
          />
        </div>
      );
    }
  },
  {
    id: 'name',
    accessorKey: 'name',
    ...getColumnOptions(productsColumnConfigs.name),
    header: ({ column }: { column: Column<DataTableFeatures, Product, unknown> }) => (
      <DataTableColumnHeader column={column} label='Name' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<Product['name']>()}</div>,
    meta: {
      label: 'Name',
      placeholder: 'Search products...',
      variant: productsColumnConfigs.name.variant,
      icon: Icons.text
    }
  },
  {
    id: 'category',
    accessorKey: 'category',
    ...getColumnOptions(productsColumnConfigs.category),
    header: ({ column }: { column: Column<DataTableFeatures, Product, unknown> }) => (
      <DataTableColumnHeader column={column} label='Category' />
    ),
    cell: ({ cell }) => {
      const status = cell.getValue<Product['category']>();
      const Icon = status === 'active' ? Icons.circleCheck : Icons.xCircle;

      return (
        <Badge variant='outline' className='capitalize'>
          <Icon />
          {status}
        </Badge>
      );
    },
    meta: {
      label: 'categories',
      variant: productsColumnConfigs.category.variant,
      options: CATEGORY_OPTIONS
    }
  },
  {
    accessorKey: 'price',
    header: 'PRICE'
  },
  {
    accessorKey: 'description',
    header: 'DESCRIPTION'
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
