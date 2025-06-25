import React, { useEffect, useState } from "react";
import { Save, X } from "lucide-react";
import { Document, DocumentCategory, DocumentMeta, DocumentVersion, NewDocument, TagSummary } from "../../../types/api";
import BookMetaBlock from "./form/BookMetaBlock";
import SermonMetaBlock from "./form/SermonMetaBlock";
import EventMetaBlock from "./form/EventMetaBlock";


interface DocumentFormProps {
  /** Whether we are creating a new document */
  isCreating: boolean;
  /** The document being edited, or null if creating */
  editingDoc: Document | null;
  /** Persist function (create or update) */
  onSave: (data: Partial<NewDocument>, editingId: string | null) => Promise<void>;
  /** Cancel editing/creating */
  onCancel: () => void;
  /** Search helpers */
  searchTags: (q: string) => Promise<TagSummary[]>;
  searchVersions: (q: string) => Promise<DocumentVersion[]>;
  fetchMetaByDocument: (docId: string) => Promise<DocumentMeta | null>;
}

const DocumentForm: React.FC<DocumentFormProps> = ({
  isCreating,
  editingDoc,
  onSave,
  onCancel,
  searchTags,
  searchVersions,
  fetchMetaByDocument,
}) => {
  const [form, setForm] = useState<Partial<NewDocument>>({});
  const [tagInput, setTagInput] = useState("");
  const [tagSuggestions, setTagSuggestions] = useState<TagSummary[]>([]);

  const [versionInput, setVersionInput] = useState("");
  const [versionSuggestions, setVersionSuggestions] = useState<DocumentVersion[]>([]);

  // Load meta when editing
  useEffect(() => {
    if (editingDoc) {
      setForm({
        globalTitle: editingDoc.globalTitle,
        categories: editingDoc.categories,
        tagIds: editingDoc.tags.map((t) => t.id),
        docVersionIds: editingDoc.docVersionIds,
      });
      fetchMetaByDocument(editingDoc.id).then((meta) =>
        setForm((prev) => ({
          ...prev,
          bookMeta: meta?.bookMeta,
          sermonMeta: meta?.sermonMeta,
          eventMeta: meta?.eventMeta,
        }))
      );
    } else if (isCreating) {
      setForm({});
    }
  }, [editingDoc, isCreating, fetchMetaByDocument]);

  // Tag suggestions
  useEffect(() => {
    if (!tagInput.trim()) return setTagSuggestions([]);
    let active = true;
    searchTags(tagInput).then((res) => active && setTagSuggestions(res));
    return () => {
      active = false;
    };
  }, [tagInput, searchTags]);

  // Version suggestions
  useEffect(() => {
    if (!versionInput.trim()) return setVersionSuggestions([]);
    let active = true;
    searchVersions(versionInput).then((res) => active && setVersionSuggestions(res));
    return () => {
      active = false;
    };
  }, [versionInput, searchVersions]);

  const handleSubmit = async () => {
    if (!form.globalTitle) return;
    await onSave(form, editingDoc ? editingDoc.id : null);
    onCancel();
  };

  if (!isCreating && !editingDoc) return null;

  return (
    <div className="bg-gray-50 p-4 rounded shadow">
      {/* Basic fields */}
      <input
        id="globalTitle"
        className="form-input mb-2"
        placeholder="globalTitle"
        value={form.globalTitle || ""}
        onChange={(e) => setForm((f) => ({ ...f, globalTitle: e.target.value }))}
      />

      {/* Categories */}
      <div className="flex gap-4 mb-2">
        {Object.values(DocumentCategory).map((cat) => (
          <label key={cat} className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={form.categories?.includes(cat) || false}
              onChange={(e) =>
                setForm((f) => {
                  const prev = f.categories || [];
                  return {
                    ...f,
                    categories: e.target.checked
                      ? [...prev, cat]
                      : prev.filter((c) => c !== cat),
                  };
                })
              }
            />
            {cat}
          </label>
        ))}
      </div>

      {/* Tag auto-complete */}
      <div className="relative w-full mb-2">
        <input
          id="tagInput"
          className="form-input w-full"
          placeholder="Start typing tag name or id..."
          autoComplete="off"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
        />
        {tagInput && tagSuggestions.length > 0 && (
          <div className="absolute bg-white border rounded shadow mt-1 max-h-40 overflow-auto z-10 w-full">
            {tagSuggestions.map((tag) => (
              <div
                key={tag.id}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex justify-between"
                onClick={() => {
                  setForm((f) => ({
                    ...f,
                    tagIds: f.tagIds?.includes(tag.id)
                      ? f.tagIds
                      : [...(f.tagIds || []), tag.id],
                  }));
                  setTagInput("");
                  setTagSuggestions([]);
                }}
              >
                <span>{tag.title || "undefined"}</span>
                <span className="text-xs text-gray-400 ml-2">{tag.id}</span>
              </div>
            ))}
          </div>
        )}
        {/* Selected tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {(form.tagIds || []).map((id) => (
            <span
              key={id}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center gap-1"
            >
              {id}
              <button
                className="ml-1 text-blue-600 hover:text-red-600"
                onClick={() =>
                  setForm((f) => ({
                    ...f,
                    tagIds: (f.tagIds || []).filter((t) => t !== id),
                  }))
                }
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* --- Metadata blocks (Book / Sermon / Event) --- */}
      {form.categories?.includes(DocumentCategory.BOOK) && (
        <BookMetaBlock form={form} setForm={setForm} />
      )}
      {form.categories?.includes(DocumentCategory.SERMON) && (
        <SermonMetaBlock form={form} setForm={setForm} />
      )}
      {form.categories?.includes(DocumentCategory.EVENT) && (
        <EventMetaBlock form={form} setForm={setForm} />
      )}

      {/* Version auto-complete */}
      <div className="relative w-full mb-4">
        <label className="block font-semibold mb-1">Document Versions</label>
        <input
          id="versionInput"
          className="form-input w-full"
          placeholder="Start typing version id or title..."
          autoComplete="off"
          value={versionInput}
          onChange={(e) => setVersionInput(e.target.value)}
        />
        {versionInput && versionSuggestions.length > 0 && (
          <div className="absolute bg-white border rounded shadow mt-1 max-h-40 overflow-auto z-10 w-full">
            {versionSuggestions.map((v) => (
              <div
                key={v.id}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex justify-between"
                onClick={() => {
                  setForm((f) => ({
                    ...f,
                    docVersionIds: f.docVersionIds?.includes(v.id)
                      ? f.docVersionIds
                      : [...(f.docVersionIds || []), v.id],
                  }));
                  setVersionInput("");
                  setVersionSuggestions([]);
                }}
              >
                <span>{v.title}</span>
                <span className="text-xs text-gray-400 ml-2">{v.id}</span>
              </div>
            ))}
          </div>
        )}
        {/* Selected versions */}
        <div className="flex flex-wrap gap-2 mt-2">
          {(form.docVersionIds || []).map((id) => (
            <span
              key={id}
              className="bg-green-100 text-green-800 px-2 py-1 rounded flex items-center gap-1"
            >
              {id}
              <button
                className="ml-1 text-green-600 hover:text-red-600"
                onClick={() =>
                  setForm((f) => ({
                    ...f,
                    docVersionIds: (f.docVersionIds || []).filter((v) => v !== id),
                  }))
                }
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button className="btn-primary" onClick={handleSubmit}>
          <Save size={16} className="mr-1" /> Enregistrer
        </button>
        <button className="btn-secondary" onClick={onCancel}>
          <X size={16} className="mr-1" /> Annuler
        </button>
      </div>
    </div>
  );
};

export default DocumentForm;