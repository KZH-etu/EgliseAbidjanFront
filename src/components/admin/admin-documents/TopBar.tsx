import { Plus } from "lucide-react";
import React from "react";
import { Language } from "../../../types/api";
import { OrderField } from "../../../pages/admin/DocumentsPage";

export interface TopBarProps {
  /** Search text */
  search: string;
  onSearchChange: (value: string) => void;
  /** Language filters */
  languages: Language[];
  selectedLanguages: string[];
  onToggleLanguage: (languageId: string, checked: boolean) => void;
  /** Ordering */
  orderFields: readonly OrderField[];
  orderBy: OrderField;
  orderDir: "asc" | "desc";
  onToggleOrder: (field: OrderField) => void;
  /** New document */
  onCreate: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
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
      placeholder="Search by id or globalTitle"
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
    />

    {/* Languages */}
    <div className="flex gap-2">
      {languages.map((lang) => (
        <label key={lang.id} className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={selectedLanguages.includes(lang.id)}
            onChange={(e) => onToggleLanguage(lang.id, e.target.checked)}
          />
          {lang.name}
        </label>
      ))}
    </div>

    {/* Ordering */}
    <div className="flex gap-2">
      {orderFields.map((field) => (
        <button
          key={field}
          className="btn-secondary"
          onClick={() => onToggleOrder(field)}
        >
          {field} {orderBy === field ? (orderDir === "asc" ? "↑" : "↓") : ""}
        </button>
      ))}
    </div>

    {/* New */}
    <button className="btn-primary" onClick={onCreate}>
      <Plus size={18} className="mr-1" /> Nouveau
    </button>
  </div>
);

export default TopBar;