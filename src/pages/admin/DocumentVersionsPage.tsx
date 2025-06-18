import { useEffect, useMemo, useState } from 'react';
import { Edit2, Trash2, Plus, Save, X } from 'lucide-react';
import { CreateDocumentVersionDto, UpdateDocumentVersionDto } from "../../types/document-versions";
import { useDocumentVersions } from '../../hooks/useDocumentVersions';
import { useLanguages } from '../../hooks/useLanguages';


const orderFields = ['id', 'documentId', 'title', 'createdAt', 'updatedAt'] as const;

type OrderField = typeof orderFields[number];

type OrderDirection = 'asc' | 'desc';

export default function DocumentVersionsPage() {
  const {
    items,
    loadVersions,
    // loading,
    add,
    patch,
    remove,
    error,
  } = useDocumentVersions();

  const {
    languages,
    loadLanguages,
  } = useLanguages();

  const [search, setSearch] = useState('');
  const [orderBy, setOrderBy] = useState<OrderField>('updatedAt');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]); // this state uses language IDs
  const [orderDir, setOrderDir] = useState<OrderDirection>('desc');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<CreateDocumentVersionDto>>({});
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadLanguages();
    loadVersions();
  }, [loadVersions, loadLanguages]);

  const selectedLanguageNames = useMemo(()=> {
    return selectedLanguages.map(langId => 
      languages.find(lang => lang.id === langId)?.name || ''
    );
  }, [languages, selectedLanguages])

  const handleSearchFilterSort = () => {
    return items
      .filter(item =>
        [item.id, item.documentId, item.title].some(field =>
          field.toLowerCase().includes(search.toLowerCase())
        )
      )
      .filter(item =>
        //here, we have to convert the languageId to the language name to match the selected languages
        selectedLanguages.length ? selectedLanguageNames.includes(item.language) : true
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
    if (!form.documentId || !form.title || !form.languageId) return;
    if (editingId) {
      await patch(editingId, form as UpdateDocumentVersionDto);
      setEditingId(null);
    } else if (isCreating) {
    await add(form as CreateDocumentVersionDto);
    setIsCreating(false);
  }
    setForm({});
  };

  const filtered = handleSearchFilterSort();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Gestion des Versions de Documents</h1>

      {error && <div className="text-red-500">{error}</div>}

      {/* Top Bar */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="form-input"
          placeholder="Search by id, docId, title"
          id='search'
        />

        <div className="flex gap-2">
          {languages.map(lang => (
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
              placeholder="documentId"
              value={form.documentId || ''}
              onChange={e => setForm(f => ({ ...f, documentId: e.target.value }))}
              id="documentId"
            />
            <input
              className="form-input"
              placeholder="Titre"
              value={form.title || ''}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              id="title" 
            />
            <select
              className="form-select"
              value={form.languageId || ''}
              onChange={e => setForm(f => ({ ...f, languageId: e.target.value }))}
              id="languageId"
            >
              <option value="">Language</option>
              {languages.map(lang => (
                <option key={lang.id} value={lang.id}>{lang.name}</option>
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
            <th>DocumentId</th>
            <th>Title</th>
            <th>Language</th>
            <th>CreatedAt</th>
            <th>UpdatedAt</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(item => (
            <tr key={item.id} className="border-t">
              <td>{item.id}</td>
              <td>{item.documentId}</td>
              <td>{item.title}</td>
              <td>{item.language}</td>
              <td>{new Date(item.createdAt).toLocaleString()}</td>
              <td>{new Date(item.updatedAt).toLocaleString()}</td>
              <td className="flex gap-2">
                <button onClick={() => {
                  setEditingId(item.id);
                  setForm({
                    documentId: item.documentId,
                    languageId: languages.find(lang => lang.name === item.language)?.id || '',
                    title: item.title,
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
