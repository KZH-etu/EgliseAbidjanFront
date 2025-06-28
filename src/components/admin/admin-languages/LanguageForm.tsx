import { Save, X } from "lucide-react";
import { LanguageType } from "../../../types/api";

interface LanguageFormProps {
  form: {
    name?: string;
    type?: LanguageType;
    countryOfOrigin?: string;
  };
  setForm: React.Dispatch<React.SetStateAction<any>>;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function LanguageForm({ form, setForm, onSubmit, onCancel }: LanguageFormProps) {
  return (
    <div className="bg-gray-50 p-4 rounded shadow max-w-md">
      <div className="mb-2 font-semibold">Détails de la langue</div>
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex items-center gap-2">
          <label htmlFor="languageName" className="w-32">Nom:</label>
          <input
            id="languageName"
            name="languageName"
            className="form-input flex-1"
            placeholder="Nom de la langue"
            value={form.name || ""}
            onChange={(e) => setForm((f: any) => ({ ...f, name: e.target.value }))}
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="languageType" className="w-32">Type:</label>
          <select
            id="languageType"
            name="languageType"
            className="form-select flex-1"
            value={form.type || ""}
            onChange={(e) => setForm((f: any) => ({ ...f, type: e.target.value as LanguageType }))}
          >
            <option value="">Sélectionner le type</option>
            {Object.values(LanguageType).map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        {form.type === LanguageType.INTERNATIONAL && (
          <div className="flex items-center gap-2">
            <label htmlFor="languageCountry" className="w-32">Pays d'origine:</label>
            <input
              id="languageCountry"
              name="languageCountry"
              className="form-input flex-1"
              placeholder="Pays d'origine"
              value={form.countryOfOrigin || ""}
              onChange={(e) => setForm((f: any) => ({ ...f, countryOfOrigin: e.target.value }))}
            />
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <button className="btn-primary" onClick={onSubmit}>
          <Save size={16} className="mr-1" /> Enregistrer
        </button>
        <button className="btn-secondary" onClick={onCancel}>
          <X size={16} className="mr-1" /> Annuler
        </button>
      </div>
    </div>
  );
}