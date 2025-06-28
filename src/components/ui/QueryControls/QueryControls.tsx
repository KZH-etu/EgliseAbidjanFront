import React from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';

interface QueryControlsProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  onRefresh: () => void;
  loading?: boolean;
  children?: React.ReactNode;
  placeholder?: string;
}

export const QueryControls: React.FC<QueryControlsProps> = ({
  searchValue,
  onSearchChange,
  onSearchSubmit,
  onRefresh,
  loading = false,
  children,
  placeholder = "Search..."
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <form onSubmit={handleSubmit} className="flex-1">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={placeholder}
              className="form-input pl-10 w-full"
              disabled={loading}
            />
          </div>
        </form>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onSearchSubmit}
            disabled={loading}
            className="btn-primary flex items-center"
          >
            <Filter size={16} className="mr-1" />
            Apply Filters
          </button>
          
          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            className="btn-secondary flex items-center"
          >
            <RefreshCw size={16} className={`mr-1 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Additional filters */}
      {children && (
        <div className="border-t pt-4">
          {children}
        </div>
      )}
    </div>
  );
};