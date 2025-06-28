import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { DocumentMedia, MediaType, NewDocumentMedia, DocumentMediaUpdate } from "../../types/api";
import { useDocumentMedia } from '../../hooks/useDocumentMedia';
import { useDocumentMediaQuery } from '../../hooks/useDocumentMediaQuery';
import { useAsyncOperation } from '../../hooks/useAsyncOperation';
import { AdminPageLayout } from '../../components/admin/shared/AdminPageLayout';
import { DataTable, Column } from '../../components/ui/DataTable/DataTable';
import { Pagination } from '../../components/ui/Pagination/Pagination';
import { QueryControls } from '../../components/ui/QueryControls/QueryControls';
import MediaForm from '../../components/admin/admin-document-media/MediaForm';

const mediaTypeOptions: MediaType[] = [MediaType.AUDIO, MediaType.TEXT, MediaType.VIDEO];

export default function DocumentMediaPage() {
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
  } = useDocumentMediaQuery();

  // API hooks for operations
  const { add, patch, remove } = useDocumentMedia();

  // UI state
  const [editingMedia, setEditingMedia] = useState<DocumentMedia | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchInput, setSearchInput] = useState(queryState.search || '');

  // Async operations
  const saveOperation = useAsyncOperation(
    async (data: Partial<NewDocumentMedia>, id: string | null) => {
      if (id) {
        await patch(id, data as DocumentMediaUpdate);
      } else {
        await add(data as NewDocumentMedia);
      }
      refresh();
    },
    {
      onSuccess: () => {
        setEditingMedia(null);
        setIsCreating(false);
      }
    }
  );

  const deleteOperation = useAsyncOperation(
    async (id: string) => {
      if (window.confirm('Are you sure you want to delete this media?')) {
        await remove(id);
        refresh();
      }
    }
  );

  // Handle search submission
  const handleSearchSubmit = () => {
    setSearch(searchInput);
  };

  // Handle media type filter
  const handleMediaTypeChange = (type: string) => {
    setFilter('mediaType', type);
  };

  // Table columns configuration
  const columns: Column<DocumentMedia>[] = [
    {
      key: 'id',
      header: 'ID',
      sortable: true,
      width: '100px'
    },
    {
      key: 'documentVersionId',
      header: 'Document Version ID',
      sortable: true,
      width: '180px'
    },
    {
      key: 'mediaType',
      header: 'Media Type',
      sortable: true,
      width: '120px'
    },
    {
      key: 'url',
      header: 'URL',
      render: (media) => (
        <div className="truncate max-w-xs" title={media.url}>
          {media.url}
        </div>
      )
    },
    {
      key: 'createdAt',
      header: 'Created At',
      sortable: true,
      render: (media) => new Date(media.createdAt).toLocaleDateString(),
      width: '120px'
    },
    {
      key: 'updatedAt',
      header: 'Updated At',
      sortable: true,
      render: (media) => new Date(media.updatedAt).toLocaleDateString(),
      width: '120px'
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (media) => (
        <div className="flex gap-2">
          <button
            className="text-blue-600 hover:text-blue-800"
            onClick={() => {
              setEditingMedia(media);
              setIsCreating(false);
            }}
          >
            <Edit2 size={16} />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => deleteOperation.execute(media.id)}
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
        setEditingMedia(null);
        setIsCreating(true);
      }}
    >
      <Plus size={18} className="mr-1" /> Nouveau
    </button>
  );

  return (
    <AdminPageLayout
      title="Gestion des Supports Médias"
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
        placeholder="Search by id, docId, url..."
      >
        {/* Media type filter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            className="form-select"
            value={queryState.mediaType || ''}
            onChange={(e) => handleMediaTypeChange(e.target.value)}
          >
            <option value="">All Media Types</option>
            {mediaTypeOptions.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </QueryControls>

      {/* Form */}
      {(isCreating || editingMedia) && (
        <MediaForm
          isCreating={isCreating}
          editingId={editingMedia ? editingMedia.id : null}
          initialData={
            editingMedia
              ? {
                  documentVersionId: editingMedia.documentVersionId,
                  url: editingMedia.url,
                  mediaType: editingMedia.mediaType,
                }
              : {}
          }
          onSave={saveOperation.execute}
          onCancel={() => {
            setEditingMedia(null);
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
          emptyMessage="No media items found"
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