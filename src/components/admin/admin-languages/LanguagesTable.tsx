import { Edit2, Trash2 } from "lucide-react";
import { Language } from "../../../types/api";

interface LanguagesTableProps {
  languages: Language[];
  onEdit: (lang: Language) => void;
  onDelete: (id: string) => void;
}

export default function LanguagesTable({ languages, onEdit, onDelete }: LanguagesTableProps) {
  return (
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
        {languages.map((lang) => (
          <tr key={lang.id} className="border-t">
            <td>{lang.id}</td>
            <td>{lang.name}</td>
            <td>{lang.type}</td>
            <td>{lang.countryOfOrigin || <span className="text-gray-400 italic">-</span>}</td>
            <td className="flex gap-2">
              <button onClick={() => onEdit(lang)} className="text-blue-600 hover:text-blue-800">
                <Edit2 size={16} />
              </button>
              <button onClick={() => onDelete(lang.id)} className="text-red-500 hover:text-red-700">
                <Trash2 size={16} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
