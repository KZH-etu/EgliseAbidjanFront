import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useLanguages } from "../../hooks/useLanguages";
import { Language } from "../../types/api";
import { NewLanguage, LanguageUpdate } from "../../types/api";
import LanguagesTable from "../../components/admin/admin-languages/LanguagesTable";
import LanguageForm from "../../components/admin/admin-languages/LanguageForm";

export default function LanguagesPage() {
  const {
    languages,
    addLanguage,
    updateLanguage,
    removeLanguage,
    error,
  } = useLanguages();

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<NewLanguage>>({});
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<Language[]>([]);

  useEffect(() => {
    setFiltered(
      languages.filter(
        (lang) =>
          lang.id.toLowerCase().includes(search.toLowerCase()) ||
          lang.name.toLowerCase().includes(search.toLowerCase()) ||
          (lang.countryOfOrigin || "").toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [languages, search]);

  const handleSubmit = async () => {
    if (!form.name || !form.type) return;
    if (editingId) {
      await updateLanguage(editingId, form as LanguageUpdate);
      setEditingId(null);
    } else if (isCreating) {
      await addLanguage(form as NewLanguage);
      setIsCreating(false);
    }
    setForm({});
  };

  const handleEdit = (lang: Language) => {
    setEditingId(lang.id);
    setForm({
      name: lang.name,
      type: lang.type,
      countryOfOrigin: lang.countryOfOrigin,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Gestion des Langues</h1>
      {error && <div className="text-red-500">{error}</div>}

      {/* Top Bar */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-input"
          placeholder="Search by id, name, or country"
        />
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
      </div>

      { (editingId !== null || isCreating) && (
        <LanguageForm
          form={form}
          setForm={setForm}
          onCancel={() => {
            setEditingId(null);
            setForm({});
            setIsCreating(false);
          }}
          onSubmit={handleSubmit}
        />
      ) }

      <LanguagesTable
        languages={filtered}
        onEdit={handleEdit}
        onDelete={removeLanguage}
      />
    </div>
  );
}
