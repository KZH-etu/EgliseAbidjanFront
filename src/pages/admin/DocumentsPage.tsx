import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { DocumentUpdate, NewDocument, Document } from "../../types/api";
import { useDocumentVersions } from "../../hooks/useDocumentVersions";
import { useTags } from "../../hooks/useTags";
import { useLanguages } from "../../hooks/useLanguages";
import { useDocuments } from "../../hooks/useDocuments";
import { useDocumentsQuery } from "../../hooks/useDocumentsQuery";
import { useAsyncOperation } from "../../hooks/useAsyncOperation";
import { AdminPageLayout } from "../../components/admin/shared/AdminPageLayout";
import { DataTable, Column } from "../../components/ui/DataTable/DataTable";
import { Pagination } from "../../components/ui/Pagination/Pagination";
import { QueryControls } from "../../components/ui/QueryControls/QueryControls";
import DocumentForm from "../../components/admin/admin-documents/DocumentForm";

export default function DocumentsPage() {
  // Backend query hook
  const {
    data: docs,
    pagination,
    loading,
    error,
    queryState,
    setSearch,
    setFilter,
    setSort,
    setPage,
    //executeQuery,
    refresh
  } = useDocumentsQuery();

  // API hooks for operations
  const { add, patch, remove, fetchMetaByDocument } = useDocuments();
  const { languages } = useLanguages();
  const { searchTags } = useTags();
  const { searchVersions } = useDocumentVersions();

  // UI state
  const [editingDoc, setEditingDoc] = useState<Document | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchInput, setSearchInput] = useState(queryState.search || '');

  // Async operations
  const saveOperation = useAsyncOperation(
    async (data: Partial<NewDocument>, id: string | null) => {
      if (id) {
        await patch(id, data as DocumentUpdate);
      } else {
        await add(data as NewDocument);
      }
      refresh(); // Refresh the query after save
    },
    {
      onSuccess: () => {
        setEditingDoc(null);
        setIsCreating(false);
      }
    }
  );

  const deleteOperation = useAsyncOperation(
    async (id: string) => {
      if (window.confirm('Are you sure you want to delete this document?')) {
        await remove(id);
        refresh(); // Refresh the query after delete
      }
    }
  );

  // Handle search submission
  const handleSearchSubmit = () => {
    setSearch(searchInput);
  };

  // Table columns configuration
  const columns: Column<Document>[] = [
    {
      key: 'id',
      header: 'ID',
      sortable: true,
      width: '100px'
    },
    {
      key: 'globalTitle',
      header: 'Title',
      sortable: true
    },
    {
      key: 'categories',
      header: 'Categories',
      render: (doc) => Array.isArray(doc.categories) ? doc.categories.join(', ') : doc.categories
    },
    {
      key: 'availableLanguages',
      header: 'Languages',
      render: (doc) => doc.availableLanguages.map(l => l.name).join(', ')
    },
    {
      key: 'tags',
      header: 'Tags',
      render: (doc) => (
        <div className="flex flex-wrap gap-1">
          {doc.tags?.map(tag => (
            <span key={tag.id} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
              {tag.id}
            </span>
          ))}
        </div>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (doc) => (
        <div className="flex gap-2">
          <button
            className="text-blue-600 hover:text-blue-800"
            onClick={() => {
              setEditingDoc(doc);
              setIsCreating(false);
            }}
          >
            <Edit2 size={16} />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => deleteOperation.execute(doc.id)}
            disabled={deleteOperation.isLoading}
          >
            <Trash2 size={16} />
          </button>
        </div>
      )
    }
  ];

  const actions = (
    <button
      className="btn-primary"
      onClick={() => {
        setEditingDoc(null);
        setIsCreating(true);
      }}
    >
      <Plus size={18} className="mr-1" /> Nouveau
    </button>
  );

  return (
    <AdminPageLayout
      title="Gestion des Documents"
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
        placeholder="Search by title..."
      >
        {/* Additional filters */}
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
      {(isCreating || editingDoc) && (
        <DocumentForm
          isCreating={isCreating}
          editingDoc={editingDoc}
          onSave={saveOperation.execute}
          onCancel={() => {
            setEditingDoc(null);
            setIsCreating(false);
          }}
          searchTags={searchTags}
          searchVersions={searchVersions}
          fetchMetaByDocument={fetchMetaByDocument}
        />
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <DataTable
          data={docs}
          columns={columns}
          sortParams={{
            sortBy: queryState.sortBy,
            sortOrder: queryState.sortOrder
          }}
          onSort={setSort}
          loading={loading || saveOperation.isLoading || deleteOperation.isLoading}
          emptyMessage="No documents found"
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