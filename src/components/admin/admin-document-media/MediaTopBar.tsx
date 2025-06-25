import { Plus } from "lucide-react";
import { MediaType } from "../../../types/api";
import { OrderField } from "../../../pages/admin/DocumentMediaPage";

interface MediaTopBarProps {
  search: string;
  onSearchChange: (v: string) => void;
  mediaTypes: MediaType[];
  selectedTypes: MediaType[];
  onToggleType: (type: MediaType, checked: boolean) => void;
  orderFields: readonly OrderField[];
  orderBy: string;
  orderDir: "asc" | "desc";
  onToggleOrder: (field: OrderField) => void;
  onCreate: () => void;
}

const MediaTopBar: React.FC<MediaTopBarProps> = ({
  search,
  onSearchChange,
  mediaTypes,
  selectedTypes,
  onToggleType,
  orderFields,
  orderBy,
  orderDir,
  onToggleOrder,
  onCreate,
}) => (
  <div className="flex flex-col md:flex-row items-center gap-4">
    <input
      id="search"
      className="form-input"
      placeholder="Search by id, docId, url"
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
    />

    <div className="flex gap-2">
      {mediaTypes.map((t) => (
        <label key={t} className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={selectedTypes.includes(t)}
            onChange={(e) => onToggleType(t, e.target.checked)}
          />
          {t}
        </label>
      ))}
    </div>

    <div className="flex gap-2">
      {orderFields.map((f) => (
        <button key={f} className="btn-secondary" onClick={() => onToggleOrder(f)}>
          {f} {orderBy === f ? (orderDir === "asc" ? "↑" : "↓") : ""}
        </button>
      ))}
    </div>

    <button className="btn-primary" onClick={onCreate}>
      <Plus size={18} className="mr-1" /> Nouveau
    </button>
  </div>
);

export default MediaTopBar;