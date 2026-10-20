import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import type { User } from '../../api/types';
import type { Column, ColumnDef } from '@tanstack/react-table';
import type { DataTableFeatures } from '@/lib/data-table-features';
import { getColumnOptions } from '@/lib/data-table-parsers';
import { Icons } from '@/components/icons';
import { CellAction } from './cell-action';
import { usersColumnConfigs } from './search-params';
import { ROLE_OPTIONS } from './options';

export const columns: ColumnDef<DataTableFeatures, User>[] = [
  {
    id: 'name',
    accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    ...getColumnOptions(usersColumnConfigs.name),
    header: ({ column }: { column: Column<DataTableFeatures, User, unknown> }) => (
      <DataTableColumnHeader column={column} label='Name' />
    ),
    cell: ({ row }) => (
      <div className='flex flex-col'>
        <span className='font-medium'>
          {row.original.first_name} {row.original.last_name}
        </span>
        <span className='text-xs text-muted-foreground'>{row.original.email}</span>
      </div>
    ),
    meta: {
      label: 'Name',
      placeholder: 'Search users...',
      variant: usersColumnConfigs.name.variant,
      icon: Icons.text
    }
  },
  {
    accessorKey: 'phone',
    header: 'PHONE'
  },
  {
    id: 'role',
    accessorKey: 'role',
    ...getColumnOptions(usersColumnConfigs.role),
    header: ({ column }: { column: Column<DataTableFeatures, User, unknown> }) => (
      <DataTableColumnHeader column={column} label='Role' />
    ),
    cell: ({ cell }) => {
      return (
        <Badge variant='outline' className='capitalize'>
          {cell.getValue<User['role']>()}
        </Badge>
      );
    },
    meta: {
      label: 'roles',
      variant: usersColumnConfigs.role.variant,
      options: ROLE_OPTIONS
    }
  },
  {
    accessorKey: 'status',
    header: 'STATUS',
    cell: ({ cell }) => {
      const status = cell.getValue<User['status']>();
      const variant =
        status === 'Active' ? 'default' : status === 'Inactive' ? 'secondary' : 'outline';
      return <Badge variant={variant}>{status}</Badge>;
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
