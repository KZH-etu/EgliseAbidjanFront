import { useEffect, useState } from "react";
import { Edit2, Trash2, Plus, Save, X } from "lucide-react";
import { useTags } from "../../hooks/useTags";
import { LanguageEnum, NewTag, TagTranslation } from "../../types/api";
import { Tag } from "../../types/api";

type TagFormState = {
  [key in LanguageEnum]?: string;
};

export default function TagsPage() {
  const { tags, addTag, updateTag, removeTag, error } = useTags();

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TagFormState>({});
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<Tag[]>([]);

  useEffect(() => {
    setFiltered(
      tags.filter(
        (tag) =>
          tag.translations.some((t) =>
            t.title.toLowerCase().includes(search.toLowerCase())
          ) || tag.id.includes(search)
      )
    );
  }, [tags, search]);

  const handleSubmit = async () => {
    // At least one translation must be filled
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
  };

  const handleEdit = (tag: Tag) => {
    setEditingId(tag.id);
    const newForm: TagFormState = {};
    tag.translations.forEach((tr) => {
      newForm[tr.language as LanguageEnum] = tr.title;
    });
    setForm(newForm);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Gestion des Tags</h1>
      {error && <div className="text-red-500">{error}</div>}

      {/* Top Bar */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-input"
          placeholder="Search by id or translation"
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
          <div className="mb-2 font-semibold">Traductions</div>
          <div className="flex flex-col gap-2 mb-4">
            {Object.values(LanguageEnum).map((lang) => (
              <div key={lang} className="flex items-center gap-2">
                <label className="w-10 capitalize">{lang}:</label>
                <input
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
            <th>fr</th>
            <th>en</th>
            <th>es</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((tag) => (
            <tr key={tag.id} className="border-t">
              <td>{tag.id}</td>
              {Object.values(LanguageEnum).map((lang) => (
                <td key={lang}>
                  {
                    tag.translations.find((t) => t.language === lang)?.title ||
                    <span className="text-gray-400 italic">-</span>
                  }
                </td>
              ))}
              <td className="flex gap-2">
                <button
                  onClick={() => handleEdit(tag)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => removeTag(tag.id)}
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
};