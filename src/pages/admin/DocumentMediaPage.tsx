import { useEffect, useState } from 'react';
import { Edit2, Trash2, Plus, Save, X } from 'lucide-react';
import { MediaType } from '../../types/document-media';
import { CreateDocumentMediaDto, UpdateDocumentMediaDto } from "../../types/document-media";
import { useDocumentMedia } from '../../hooks/useDocumentMedia';

const mediaTypeOptions: MediaType[] = [MediaType.AUDIO, MediaType.TEXT, MediaType.VIDEO]
const orderFields = ['id', 'documentVersionId', 'createdAt', 'updatedAt'] as const;

type OrderField = typeof orderFields[number];

type OrderDirection = 'asc' | 'desc';

export default function DocumentMediaPage() {
  const {
    items,
    loadMedia,
    // loading,
    add,
    patch,
    remove,
    error,
  } = useDocumentMedia();

  const [search, setSearch] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<MediaType[]>([]);
  const [orderBy, setOrderBy] = useState<OrderField>('updatedAt');
  const [orderDir, setOrderDir] = useState<OrderDirection>('desc');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<CreateDocumentMediaDto>>({});
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadMedia();
  }, [loadMedia]);

  const handleSearchFilterSort = () => {
    return items
      .filter(item =>
        [item.id, item.documentVersionId, item.url].some(field =>
          field.toLowerCase().includes(search.toLowerCase())
        )
      )
      .filter(item =>
        selectedTypes.length ? selectedTypes.includes(item.mediaType) : true
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
    if (!form.documentVersionId || !form.mediaType || !form.url) return;
    if (editingId) {
      await patch(editingId, form as UpdateDocumentMediaDto);
      setEditingId(null);
    } else if (isCreating) {
    await add(form as CreateDocumentMediaDto);
    setIsCreating(false);
  }
    setForm({});
  };

  const filtered = handleSearchFilterSort();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Gestion des DocumentMedia</h1>

      {error && <div className="text-red-500">{error}</div>}

      {/* Top Bar */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="form-input w-full md:max-w-2xl"
          placeholder="Recherche par id, docId, url"
        />

        <div className="flex flex-wrap gap-2 items-center">
          {mediaTypeOptions.map(type => (
            <label key={type} className="flex items-center gap-1 text-sm">
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={e =>
                  setSelectedTypes(current =>
                    e.target.checked ? [...current, type] : current.filter(t => t !== type)
                  )
                }
              />
              {type}
            </label>
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
              placeholder="documentVersionId"
              value={form.documentVersionId || ''}
              onChange={e => setForm(f => ({ ...f, documentVersionId: e.target.value }))}
              id="documentVersionId"
            />
            <input
              className="form-input"
              placeholder="URL"
              value={form.url || ''}
              onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
              id="url" 
            />
            <select
              className="form-select"
              value={form.mediaType || ''}
              onChange={e => setForm(f => ({ ...f, mediaType: e.target.value as MediaType }))}
              id="mediaType"
            >
              <option value="">Type</option>
              {mediaTypeOptions.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <button className="btn-primary" onClick={handleSubmit}><Save size={16} className="mr-1" /> Enregistrer</button>
            <button className="btn-secondary" onClick={() => { setEditingId(null); setForm({}); setIsCreating(false); }}><X size={16} className="mr-1" /> Annuler</button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto mt-5">
        <table className="w-full">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200">
              <th className="px-6 py-3 text-center">
                <button onClick={() => toggleOrder("id")} className="hover:underline">
                  ID {orderBy === "id" ? (orderDir === "asc" ? "↑" : "↓") : ""}
                </button>
              </th>
              <th className="px-6 py-3 text-center">
                <button onClick={() => toggleOrder("documentVersionId")} className="hover:underline">
                  DocumentVersionId {orderBy === "documentVersionId" ? (orderDir === "asc" ? "↑" : "↓") : ""}
                </button>
              </th>
              <th className="px-6 py-3 text-center">MediaType</th>
              <th className="px-6 py-3 text-center">URL</th>
              <th className="px-6 py-3 text-center">
                <button onClick={() => toggleOrder("createdAt")} className="hover:underline">
                  Créé {orderBy === "createdAt" ? (orderDir === "asc" ? "↑" : "↓") : ""}
                </button>
              </th>
              <th className="px-6 py-3 text-center">
                <button onClick={() => toggleOrder("updatedAt")} className="hover:underline">
                  Modifié {orderBy === "updatedAt" ? (orderDir === "asc" ? "↑" : "↓") : ""}
                </button>
              </th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(item => (
              <tr key={item.id} className="border-b border-neutral-200 hover:bg-neutral-50">
                <td className="px-6 py-4 text-center">{item.id}</td>
                <td className="px-6 py-4 text-center">{item.documentVersionId}</td>
                <td className="px-6 py-4 text-center">{item.mediaType}</td>
                <td className="truncate max-w-xs">{item.url}</td>
                <td className="px-6 py-4 text-center">{new Date(item.createdAt).toLocaleString()}</td>
                <td className="px-6 py-4 text-center">{new Date(item.updatedAt).toLocaleString()}</td>
                <td className="flex gap-2 px-6 py-4 text-center">
                  <button onClick={() => {
                    setEditingId(item.id);
                    setForm({
                      documentVersionId: item.documentVersionId,
                      mediaType: item.mediaType,
                      url: item.url,
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
      
    </div>
  );
}
