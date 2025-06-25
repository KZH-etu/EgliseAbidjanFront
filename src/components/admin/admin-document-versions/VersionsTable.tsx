
import { Edit2, Trash2 } from "lucide-react";
import { DocumentVersion } from "../../../types/api";

interface VersionsTableProps {
  items: DocumentVersion[];
  onEdit: (item: DocumentVersion) => void;
  onDelete: (id: string) => void;
}

const VersionsTable: React.FC<VersionsTableProps> = ({ items, onEdit, onDelete }) => (
  <table className="table-auto w-full text-sm">
    <thead>
      <tr className="text-left">
        <th>ID</th>
        <th>DocumentId</th>
        <th>Title</th>
        <th>Language</th>
        <th>CreatedAt</th>
        <th>UpdatedAt</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {items.map((item) => (
        <tr key={item.id} className="border-t">
          <td>{item.id}</td>
          <td>{item.documentId}</td>
          <td>{item.title}</td>
          <td>{item.languageId}</td>
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

export default VersionsTable;