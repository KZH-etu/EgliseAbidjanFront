import { useEffect, useState } from 'react';
import { Edit2, Trash2, Plus, Save, X } from 'lucide-react';
import { CreateDocumentDto, UpdateDocumentDto } from '../../types/documents/create-document.dto';
import { useLanguages } from '../../hooks/useLanguages';
import { useDocuments } from '../../hooks/useDocuments';
import { DocumentCategory, DocumentMetaResponseDto, EventType } from '../../types/documents/documents';
import { TagSummaryDto } from '../../types/tags/tags';
import { useTags } from '../../hooks/useTags';
import { DocumentVersionResponseDto } from '../../types/document-versions/document-versions';
import { useDocumentVersions } from '../../hooks/useDocumentVersions';


const orderFields = ['id', 'globalTitle', 'createdAt', 'updatedAt'] as const;

type OrderField = typeof orderFields[number];

type OrderDirection = 'asc' | 'desc';

export default function DocumentsPage() {
  const {
    docs,
    loadDocs,
    fetchMetaByDocument,
    add,
    patch,
    remove,
    errorDocs,
  } = useDocuments();

  const {
    languageSummaries,
    loadLanguageSummaries,
  } = useLanguages();

  const {
    searchTags,
  } = useTags();

  const { searchVersions } = useDocumentVersions();

  const [search, setSearch] = useState('');
  const [orderBy, setOrderBy] = useState<OrderField>('updatedAt');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]); // this state uses language IDs
  const [orderDir, setOrderDir] = useState<OrderDirection>('desc');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<CreateDocumentDto>>({});
  const [isCreating, setIsCreating] = useState(false);
  // states for tag auto-complete
  const [tagInput, setTagInput] = useState('');
  const [tagSuggestions, setTagSuggestions] = useState<TagSummaryDto[]>([]);
  // states for docVersion auto-complete
  const [versionInput, setVersionInput] = useState('');
  const [versionSuggestions, setVersionSuggestions] = useState<DocumentVersionResponseDto[]>([]);
  // state for current document metadata
  const [currentDocMeta, setCurrentDocMeta] = useState<DocumentMetaResponseDto| null>(null);


  useEffect(() => {
    loadLanguageSummaries();
    loadDocs();
  }, [loadDocs, loadLanguageSummaries]);

  useEffect(() => {
      if (tagInput.trim() === '') {
      setTagSuggestions([]);
      return;
    }
    let active = true;
    searchTags(tagInput).then(results => {
      if (active) setTagSuggestions(results);
    });
    return () => { active = false; };
  }, [tagInput, searchTags]);

  useEffect(() => {
    if (versionInput.trim() === '') {
      setVersionSuggestions([]);
      return;
    }
    let active = true;
    searchVersions(versionInput).then(results => {
      if (active) setVersionSuggestions(results);
    });
    return () => { active = false; };
  }, [versionInput, searchVersions]);

  // We will handle the filtering and sorting logic on the server side later
  // Same for document versions and document media
  const handleSearchFilterSort = () => {
    return docs
      .filter(doc =>
        [doc.id, doc.globalTitle].some(field =>
          field.toLowerCase().includes(search.toLowerCase())
        )
      )
      .filter(doc =>
        //here, we have to convert the languageId to the language name to match the selected languages
        selectedLanguages.length ? doc.availableLanguages.some(lang => 
          selectedLanguages.includes(lang.id)
        ) : true
      )
      .sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];
        if (aValue < bValue) return orderDir === 'asc' ? -1 : 1;
        if (aValue > bValue) return orderDir === 'asc' ? 1 : -1;
        return 0;
      });
  };

  const toggleOrder = (field: OrderField) => {
    if (orderBy === field) setOrderDir(dir => (dir === 'asc' ? 'desc' : 'asc'));
    else setOrderBy(field);
  };

  const handleSubmit = async () => {
    // guards for valid metadata submission
    const validMetadata = !form.categories || form.categories.length === 0
      ? true
      : form.categories.every(category => {
          if (category === 'BOOK') {
            // For book, author and publishedAt are required
            return (
              form.bookMeta &&
              !!form.bookMeta.author &&
              !!form.bookMeta.publishedAt
            );
          }
          if (category === 'SERMON') {
            // For sermon, preacher and preachedAt are required
            return (
              form.sermonMeta &&
              !!form.sermonMeta.preacher &&
              !!form.sermonMeta.preachedAt
            );
          }
          if (category === 'EVENT') {
            // For event, type and startTime are required
            return (
              form.eventMeta &&
              !!form.eventMeta.type &&
              !!form.eventMeta.startTime
            );
          }
          return true;
        });

    if (!form.globalTitle || !validMetadata) return;
    if (editingId) {
      await patch(editingId, form as UpdateDocumentDto);
      setEditingId(null);
    } else if (isCreating) {
    await add(form as CreateDocumentDto);
    setIsCreating(false);
  }
    setForm({});
  };

  const filtered = handleSearchFilterSort();

  useEffect(() => {
    if (editingId) {
      fetchMetaByDocument(editingId).then(meta => setCurrentDocMeta(meta));
    } else {
      setCurrentDocMeta(null);
    }
  }, [editingId, fetchMetaByDocument]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Gestion des Documents</h1>

      {errorDocs && <div className="text-red-500">{errorDocs}</div>}

      {/* Top Bar */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="form-input"
          placeholder="Search by id or globalTitle"
          id='search'
        />

        <div className="flex gap-2">
          {languageSummaries.map(lang => (
            <label key={lang.id} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={selectedLanguages.includes(lang.id)}
                onChange={e => {
                  setSelectedLanguages(current =>
                    e.target.checked ? [...current, lang.id] : current.filter(t => t !== lang.id)
                  );
                }}
              />
              {lang.name}
            </label>
          ))}
        </div>

        <div className="flex gap-2">
          {orderFields.map(f => (
            <button
              key={f}
              onClick={() => toggleOrder(f)}
              className="btn-secondary"
            >
              {f} {orderBy === f ? (orderDir === 'asc' ? '↑' : '↓') : ''}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            setEditingId(null);
            setForm({});
            setIsCreating(true); 
          }}
          className="btn-primary"
        >
          <Plus size={18} className="mr-1" /> Nouveau
        </button>
      </div>

      {/* Form */}
      {(editingId !== null || isCreating) && (
        <div className="bg-gray-50 p-4 rounded shadow">
          <div className="flex gap-2 mb-2">
            <input
              className="form-input"
              placeholder="globalTitle"
              value={form.globalTitle || ''}
              onChange={e => setForm(f => ({ ...f, globalTitle: e.target.value }))}
              id="globalTitle"
            />
            {/* Categories */}
            <div className="flex gap-4 mb-2">
              {Object.values(DocumentCategory).map(category => (
                <label key={category} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={form.categories?.includes(category) || false}
                    onChange={e => {
                      setForm(f => {
                        const prev = f.categories || [];
                        if (e.target.checked) {
                          return { ...f, categories: [...prev, category] };
                        } else {
                          return { ...f, categories: prev.filter(c => c !== category) };
                        }
                      });
                    }}
                    name="categories"
                    value={category}
                  />
                  {category}
                </label>
              ))}
            </div>
            {/*Tags */}
            <div className="w-full mb-2">
              <label className="block font-semibold mb-1">Tags</label>
              <input
                className="form-input w-full"
                placeholder="Start typing tag name or id..."
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                id="tagInput"
                autoComplete="off"
              />
              {/* Suggestions dropdown */}
              {tagInput && tagSuggestions.length > 0 && (
                <div className="bg-white border rounded shadow mt-1 max-h-40 overflow-auto z-10 absolute">
                  {tagSuggestions.map(tag => (
                    <div
                      key={tag.id}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                      onClick={() => {
                        setForm(f => ({
                          ...f,
                          tagIds: f.tagIds
                            ? f.tagIds.includes(tag.id)
                              ? f.tagIds
                              : [...f.tagIds, tag.id]
                            : [tag.id]
                        }));
                        setTagInput('');
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
                {(form.tagIds || []).map(tagId => {
                  const tag = tagSuggestions.find(t => t.id === tagId) || { id: tagId, title: "undefined" };
                  return (
                    <span
                      key={tagId}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center gap-1"
                    >
                      {tag.title}
                      <button
                        type="button"
                        className="ml-1 text-blue-600 hover:text-red-600"
                        onClick={() =>
                          setForm(f => ({
                            ...f,
                            tagIds: (f.tagIds || []).filter(id => id !== tagId)
                          }))
                        }
                      >
                        <X size={12} />
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>

              {/* Metadata fields */}
              {form.categories?.includes(DocumentCategory.BOOK) && (
                <div className="mb-2 p-2 border rounded bg-gray-100">
                  <div className="font-semibold mb-1">Book Metadata</div>
                  <input
                    className="form-input mb-1"
                    placeholder="Author"
                    value={form.bookMeta?.author || ''}
                    onChange={e =>
                      setForm(f => ({
                        ...f,
                        bookMeta: { ...f.bookMeta, author: e.target.value }
                      }))
                    }
                  />
                  <input
                    className="form-input mb-1"
                    type="date"
                    placeholder="Published At"
                    value={form.bookMeta?.publishedAt ? new Date(form.bookMeta.publishedAt).toISOString().slice(0, 10) : ''}
                    onChange={e =>
                      setForm(f => ({
                        ...f,
                        bookMeta: { ...f.bookMeta, publishedAt: e.target.value ? new Date(e.target.value) : undefined }
                      }))
                    }
                  />
                  <input
                    className="form-input mb-1"
                    placeholder="Publisher"
                    value={form.bookMeta?.publisher || ''}
                    onChange={e =>
                      setForm(f => ({
                        ...f,
                        bookMeta: { ...f.bookMeta, publisher: e.target.value }
                      }))
                    }
                  />
                  <input
                    className="form-input mb-1"
                    placeholder="ISBN"
                    value={form.bookMeta?.isbn || ''}
                    onChange={e =>
                      setForm(f => ({
                        ...f,
                        bookMeta: { ...f.bookMeta, isbn: e.target.value }
                      }))
                    }
                  />
                  <input
                    className="form-input"
                    type="number"
                    placeholder="Page Count"
                    value={form.bookMeta?.pageCount || ''}
                    onChange={e =>
                      setForm(f => ({
                        ...f,
                        bookMeta: { ...f.bookMeta, pageCount: e.target.value ? Number(e.target.value) : undefined }
                      }))
                    }
                  />
                </div>
              )}

              {form.categories?.includes(DocumentCategory.SERMON) && (
                <div className="mb-2 p-2 border rounded bg-gray-100">
                  <div className="font-semibold mb-1">Sermon Metadata</div>
                  <input
                    className="form-input mb-1"
                    placeholder="Preacher"
                    value={form.sermonMeta?.preacher || ''}
                    onChange={e =>
                      setForm(f => ({
                        ...f,
                        sermonMeta: { ...f.sermonMeta, preacher: e.target.value }
                      }))
                    }
                  />
                  <input
                    className="form-input mb-1"
                    type="date"
                    placeholder="Preached At"
                    value={form.sermonMeta?.preachedAt ? new Date(form.sermonMeta.preachedAt).toISOString().slice(0, 10) : ''}
                    onChange={e =>
                      setForm(f => ({
                        ...f,
                        sermonMeta: { ...f.sermonMeta, preachedAt: e.target.value ? new Date(e.target.value) : undefined }
                      }))
                    }
                  />
                  <input
                    className="form-input mb-1"
                    placeholder="Topic"
                    value={form.sermonMeta?.topic || ''}
                    onChange={e =>
                      setForm(f => ({
                        ...f,
                        sermonMeta: { ...f.sermonMeta, topic: e.target.value }
                      }))
                    }
                  />
                  <input
                    className="form-input"
                    placeholder="Location"
                    value={form.sermonMeta?.location || ''}
                    onChange={e =>
                      setForm(f => ({
                        ...f,
                        sermonMeta: { ...f.sermonMeta, location: e.target.value }
                      }))
                    }
                  />
                </div>
              )}

              {form.categories?.includes(DocumentCategory.EVENT) && (
                <div className="mb-2 p-2 border rounded bg-gray-100">
                  <div className="font-semibold mb-1">Event Metadata</div>
                  <select
                    className="form-select mb-1"
                    value={form.eventMeta?.type || ''}
                    onChange={e =>
                      setForm(f => ({
                        ...f,
                        eventMeta: { ...f.eventMeta, type: e.target.value as EventType }
                      }))
                    }
                  >
                    <option value="">Select Event Type</option>
                    {Object.values(EventType).map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <input
                    className="form-input mb-1"
                    type="date"
                    placeholder="Start Time"
                    value={form.eventMeta?.startTime ? new Date(form.eventMeta.startTime).toISOString().slice(0, 10) : ''}
                    onChange={e =>
                      setForm(f => ({
                        ...f,
                        eventMeta: { ...f.eventMeta, startTime: e.target.value ? new Date(e.target.value) : undefined }
                      }))
                    }
                  />
                  <input
                    className="form-input mb-1"
                    type="date"
                    placeholder="End Time"
                    value={form.eventMeta?.endTime ? new Date(form.eventMeta.endTime).toISOString().slice(0, 10) : ''}
                    onChange={e =>
                      setForm(f => ({
                        ...f,
                        eventMeta: { ...f.eventMeta, endTime: e.target.value ? new Date(e.target.value) : undefined }
                      }))
                    }
                  />
                  <input
                    className="form-input mb-1"
                    placeholder="Theme"
                    value={form.eventMeta?.theme || ''}
                    onChange={e =>
                      setForm(f => ({
                        ...f,
                        eventMeta: { ...f.eventMeta, theme: e.target.value }
                      }))
                    }
                  />
                  <input
                    className="form-input"
                    placeholder="Location"
                    value={form.eventMeta?.location || ''}
                    onChange={e =>
                      setForm(f => ({
                        ...f,
                        eventMeta: { ...f.eventMeta, location: e.target.value }
                      }))
                    }
                  />
                </div>
              )}

              {/* Document Versions */}
              <div className="w-full mb-2">
                <label className="block font-semibold mb-1">Document Versions</label>
                <input
                  className="form-input w-full"
                  placeholder="Start typing version id or title..."
                  value={versionInput}
                  onChange={e => setVersionInput(e.target.value)}
                  id="versionInput"
                  autoComplete="off"
                />
                {/* Suggestions dropdown */}
                {versionInput && versionSuggestions.length > 0 && (
                  <div className="bg-white border rounded shadow mt-1 max-h-40 overflow-auto z-10 absolute">
                    {versionSuggestions.map(version => (
                      <div
                        key={version.id}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                        onClick={() => {
                          setForm(f => ({
                            ...f,
                            docVersionIds: f.docVersionIds
                              ? f.docVersionIds.includes(version.id)
                                ? f.docVersionIds
                                : [...f.docVersionIds, version.id]
                              : [version.id]
                          }));
                          setVersionInput('');
                          setVersionSuggestions([]);
                        }}
                      >
                        <span>{version.title}</span>
                        <span className="text-xs text-gray-400 ml-2">{version.id}</span>
                      </div>
                    ))}
                  </div>
                )}
                {/* Selected versions */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {(form.docVersionIds || []).map(versionId => {
                    const version = versionSuggestions.find(v => v.id === versionId) || { id: versionId, title: versionId };
                    return (
                      <span
                        key={versionId}
                        className="bg-green-100 text-green-800 px-2 py-1 rounded flex items-center gap-1"
                      >
                        {version.title}
                        <button
                          type="button"
                          className="ml-1 text-green-600 hover:text-red-600"
                          onClick={() =>
                            setForm(f => ({
                              ...f,
                              docVersionIds: (f.docVersionIds || []).filter(id => id !== versionId)
                            }))
                          }
                        >
                          <X size={12} />
                        </button>
                      </span>
                    );
                  })}
                </div>
              </div>

          </div>
          <div className="flex gap-2">
            <button className="btn-primary" onClick={handleSubmit}><Save size={16} className="mr-1" /> Enregistrer</button>
            <button className="btn-secondary" onClick={() => { setEditingId(null); setForm({});
              setIsCreating(false); }}><X size={16} className="mr-1" /> Annuler</button>
          </div>
        </div>
      )}

      {/* Table */}
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
          {filtered.map(item => (
            <tr key={item.id} className="border-t">
              <td>{item.id}</td>
              <td>{item.globalTitle}</td>
              <td>{Array.isArray(item.categories) ? item.categories.join(', ') : item.categories}</td>
              <td>{item.availableLanguages.map(lang => lang.name).join(', ')}</td>
              <td>
                {item.tags && item.tags.length > 0 ? (
                  item.tags.map(tag => (
                    <span key={tag.id} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-1">
                      {tag.title || "undefined"}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">No tags</span>
                )}
              </td>
              <td>{new Date(item.createdAt).toLocaleString()}</td>
              <td>{new Date(item.updatedAt).toLocaleString()}</td>
              <td className="flex gap-2">
                <button onClick={() => {
                  setEditingId(item.id);
                  setForm({
                    globalTitle: item.globalTitle,
                    categories: item.categories,
                    tagIds: item.tags.map(tag => tag.id),
                    docVersionIds: item.docVersionIds,
                    bookMeta: currentDocMeta?.bookMeta,
                    sermonMeta: currentDocMeta?.sermonMeta,
                    eventMeta: currentDocMeta?.eventMeta,
                  });
                }} className="text-blue-600 hover:text-blue-800">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => remove(item.id)} className="text-red-500 hover:text-red-700">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
