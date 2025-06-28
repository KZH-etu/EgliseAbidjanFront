import { useEffect, useState } from "react";
import { MediaType, NewDocumentMedia } from "../../../types/api";
import { Save, X } from "lucide-react";

interface MediaFormProps {
  isCreating: boolean;
  editingId: string | null;
  initialData: Partial<NewDocumentMedia>;
  onSave: (data: Partial<NewDocumentMedia>, id: string | null) => Promise<void>;
  onCancel: () => void;
}

const mediaTypeOptions: MediaType[] = [MediaType.AUDIO, MediaType.TEXT, MediaType.VIDEO];

const MediaForm: React.FC<MediaFormProps> = ({
  isCreating,
  editingId,
  initialData,
  onSave,
  onCancel,
}) => {
  const [form, setForm] = useState<Partial<NewDocumentMedia>>(initialData);

  useEffect(() => setForm(initialData), [initialData]);

  const handleSubmit = async () => {
    if (!form.documentVersionId || !form.url || !form.mediaType) return;
    await onSave(form, editingId);
    onCancel();
  };

  if (!isCreating && !editingId) return null;

  return (
    <div className="bg-gray-50 p-4 rounded shadow">
      <div className="flex gap-2 mb-2">
        <input
          id="documentVersionId"
          name="documentVersionId"
          className="form-input"
          placeholder="documentVersionId"
          value={form.documentVersionId || ""}
          onChange={(e) => setForm((f) => ({ ...f, documentVersionId: e.target.value }))}
        />
        <input
          id="url"
          name="url"
          className="form-input"
          placeholder="URL"
          value={form.url || ""}
          onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
        />
        <select
          id="mediaType"
          name="mediaType"
          className="form-select"
          value={form.mediaType || ""}
          onChange={(e) => setForm((f) => ({ ...f, mediaType: e.target.value as MediaType }))}
        >
          <option value="">Type</option>
          {mediaTypeOptions.map((t) => (
            <option key={t} value={t}>
              {t}
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

export default MediaForm;