import { useState } from 'react';
import { DocumentMedia, MediaType } from "../../types/api";
import { NewDocumentMedia, DocumentMediaUpdate } from "../../types/api";
import { useDocumentMedia } from '../../hooks/useDocumentMedia';
import MediaTable from '../../components/admin/admin-document-media/MediaTable';
import MediaForm from '../../components/admin/admin-document-media/MediaForm';
import MediaTopBar from '../../components/admin/admin-document-media/MediaTopBar';

const mediaTypeOptions: MediaType[] = [MediaType.AUDIO, MediaType.TEXT, MediaType.VIDEO];
const orderFields = ["id", "documentVersionId", "createdAt", "updatedAt"] as const;

export type OrderField = typeof orderFields[number];

type OrderDirection = "asc" | "desc";

export default function DocumentMediaPage() {
  const { items, add, patch, remove, error } = useDocumentMedia();

  // UI state
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<MediaType[]>([]);
  const [orderBy, setOrderBy] = useState<OrderField>("updatedAt");
  const [orderDir, setOrderDir] = useState<OrderDirection>("desc");
  const [editingMedia, setEditingMedia] = useState<DocumentMedia | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // filtering & sorting
  const filtered = items
    .filter((i) => [i.id, i.documentVersionId, i.url].some((f) => f.toLowerCase().includes(search.toLowerCase())))
    .filter((i) => (selectedTypes.length ? selectedTypes.includes(i.mediaType) : true))
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

  const handleSave = async (data: Partial<NewDocumentMedia>, id: string | null) => {
    if (id) await patch(id, data as DocumentMediaUpdate);
    else await add(data as NewDocumentMedia);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Gestion des DocumentMedia</h1>
      {error && <div className="text-red-500">{error}</div>}

      {/* TopBar */}
      <MediaTopBar
        search={search}
        onSearchChange={setSearch}
        mediaTypes={mediaTypeOptions}
        selectedTypes={selectedTypes}
        onToggleType={(t, c) =>
          setSelectedTypes((prev) => (c ? [...prev, t] : prev.filter((m) => m !== t)))
        }
        orderFields={orderFields}
        orderBy={orderBy}
        orderDir={orderDir}
        onToggleOrder={handleToggleOrder}
        onCreate={() => {
          setEditingMedia(null);
          setIsCreating(true);
        }}
      />

      {/* Form */}
      <MediaForm
        isCreating={isCreating}
        editingId={editingMedia ? editingMedia.id : null}
        initialData={
          editingMedia
            ? {
                documentVersionId: editingMedia.documentVersionId,
                url: editingMedia.url,
                mediaType: editingMedia.mediaType,
              }
            : {}
        }
        onSave={handleSave}
        onCancel={() => {
          setEditingMedia(null);
          setIsCreating(false);
        }}
      />

      {/* Table */}
      <MediaTable
        items={filtered}
        onEdit={(m) => {
          setEditingMedia(m);
          setIsCreating(false);
        }}
        onDelete={remove}
      />
    </div>
  );
}
