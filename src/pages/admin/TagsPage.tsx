import { useState } from "react";
import { Edit2, Trash2, Plus, Save, X } from "lucide-react";
import { useTags } from "../../hooks/useTags";
import { useTagsQuery } from "../../hooks/useTagsQuery";
import { LanguageEnum, NewTag, TagTranslation, Tag } from "../../types/api";
import { useAsyncOperation } from "../../hooks/useAsyncOperation";
import { AdminPageLayout } from "../../components/admin/shared/AdminPageLayout";
import { DataTable, Column } from "../../components/ui/DataTable/DataTable";
import { Pagination } from "../../components/ui/Pagination/Pagination";
import { QueryControls } from "../../components/ui/QueryControls/QueryControls";

type TagFormState = {
  [key in LanguageEnum]?: string;
};

export default function TagsPage() {
  // Backend query hook
  const {
    data: tags,
    pagination,
    loading,
    error,
    queryState,
    setSearch,
    setSort,
    setPage,
    refresh
  } = useTagsQuery();

  // API hooks for operations
  const { addTag, updateTag, removeTag } = useTags();

  // UI state
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TagFormState>({});
  const [searchInput, setSearchInput] = useState(queryState.search || '');

  // Async operations
  const saveOperation = useAsyncOperation(
    async () => {
      const translations: TagTranslation[] = Object.entries(form)
        .filter(([_, title]) => title && title.trim() !== "")
        .map(([language, title]) => ({
          language: language as LanguageEnum,
          title: title!.trim(),
        }));

      if (translations.length === 0) return;

      if (editingId) {
        await updateTag(editingId, { translations } as NewTag);
        setEditingId(null);
      } else if (isCreating) {
        await addTag({ translations } as NewTag);
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
      if (window.confirm('Are you sure you want to delete this tag?')) {
        await removeTag(id);
        refresh();
      }
    }
  );

  const handleEdit = (tag: Tag) => {
    setEditingId(tag.id);
    const newForm: TagFormState = {};
    tag.translations.forEach((tr) => {
      newForm[tr.language as LanguageEnum] = tr.title;
    });
    setForm(newForm);
  };

  // Handle search submission
  const handleSearchSubmit = () => {
    setSearch(searchInput);
  };

  // Table columns configuration
  const columns: Column<Tag>[] = [
    {
      key: 'id',
      header: 'ID',
      sortable: true,
      width: '150px'
    },
    ...Object.values(LanguageEnum).map(lang => ({
      key: lang,
      header: lang.toUpperCase(),
      render: (tag: Tag) => {
        const translation = tag.translations.find(t => t.language === lang);
        return translation?.title || <span className="text-gray-400 italic">-</span>;
      },
      width: '150px'
    })),
    {
      key: 'actions',
      header: 'Actions',
      render: (tag: Tag) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(tag)}
            className="text-blue-600 hover:text-blue-800"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => deleteOperation.execute(tag.id)}
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
      title="Gestion des Tags"
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
        placeholder="Search by id or translation..."
      />

      {/* Form */}
      {(editingId !== null || isCreating) && (
        <div className="bg-gray-50 p-4 rounded shadow max-w-md">
          <div className="mb-2 font-semibold">Traductions</div>
          <div className="flex flex-col gap-2 mb-4">
            {Object.values(LanguageEnum).map((lang) => (
              <div key={lang} className="flex items-center gap-2">
                <label htmlFor={`tag-${lang}`} className="w-10 capitalize">{lang}:</label>
                <input
                  id={`tag-${lang}`}
                  name={`tag-${lang}`}
                  className="form-input flex-1"
                  placeholder={`Titre en ${lang}`}
                  value={form[lang] || ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, [lang]: e.target.value }))
                  }
                />
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button 
              className="btn-primary" 
              onClick={saveOperation.execute}
              disabled={saveOperation.isLoading}
            >
              <Save size={16} className="mr-1" /> Enregistrer
            </button>
            <button
              className="btn-secondary"
              onClick={() => {
                setEditingId(null);
                setForm({});
                setIsCreating(false);
              }}
            >
              <X size={16} className="mr-1" /> Annuler
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <DataTable
          data={tags}
          columns={columns}
          sortParams={{
            sortBy: queryState.sortBy,
            sortOrder: queryState.sortOrder
          }}
          onSort={setSort}
          loading={loading || saveOperation.isLoading || deleteOperation.isLoading}
          emptyMessage="No tags found"
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