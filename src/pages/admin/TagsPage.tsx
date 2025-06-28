import { useEffect, useState } from "react";
import { Edit2, Trash2, Plus, Save, X } from "lucide-react";
import { useTags } from "../../hooks/useTags";
import { LanguageEnum, CreateTagDto, CreateTagTranslationDto } from "../../types/tags";
import { TagResponseDto } from "../../types/tags";

type TagFormState = {
  [key in LanguageEnum]?: string;
};

export default function TagsPage() {
  const { tags, loadTags, addTag, updateTag, removeTag, error } = useTags();

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TagFormState>({});
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<TagResponseDto[]>([]);

  useEffect(() => {
    loadTags();
  }, [loadTags]);

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
    const translations: CreateTagTranslationDto[] = Object.entries(form)
      .filter(([_, title]) => title && title.trim() !== "")
      .map(([language, title]) => ({
        language: language as LanguageEnum,
        title: title!.trim(),
      }));

    if (translations.length === 0) return;

    if (editingId) {
      await updateTag(editingId, { translations } as CreateTagDto);
      setEditingId(null);
    } else if (isCreating) {
      await addTag({ translations } as CreateTagDto);
      setIsCreating(false);
    }
    setForm({});
  };

  const handleEdit = (tag: TagResponseDto) => {
    setEditingId(tag.id);
    const newForm: TagFormState = {};
    tag.translations.forEach((tr) => {
      newForm[tr.language as LanguageEnum] = tr.title;
    });
    setForm(newForm);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Tags</h1>
      </div>
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
        <div className="bg-white rounded-lg shadow-sm p-6 mt-5">
          <div className="mb-4 font-semibold">Traductions</div>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {Object.values(LanguageEnum).map((lang) => (
              <input
                key={lang}
                className="form-input flex-1"
                placeholder={`Titre en ${lang}`}
                value={form[lang] || ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, [lang]: e.target.value }))
                }
              />
            ))}
          </div>
          <div className="flex justify-center gap-2">
            <button className="btn-primary flex items-center" onClick={handleSubmit}>
              <Save size={16} className="mr-1" />
              Enregistrer
            </button>
            <button
              className="btn-secondary flex items-center"
              onClick={() => {
                setEditingId(null);
                setForm({});
                setIsCreating(false);
              }}
            >
              <X size={16} className="mr-1" />
              Annuler
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
              <th className="px-6 py-3 text-center">fr</th>
              <th className="px-6 py-3 text-center">en</th>
              <th className="px-6 py-3 text-center">es</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((tag) => (
              <tr key={tag.id} className="border-b border-neutral-200 hover:bg-neutral-50">
                <td className="px-6 py-4 text-center">{tag.id}</td>
                {Object.values(LanguageEnum).map((lang) => (
                  <td key={lang} className="px-6 py-4 text-center">
                    {
                      tag.translations.find((t) => t.language === lang)?.title ||
                      <span className="text-gray-400 italic">-</span>
                    }
                  </td>
                ))}
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleEdit(tag)}
                    className="text-primary-600 hover:text-primary-800 p-2"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => removeTag(tag.id)}
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
};