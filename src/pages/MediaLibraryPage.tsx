import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DocumentCategory } from '../types/documents';
import { useTags } from '../hooks/useTags';
import { useLanguages } from '../hooks/useLanguages';
import { useMediaLibrary } from '../hooks/useMediaLibrary';
import { TagSummaryDto } from '../types/tags';


interface Filters {
  search: string;
  tags:     string[];
  categories: DocumentCategory[];       // BOOK/SERMON/EVENT
  preacher: string;         // for audio
  author:    string;        // for text
  languageId: string;
}

const MediaLibraryPage = () => {
  const params = useParams<{ type?: string }>();  // 'text' | 'audio' | 'video'
  const [tags, setTags] = useState<TagSummaryDto[]>([]);
  // here, i will add a store that returns media of the mediaItemDto shape to be used here
  const { fetchTagSummaries } = useTags();
  const { languages, loadLanguages } = useLanguages();
  const { items, loadItems } = useMediaLibrary();
  const type = params.type as 'text' | 'audio' | 'video' | undefined;

  const [filters, setFilters] = useState<Filters>({
    search: '',
    tags: [],
    categories: [],
    preacher: '',
    author: '',
    languageId: '',
  });

  const navigate = useNavigate();

  // Load master data once
  useEffect(() => {
    loadItems();
    loadLanguages();
    fetchTagSummaries().then((fetchedTags) => {
      setTags(fetchedTags);
    });
  }, [fetchTagSummaries, loadLanguages, loadItems]);

  // Apply filters
  const filtered = useMemo(() => {
    return Array.isArray(items)
      ? items.filter((item) => {
          // globalTitle / version-title search
          if (
            filters.search &&
            !item.title.toLowerCase().includes(filters.search.toLowerCase())
          ) {
            return false;
          }
          // tag filter
          if (filters.tags.length) {
            const docTags = item.tags.map((t) => t.id);
            if (!filters.tags.every((tid) => docTags.includes(tid))) return false;
          }
          // category
          if (filters.categories.length > 0) {
            const hasIntersection = filters.categories.some((sel) =>
              item.categories.includes(sel)
            );
            if (!hasIntersection) {
              return false;
            }
          }
          // language
          if (filters.languageId && item.language.id !== filters.languageId) {
            return false;
          }
          // example: author filter for text
          if (type === 'text' && filters.author) {
            const authorFilter = filters.author.toLowerCase();
            const keyPersons = item.keyPersons?.map((p) => p.toLowerCase()) || [];
            if (!keyPersons.some((person) => person.includes(authorFilter))) return false;
          }
          // example: preacher filter for audio
          if (type === 'audio' && filters.preacher) {
            const preacherFilter = filters.preacher.toLowerCase();
            const keyPersons = item.keyPersons?.map((p) => p.toLowerCase()) || [];
            if (!keyPersons.some((person) => person.includes(preacherFilter))) return false;
          }
          return true;
        })
      : [];
  }, [items, filters, type]);

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((f) => ({ ...f, [name]: value }));
  };
  const toggleTag = (id: string) =>
    setFilters((f) => ({ ...f, tags: f.tags.includes(id) ? f.tags.filter(t => t!==id) : [...f.tags,id] }));
  // toggle a category on/off in the filters array
  const toggleCategory = (cat: DocumentCategory) => {
    setFilters((f) => ({
      ...f,
      categories: f.categories.includes(cat)
        ? f.categories.filter((c) => c !== cat)
        : [...f.categories, cat],
    }));
  };

  if (!type || !['text','audio','video'].includes(type)) {
        return <p>Invalid media type.</p>;
  }

  // Render
  return (
    <div>
      <h2>{type.charAt(0).toUpperCase()+type.slice(1)}</h2>
      {/* Filters */}
      <section>
        <input
          name="search"
          placeholder="Search title…"
          value={filters.search}
          onChange={handleChange}
        />
        {/* Language selector: clients can choose between all available languages */}
        <select name="languageId" value={filters.languageId} onChange={handleChange}>
          <option value="">All Languages</option>
          {languages.map((l) => (
            <option key={l.id} value={l.id}>{l.name}</option>
          ))}
        </select>

        {/* Category checkboxes */}
        <div>
            {Object.values(DocumentCategory).map((cat) => (
            <label key={cat} style={{ marginRight: 8 }}>
                <input
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                />
                {cat[0] + cat.slice(1).toLowerCase()}
            </label>
            ))}
        </div>

        <div>
          {tags.map((t) => (
            <label key={t.id}>
              <input
                type="checkbox"
                checked={filters.tags.includes(t.id)}
                onChange={() => toggleTag(t.id)}
              />
              {t.title || t.id}
            </label>
          ))}
        </div>
        {type==='text' && (
          <input
            name="author"
            placeholder="Filter by author…"
            value={filters.author}
            onChange={handleChange}
          />
        )}
        {type==='audio' && (
          <input
            name="preacher"
            placeholder="Filter by preacher…"
            value={filters.preacher}
            onChange={handleChange}
          />
        )}
      </section>

      {/* Results */}
      {filtered.length === 0 && <p>No items of type "{type}" found.</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {filtered.map((item) => (
          <div
            key={item.mediaId}
            style={{
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: 16,
              width: 320,
              background: "#fafbfc",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              cursor: "pointer"
            }}
            onClick={() => navigate(`/library/view/${item.id}/${item.language.id}/${type}`)}
            title="View details"
          >
            <h3 style={{ margin: "0 0 8px 0" }}>{item.title}</h3>
            {item.description && (
              <p style={{ margin: "0 0 8px 0", color: "#555" }}>{item.description}</p>
            )}
            <div style={{ fontSize: 14, marginBottom: 8 }}>
              <strong>Categories:</strong>{" "}
              {item.categories.map((cat) => (
                <span key={cat} style={{ marginRight: 6 }}>{cat}</span>
              ))}
            </div>
            <div style={{ fontSize: 14, marginBottom: 8 }}>
              <strong>Language:</strong> {item.language.name}
            </div>
            {item.keyPersons.length > 0 && (
              <div style={{ fontSize: 14, marginBottom: 8 }}>
                <strong>Key Persons:</strong> {item.keyPersons.join(", ")}
              </div>
            )}
            <div style={{ fontSize: 14, marginBottom: 8 }}>
              <strong>Tags:</strong>{" "}
              {item.tags.length > 0
                ? item.tags.map((t) => (
                    <span key={t.id} style={{ marginRight: 4 }}>{t.title}</span>
                  ))
                : <span style={{ color: "#aaa" }}>None</span>}
            </div>
            <div style={{ fontSize: 14, marginBottom: 8 }}>
              <strong>Media Type:</strong> {item.mediaType}
            </div>
            <div style={{ fontSize: 12, color: "#888" }}>
              <strong>Media ID:</strong> {item.mediaId}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
 export default MediaLibraryPage;