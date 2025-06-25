import { Edit2, Trash2 } from "lucide-react";
import { Document } from "../../../types/api";

interface DocumentsTableProps {
  docs: Document[];
  onEdit: (doc: Document) => void;
  onDelete: (id: string) => void;
}

export const DocumentsTable: React.FC<DocumentsTableProps> = ({ docs, onEdit, onDelete }) => (
  <table className="table-auto w-full text-sm">
    <thead>
      <tr className="text-left">
        <th>ID</th>
        <th>Global Title</th>
        <th>Categories</th>
        <th>Available Languages</th>
        <th>Tags</th>
        <th>CreatedAt</th>
        <th>UpdatedAt</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {docs.map((item) => (
        <tr key={item.id} className="border-t">
          <td>{item.id}</td>
          <td>{item.globalTitle}</td>
          <td>
            {Array.isArray(item.categories) ? item.categories.join(", ") : item.categories}
          </td>
          <td>{item.availableLanguages.map((l) => l.name).join(", ")}</td>
          <td>
            {item.tags && item.tags.length > 0 ? (
              item.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-1"
                >
                  {tag.id}
                </span>
              ))
            ) : (
              <span className="text-gray-500">No tags</span>
            )}
          </td>
          <td>{new Date(item.createdAt).toLocaleString()}</td>
          <td>{new Date(item.updatedAt).toLocaleString()}</td>
          <td className="flex gap-2">
            <button className="text-blue-600 hover:text-blue-800" onClick={() => onEdit(item)}>
              <Edit2 size={16} />
            </button>
            <button className="text-red-500 hover:text-red-700" onClick={() => onDelete(item.id)}>
              <Trash2 size={16} />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);