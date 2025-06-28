import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { useLanguages } from "../../hooks/useLanguages";
import { useLanguagesQuery } from "../../hooks/useLanguagesQuery";
import { Language, NewLanguage, LanguageUpdate, LanguageType } from "../../types/api";
import { useAsyncOperation } from "../../hooks/useAsyncOperation";
import { AdminPageLayout } from "../../components/admin/shared/AdminPageLayout";
import { DataTable, Column } from "../../components/ui/DataTable/DataTable";
import { Pagination } from "../../components/ui/Pagination/Pagination";
import { QueryControls } from "../../components/ui/QueryControls/QueryControls";
import LanguageForm from "../../components/admin/admin-languages/LanguageForm";

export default function LanguagesPage() {
  // Backend query hook
  const {
    data: languages,
    pagination,
    loading,
    error,
    queryState,
    setSearch,
    setFilter,
    setSort,
    setPage,
    refresh
  } = useLanguagesQuery();

  // API hooks for operations
  const { addLanguage, updateLanguage, removeLanguage } = useLanguages();

  // UI state
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<NewLanguage>>({});
  const [searchInput, setSearchInput] = useState(queryState.search || '');

  // Async operations
  const saveOperation = useAsyncOperation(
    async () => {
      if (!form.name || !form.type) return;
      if (editingId) {
        await updateLanguage(editingId, form as LanguageUpdate);
        setEditingId(null);
      } else if (isCreating) {
        await addLanguage(form as NewLanguage);
        setIsCreating(false);
      }
      setForm({});
      refresh();
    },
    {
      onSuccess: () => {
        setEditingId(null);
        setIsCreating(false);
        setForm({});
      }
    }
  );

  const deleteOperation = useAsyncOperation(
    async (id: string) => {
      if (window.confirm('Are you sure you want to delete this language?')) {
        await removeLanguage(id);
        refresh();
      }
    }
  );

  const handleEdit = (lang: Language) => {
    setEditingId(lang.id);
    setForm({
      name: lang.name,
      type: lang.type,
      countryOfOrigin: lang.countryOfOrigin,
    });
  };

  // Handle search submission
  const handleSearchSubmit = () => {
    setSearch(searchInput);
  };

  // Table columns configuration
  const columns: Column<Language>[] = [
    {
      key: 'id',
      header: 'ID',
      sortable: true,
      width: '100px'
    },
    {
      key: 'name',
      header: 'Nom',
      sortable: true
    },
    {
      key: 'type',
      header: 'Type',
      sortable: true,
      width: '150px'
    },
    {
      key: 'countryOfOrigin',
      header: 'Pays d\'origine',
      render: (lang) => lang.countryOfOrigin || <span className="text-gray-400 italic">-</span>,
      width: '200px'
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (lang) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(lang)}
            className="text-blue-600 hover:text-blue-800"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => deleteOperation.execute(lang.id)}
            className="text-red-500 hover:text-red-700"
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
      onClick={() => {
        setEditingId(null);
        setForm({});
        setIsCreating(true);
      }}
      className="btn-primary"
    >
      <Plus size={18} className="mr-1" /> Nouveau
    </button>
  );

  return (
    <AdminPageLayout
      title="Gestion des Langues"
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
        placeholder="Search by id, name, or country..."
      >
        {/* Type filter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            className="form-select"
            value={queryState.type || ''}
            onChange={(e) => setFilter('type', e.target.value)}
          >
            <option value="">All Types</option>
            {Object.values(LanguageType).map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </QueryControls>

      {/* Form */}
      {(editingId !== null || isCreating) && (
        <LanguageForm
          form={form}
          setForm={setForm}
          onCancel={() => {
            setEditingId(null);
            setForm({});
            setIsCreating(false);
          }}
          onSubmit={saveOperation.execute}
        />
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <DataTable
          data={languages}
          columns={columns}
          sortParams={{
            sortBy: queryState.sortBy,
            sortOrder: queryState.sortOrder
          }}
          onSort={setSort}
          loading={loading || saveOperation.isLoading || deleteOperation.isLoading}
          emptyMessage="No languages found"
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