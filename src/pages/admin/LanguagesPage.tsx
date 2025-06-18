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
        <div className="bg-gray-50 p-4 rounded shadow max-w-md">
          <div className="mb-2 font-semibold">Détails de la langue</div>
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center gap-2">
              <label className="w-32">Nom:</label>
              <input
                className="form-input flex-1"
                placeholder="Nom de la langue"
                value={form.name || ""}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="w-32">Type:</label>
              <select
                className="form-select flex-1"
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
                <label className="w-32">Pays d'origine:</label>
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
          <div className="flex gap-2">
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
      <table className="table-auto w-full text-sm">
        <thead>
          <tr className="text-left">
            <th>ID</th>
            <th>Nom</th>
            <th>Type</th>
            <th>Pays d'origine</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((lang) => (
            <tr key={lang.id} className="border-t">
              <td>{lang.id}</td>
              <td>{lang.name}</td>
              <td>{lang.type}</td>
              <td>{lang.countryOfOrigin || <span className="text-gray-400 italic">-</span>}</td>
              <td className="flex gap-2">
                <button
                  onClick={() => handleEdit(lang)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => removeLanguage(lang.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}