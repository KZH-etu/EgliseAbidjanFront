import { useState } from "react";
import DocumentForm from "../../components/admin/admin-documents/DocumentForm";
import { DocumentsTable } from "../../components/admin/admin-documents/DocumentsTable";
import TopBar from "../../components/admin/admin-documents/TopBar";
import { DocumentUpdate, NewDocument, Document } from "../../types/api";
import { useDocumentVersions } from "../../hooks/useDocumentVersions";
import { useTags } from "../../hooks/useTags";
import { useLanguages } from "../../hooks/useLanguages";
import { useDocuments } from "../../hooks/useDocuments";

const orderFields = ["id", "globalTitle", "createdAt", "updatedAt"] as const;

export type OrderField = typeof orderFields[number];
type OrderDirection = "asc" | "desc";

export default function DocumentsPage() {
  // API hooks
  const { docs, add, patch, remove, fetchMetaByDocument, errorDocs } = useDocuments();
  const { languages } = useLanguages();
  const { searchTags } = useTags();
  const { searchVersions } = useDocumentVersions();

  // UI state
  const [search, setSearch] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState<OrderField>("updatedAt");
  const [orderDir, setOrderDir] = useState<OrderDirection>("desc");
  const [editingDoc, setEditingDoc] = useState<Document | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Filtering & sorting
  const filteredDocs = docs
    .filter((d) => [d.id, d.globalTitle].some((f) => f.toLowerCase().includes(search.toLowerCase())))
    .filter((d) =>
      selectedLanguages.length === 0
        ? true
        : d.availableLanguages.some((l) => selectedLanguages.includes(l.id))
    )
    .sort((a, b) => {
      const aVal = a[orderBy];
      const bVal = b[orderBy];
      if (aVal < bVal) return orderDir === "asc" ? -1 : 1;
      if (aVal > bVal) return orderDir === "asc" ? 1 : -1;
      return 0;
    });

  // Handlers ----------
  const handleToggleOrder = (field: OrderField) => {
    if (orderBy === field) setOrderDir((d) => (d === "asc" ? "desc" : "asc"));
    else setOrderBy(field);
  };

  const handleSave = async (data: Partial<NewDocument>, id: string | null) => {
    if (id) await patch(id, data as DocumentUpdate);
    else await add(data as NewDocument);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Gestion des Documents</h1>

      {errorDocs && <div className="text-red-500">{errorDocs}</div>}

      {/* TopBar */}
      <TopBar
        search={search}
        onSearchChange={setSearch}
        languages={languages}
        selectedLanguages={selectedLanguages}
        onToggleLanguage={(id, checked) =>
          setSelectedLanguages((prev) => (checked ? [...prev, id] : prev.filter((l) => l !== id)))
        }
        orderFields={orderFields}
        orderBy={orderBy}
        orderDir={orderDir}
        onToggleOrder={handleToggleOrder}
        onCreate={() => {
          setEditingDoc(null);
          setIsCreating(true);
        }}
      />

      {/* Form */}
      <DocumentForm
        isCreating={isCreating}
        editingDoc={editingDoc}
        onSave={handleSave}
        onCancel={() => {
          setEditingDoc(null);
          setIsCreating(false);
        }}
        searchTags={searchTags}
        searchVersions={searchVersions}
        fetchMetaByDocument={fetchMetaByDocument}
      />

      {/* Table */}
      <DocumentsTable
        docs={filteredDocs}
        onEdit={(doc) => {
          setEditingDoc(doc);
          setIsCreating(false);
        }}
        onDelete={remove}
      />
    </div>
  );
}
