import { useEffect, useState } from 'react';
import { Edit2, Trash2, Plus, Save, X } from 'lucide-react';
import { MediaType } from '../../types/document-media/document-media';
import { CreateDocumentMediaDto, UpdateDocumentMediaDto } from '../../types/document-media/create-document-media.dto';
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
    } else {
      await add(form as CreateDocumentMediaDto);
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
          className="form-input"
          placeholder="Search by id, docId, url"
        />

        <div className="flex gap-2">
          {mediaTypeOptions.map(type => (
            <label key={type} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={e => {
                  setSelectedTypes(current =>
                    e.target.checked ? [...current, type] : current.filter(t => t !== type)
                  );
                }}
              />
              {type}
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
          }}
          className="btn-primary"
        >
          <Plus size={18} className="mr-1" /> Nouveau
        </button>
      </div>

      {/* Form */}
      {(editingId !== null || Object.keys(form).length > 0) && (
        <div className="bg-gray-50 p-4 rounded shadow">
          <div className="flex gap-2 mb-2">
            <input
              className="form-input"
              placeholder="documentVersionId"
              value={form.documentVersionId || ''}
              onChange={e => setForm(f => ({ ...f, documentVersionId: e.target.value }))}
            />
            <input
              className="form-input"
              placeholder="URL"
              value={form.url || ''}
              onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
            />
            <select
              className="form-select"
              value={form.mediaType || ''}
              onChange={e => setForm(f => ({ ...f, mediaType: e.target.value as MediaType }))}
            >
              <option value="">Type</option>
              {mediaTypeOptions.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <button className="btn-primary" onClick={handleSubmit}><Save size={16} className="mr-1" /> Enregistrer</button>
            <button className="btn-secondary" onClick={() => { setEditingId(null); setForm({}); }}><X size={16} className="mr-1" /> Annuler</button>
          </div>
        </div>
      )}

      {/* Table */}
      <table className="table-auto w-full text-sm">
        <thead>
          <tr className="text-left">
            <th>ID</th>
            <th>DocumentVersionId</th>
            <th>MediaType</th>
            <th>URL</th>
            <th>CreatedAt</th>
            <th>UpdatedAt</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(item => (
            <tr key={item.id} className="border-t">
              <td>{item.id}</td>
              <td>{item.documentVersionId}</td>
              <td>{item.mediaType}</td>
              <td className="truncate max-w-xs">{item.url}</td>
              <td>{new Date(item.createdAt).toLocaleString()}</td>
              <td>{new Date(item.updatedAt).toLocaleString()}</td>
              <td className="flex gap-2">
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
  );
}
