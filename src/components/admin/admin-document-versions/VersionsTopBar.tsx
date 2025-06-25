import { Plus } from "lucide-react";
import { Language } from "../../../types/api";
import { OrderField } from "../../../pages/admin/DocumentVersionsPage";

export interface VersionsTopBarProps {
  /** Search text */
  search: string;
  onSearchChange: (v: string) => void;
  /** Language filtering */
  languages: Language[];
  selectedLanguages: string[];
  onToggleLanguage: (id: string, checked: boolean) => void;
  /** Ordering */
  orderFields: readonly OrderField[];
  orderBy: string;
  orderDir: "asc" | "desc";
  onToggleOrder: (field: OrderField) => void;
  onCreate: () => void;
}

const VersionsTopBar: React.FC<VersionsTopBarProps> = ({
  search,
  onSearchChange,
  languages,
  selectedLanguages,
  onToggleLanguage,
  orderFields,
  orderBy,
  orderDir,
  onToggleOrder,
  onCreate,
}) => (
  <div className="flex flex-col md:flex-row items-center gap-4">
    {/* Search */}
    <input
      id="search"
      className="form-input"
      placeholder="Search by id, docId, title"
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
    />

    {/* Languages */}
    <div className="flex gap-2">
      {languages.map((l) => (
        <label key={l.id} className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={selectedLanguages.includes(l.id)}
            onChange={(e) => onToggleLanguage(l.id, e.target.checked)}
          />
          {l.name}
        </label>
      ))}
    </div>

    {/* Ordering */}
    <div className="flex gap-2">
      {orderFields.map((f) => (
        <button key={f} className="btn-secondary" onClick={() => onToggleOrder(f)}>
          {f} {orderBy === f ? (orderDir === "asc" ? "↑" : "↓") : ""}
        </button>
      ))}
    </div>

    {/* New */}
    <button className="btn-primary" onClick={onCreate}>
      <Plus size={18} className="mr-1" /> Nouveau
    </button>
  </div>
);

export default VersionsTopBar;