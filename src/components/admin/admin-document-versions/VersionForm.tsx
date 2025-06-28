import { useEffect, useState } from "react";
import { Language, NewDocumentVersion } from "../../../types/api";
import { Save, X } from "lucide-react";

interface VersionFormProps {
  isCreating: boolean;
  editingId: string | null;
  initialData: Partial<NewDocumentVersion>;
  languages: Language[];
  onSave: (data: Partial<NewDocumentVersion>, id: string | null) => Promise<void>;
  onCancel: () => void;
}

const VersionForm: React.FC<VersionFormProps> = ({
  isCreating,
  editingId,
  initialData,
  languages,
  onSave,
  onCancel,
}) => {
  const [form, setForm] = useState<Partial<NewDocumentVersion>>(initialData);

  useEffect(() => {
    setForm(initialData);
  }, [initialData]);

  const handleSubmit = async () => {
    if (!form.documentId || !form.title || !form.languageId) return;
    await onSave(form, editingId);
    onCancel();
  };

  if (!isCreating && !editingId) return null;

  return (
    <div className="bg-gray-50 p-4 rounded shadow">
      <div className="flex gap-2 mb-2">
        <input
          id="documentId"
          name="documentId"
          className="form-input"
          placeholder="documentId"
          value={form.documentId || ""}
          onChange={(e) => setForm((f) => ({ ...f, documentId: e.target.value }))}
        />
        <input
          id="title"
          name="title"
          className="form-input"
          placeholder="Titre"
          value={form.title || ""}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
        />
        <select
          id="languageId"
          name="languageId"
          className="form-select"
          value={form.languageId || ""}
          onChange={(e) => setForm((f) => ({ ...f, languageId: e.target.value }))}
        >
          <option value="">Language</option>
          {languages.map((l) => (
            <option key={l.id} value={l.id}>
              {l.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-2">
        <button className="btn-primary" onClick={handleSubmit}>
          <Save size={16} className="mr-1" /> Enregistrer
        </button>
        <button className="btn-secondary" onClick={onCancel}>
          <X size={16} className="mr-1" /> Annuler
        </button>
      </div>
    </div>
  );
};

export default VersionForm;