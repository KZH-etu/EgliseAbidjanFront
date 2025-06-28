import React from 'react';
import { SortParams } from '../../../types/common';

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  sortParams?: SortParams;
  onSort?: (key: string) => void;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  sortParams,
  onSort,
  loading = false,
  emptyMessage = 'No data available',
  className = ''
}: DataTableProps<T>) {
  const getSortIcon = (columnKey: string) => {
    if (!sortParams || sortParams.sortBy !== columnKey) return '';
    return sortParams.sortOrder === 'asc' ? ' ↑' : ' ↓';
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-8 h-8 border-t-2 border-primary-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="table-auto w-full text-sm">
        <thead>
          <tr className="text-left border-b border-neutral-200">
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={`py-3 px-4 font-medium ${
                  column.sortable ? 'cursor-pointer hover:bg-neutral-50' : ''
                }`}
                style={{ width: column.width }}
                onClick={() => column.sortable && onSort?.(String(column.key))}
              >
                {column.header}
                {column.sortable && getSortIcon(String(column.key))}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-8 text-neutral-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={item.id || index} className="border-b border-neutral-100 hover:bg-neutral-50">
                {columns.map((column) => (
                  <td key={String(column.key)} className="py-3 px-4">
                    {column.render ? column.render(item) : item[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}