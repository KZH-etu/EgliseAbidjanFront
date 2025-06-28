import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { NewDocumentVersion, DocumentVersionUpdate, DocumentVersion } from "../../types/api";
import { useDocumentVersions } from '../../hooks/useDocumentVersions';
import { useDocumentVersionsQuery } from '../../hooks/useDocumentVersionsQuery';
import { useLanguages } from '../../hooks/useLanguages';
import { useAsyncOperation } from '../../hooks/useAsyncOperation';
import { AdminPageLayout } from '../../components/admin/shared/AdminPageLayout';
import { DataTable, Column } from '../../components/ui/DataTable/DataTable';
import { Pagination } from '../../components/ui/Pagination/Pagination';
import { QueryControls } from '../../components/ui/QueryControls/QueryControls';
import VersionForm from '../../components/admin/admin-document-versions/VersionForm';

export default function DocumentVersionsPage() {
  // Backend query hook
  const {
    data: items,
    pagination,
    loading,
    error,
    queryState,
    setSearch,
    setFilter,
    setSort,
    setPage,
    refresh
  } = useDocumentVersionsQuery();

  // API hooks for operations
  const { add, patch, remove } = useDocumentVersions();
  const { languages } = useLanguages();

  // UI state
  const [editingVersion, setEditingVersion] = useState<DocumentVersion | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchInput, setSearchInput] = useState(queryState.search || '');

  // Async operations
  const saveOperation = useAsyncOperation(
    async (data: Partial<NewDocumentVersion>, id: string | null) => {
      if (id) {
        await patch(id, data as DocumentVersionUpdate);
      } else {
        await add(data as NewDocumentVersion);
      }
      refresh();
    },
    {
      onSuccess: () => {
        setEditingVersion(null);
        setIsCreating(false);
      }
    }
  );

  const deleteOperation = useAsyncOperation(
    async (id: string) => {
      if (window.confirm('Are you sure you want to delete this version?')) {
        await remove(id);
        refresh();
      }
    }
  );

  // Handle search submission
  const handleSearchSubmit = () => {
    setSearch(searchInput);
  };

  // Table columns configuration
  const columns: Column<DocumentVersion>[] = [
    {
      key: 'id',
      header: 'ID',
      sortable: true,
      width: '100px'
    },
    {
      key: 'documentId',
      header: 'Document ID',
      sortable: true,
      width: '150px'
    },
    {
      key: 'title',
      header: 'Title',
      sortable: true
    },
    {
      key: 'languageId',
      header: 'Language',
      sortable: true,
      width: '120px'
    },
    {
      key: 'createdAt',
      header: 'Created At',
      sortable: true,
      render: (version) => new Date(version.createdAt).toLocaleDateString(),
      width: '120px'
    },
    {
      key: 'updatedAt',
      header: 'Updated At',
      sortable: true,
      render: (version) => new Date(version.updatedAt).toLocaleDateString(),
      width: '120px'
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (version) => (
        <div className="flex gap-2">
          <button
            className="text-blue-600 hover:text-blue-800"
            onClick={() => {
              setEditingVersion(version);
              setIsCreating(false);
            }}
          >
            <Edit2 size={16} />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => deleteOperation.execute(version.id)}
            disabled={deleteOperation.isLoading}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
      width: '100px'
    }
  ];

  const actions = (
    <button
      className="btn-primary"
      onClick={() => {
        setEditingVersion(null);
        setIsCreating(true);
      }}
    >
      <Plus size={18} className="mr-1" /> Nouveau
    </button>
  );

  return (
    <AdminPageLayout
      title="Gestion des Versions de Documents"
      error={error}
      actions={actions}
    >
      {/* Query Controls */}
      <QueryControls
        searchValue={searchInput}
        onSearchChange={setSearchInput}
        onSearchSubmit={handleSearchSubmit}
        onRefresh={refresh}
        loading={loading}
        placeholder="Search by id, docId, title..."
      >
        {/* Language filter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            className="form-select"
            value={queryState.languageId || ''}
            onChange={(e) => setFilter('languageId', e.target.value)}
          >
            <option value="">All Languages</option>
            {languages.map(lang => (
              <option key={lang.id} value={lang.id}>{lang.name}</option>
            ))}
          </select>
        </div>
      </QueryControls>

      {/* Form */}
      {(isCreating || editingVersion) && (
        <VersionForm
          isCreating={isCreating}
          editingId={editingVersion ? editingVersion.id : null}
          initialData={
            editingVersion
              ? {
                  documentId: editingVersion.documentId,
                  title: editingVersion.title,
                  languageId: editingVersion.languageId,
                }
              : {}
          }
          languages={languages}
          onSave={saveOperation.execute}
          onCancel={() => {
            setEditingVersion(null);
            setIsCreating(false);
          }}
        />
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <DataTable
          data={items}
          columns={columns}
          sortParams={{
            sortBy: queryState.sortBy,
            sortOrder: queryState.sortOrder
          }}
          onSort={setSort}
          loading={loading || saveOperation.isLoading || deleteOperation.isLoading}
          emptyMessage="No document versions found"
        />
        
        {/* Pagination */}
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={setPage}
          hasNext={pagination.hasNext}
          hasPrev={pagination.hasPrev}
          loading={loading}
        />
      </div>
    </AdminPageLayout>
  );
}