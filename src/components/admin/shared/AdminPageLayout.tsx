import React from 'react';
import { LoadingSpinner } from '../../ui/LoadingSpinner/LoadingSpinner';

interface AdminPageLayoutProps {
  title: string;
  children: React.ReactNode;
  loading?: boolean;
  error?: string | null;
  actions?: React.ReactNode;
}

export const AdminPageLayout: React.FC<AdminPageLayoutProps> = ({
  title,
  children,
  loading = false,
  error = null,
  actions
}) => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>

      {error && (
        <div className="bg-error/10 border-l-4 border-error text-error p-4 rounded">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        children
      )}
    </div>
  );
};