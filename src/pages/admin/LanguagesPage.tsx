import { useEffect, useState } from "react";
import { Edit2, Trash2, Plus, Save, X } from "lucide-react";
import { useLanguages } from "../../hooks/useLanguages";
import { LanguageType, LanguageResponseDto } from "../../types/languages";
import { CreateLanguageDto, UpdateLanguageDto } from "../../types/languages";

type LanguageFormState = {
  name?: string;
  type?: LanguageType;
  countryOfOrigin?: string;
};

export default function LanguagesPage() {
  const { languages, loadLanguages, addLanguage, updateLanguage, removeLanguage, error } = useLanguages();

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<LanguageFormState>({});
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<LanguageResponseDto[]>([]);

  useEffect(() => {
    loadLanguages();
  }, [loadLanguages]);

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
      await updateLanguage(editingId, form as UpdateLanguageDto);
      setEditingId(null);
    } else if (isCreating) {
      await addLanguage(form as CreateLanguageDto);
      setIsCreating(false);
    }
    setForm({});
  };

  const handleEdit = (lang: LanguageResponseDto) => {
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

      {/* Form */}
      {(editingId !== null || isCreating) && (
        <div className="bg-gray-50 p-4 rounded shadow">
          <div className="mb-2 font-semibold">Détails de la langue</div>
          <div className="flex justify-around gap-2 mb-4">
            <div className="flex items-center gap-2">
              <label className="w-24">Nom:</label>
              <input
                className="form-input flex-1"
                placeholder="Nom de la langue"
                value={form.name || ""}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="w-24">Type:</label>
              <select
                className="form-select flex-1 p-3"
                value={form.type || ""}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    type: e.target.value as LanguageType,
                  }))
                }
              >
                <option value="">Sélectionner le type</option>
                {Object.values(LanguageType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            {form.type === LanguageType.INTERNATIONAL && (
              <div className="flex items-center gap-2">
                <label className="w-24s">Pays d'origine:</label>
                <input
                  className="form-input flex-1"
                  placeholder="Pays d'origine"
                  value={form.countryOfOrigin || ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, countryOfOrigin: e.target.value }))
                  }
                />
              </div>
            )}
          </div>
          <div className="flex justify-center gap-2">
            <button className="btn-primary" onClick={handleSubmit}>
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
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto mt-5">
        <table className="w-full">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200">
              <th className="px-6 py-3 text-center">ID</th>
              <th className="px-6 py-3 text-center">Nom</th>
              <th className="px-6 py-3 text-center">Type</th>
              <th className="px-6 py-3 text-center">Pays d'origine</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((lang) => (
              <tr key={lang.id} className="border-b border-neutral-200 hover:bg-neutral-50">
                <td className="px-6 py-4 text-center">{lang.id}</td>
                <td className="px-6 py-4 text-center">{lang.name}</td>
                <td className="px-6 py-4 text-center">{lang.type}</td>
                <td className="px-6 py-4 text-center">{lang.countryOfOrigin || <span className="text-gray-400 italic">-</span>}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleEdit(lang)}
                    className="text-primary-600 hover:text-primary-800 p-2"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => removeLanguage(lang.id)}
                    className="text-error hover:text-error/80 p-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
}