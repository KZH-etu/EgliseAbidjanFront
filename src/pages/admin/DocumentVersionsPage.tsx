import { useMemo, useState } from 'react';
import { NewDocumentVersion, DocumentVersionUpdate, DocumentVersion } from "../../types/api";
import { useDocumentVersions } from '../../hooks/useDocumentVersions';
import { useLanguages } from '../../hooks/useLanguages';
import VersionsTopBar from '../../components/admin/admin-document-versions/VersionsTopBar';
import VersionForm from '../../components/admin/admin-document-versions/VersionForm';
import VersionsTable from '../../components/admin/admin-document-versions/VersionsTable';

const orderFields = ["id", "documentId", "title", "createdAt", "updatedAt"] as const;

export type OrderField = typeof orderFields[number];
type OrderDirection = "asc" | "desc";

export default function DocumentVersionsPage() {
  // hooks
  const { items, add, patch, remove, error } = useDocumentVersions();
  const { languages } = useLanguages();

  // UI state
  const [search, setSearch] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState<OrderField>("updatedAt");
  const [orderDir, setOrderDir] = useState<OrderDirection>("desc");
  const [editingVersion, setEditingVersion] = useState<DocumentVersion | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // language names memo for filtering
  const selectedLanguageNames = useMemo(
    () => selectedLanguages.map((id) => languages.find((l) => l.id === id)?.name || ""),
    [languages, selectedLanguages]
  );

  // filtering & sorting
  const filtered = items
    .filter((i) => [i.id, i.documentId, i.title].some((f) => f.toLowerCase().includes(search.toLowerCase())))
    .filter((i) => (selectedLanguages.length ? selectedLanguageNames.includes(i.languageId) : true))
    .sort((a, b) => {
      const av = a[orderBy];
      const bv = b[orderBy];
      if (av < bv) return orderDir === "asc" ? -1 : 1;
      if (av > bv) return orderDir === "asc" ? 1 : -1;
      return 0;
    });

  // handlers
  const handleToggleOrder = (field: OrderField) => {
    if (orderBy === field) setOrderDir((d) => (d === "asc" ? "desc" : "asc"));
    else setOrderBy(field);
  };

  const handleSave = async (data: Partial<NewDocumentVersion>, id: string | null) => {
    if (id) await patch(id, data as DocumentVersionUpdate);
    else await add(data as NewDocumentVersion);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Gestion des Versions de Documents</h1>
      {error && <div className="text-red-500">{error}</div>}

      {/* TopBar */}
      <VersionsTopBar
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
          setEditingVersion(null);
          setIsCreating(true);
        }}
      />

      {/* Form */}
      <VersionForm
        isCreating={isCreating}
        editingId={editingVersion ? editingVersion.id : null}
        initialData={
          editingVersion
            ? {
                documentId: editingVersion.documentId,
                title: editingVersion.title,
                languageId: languages.find((l) => l.name === editingVersion.languageId)?.id || "",
              }
            : {}
        }
        languages={languages}
        onSave={handleSave}
        onCancel={() => {
          setEditingVersion(null);
          setIsCreating(false);
        }}
      />

      {/* Table */}
      <VersionsTable
        items={filtered}
        onEdit={(item) => {
          setEditingVersion(item);
          setIsCreating(false);
        }}
        onDelete={remove}
      />
    </div>
  );
}
