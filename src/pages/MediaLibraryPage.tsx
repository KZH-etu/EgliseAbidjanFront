import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { DocumentCategory } from '../api/types/documents/documents';
import { useTagStore } from '../stores/useTagStore';
import { useLanguageStore } from '../stores/useLanguageStore';
import { DocumentMediaResponseDto } from '../api/types/documents/documents';


interface Filters {
  search: string;
  tags:     string[];
  categories: DocumentCategory[];       // BOOK/SERMON/EVENT
  preacher: string;         // for audio
  author:    string;        // for text
  languageId: string;
}


export const MediaLibraryPage = () => {
  const params = useParams<{ type?: string }>();  // 'text' | 'audio' | 'video'
  //here, i will add a store that returns media of the mediaItemDto shape to be used here
  const { items: allTags, fetchAll: fetchTags,    hasFetched: tagsFetched }    = useTagStore();
  const { items: langs,   fetchAll: fetchLangs,  hasFetched: langsFetched }   = useLanguageStore();
  const type = params.type as 'text' | 'audio' | 'video' | undefined;

  const [filters, setFilters] = useState<Filters>({
    search: '',
    tags: [],
    categories: [],
    preacher: '',
    author: '',
    languageId: '',
  });

  // Load master data once
  useEffect(() => {
    if (!tagsFetched) fetchTags();
    if (!langsFetched) fetchLangs();
  }, [tagsFetched, langsFetched, fetchTags, fetchLangs]);

  //mock version of mediaItems
  const mediaItems: DocumentMediaResponseDto[] = []

  // Apply filters
  const filtered = useMemo(() => {
    return mediaItems.filter((item) => {
        // globalTitle / version-title search
        if (filters.search && !item.version.title.toLowerCase().includes(filters.search.toLowerCase())) {
            return false;
        }
        // tag filter
        if (filters.tags.length) {
            const docTags = item.tags.map(t => t.id);
            if (!filters.tags.every((tid) => docTags.includes(tid))) return false;
        }
        // category
        if (filters.categories.length > 0) {
            const hasIntersection = filters.categories.some((sel) =>
            item.categories.includes(sel),
            );
            if (!hasIntersection) {
            return false;
            }
        }
        // language
        if (filters.languageId && item.version.languageId !== filters.languageId) {
            return false;
        }
        // example: author filter for text
        if (type === 'text' && filters.author) {
            const author = item.bookMeta?.author ?? '';
            if (!author.toLowerCase().includes(filters.author.toLowerCase())) return false;
        }
        // example: preacher filter for audio
        if (type === 'audio' && filters.preacher) {
            const preacher = item.sermonMeta?.preacher ?? '';
            if (!preacher.toLowerCase().includes(filters.preacher.toLowerCase())) return false;
        }
        return true;
    });
  }, [mediaItems, filters, type]);

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
        <select name="languageId" value={filters.languageId} onChange={handleChange}>
          <option value="">All Languages</option>
          {langs.map((l) => (
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
          {allTags.map((t) => (
            <label key={t.id}>
              <input
                type="checkbox"
                checked={filters.tags.includes(t.id)}
                onChange={() => toggleTag(t.id)}
              />
              {t.translations.find(tr => tr.language==='en')?.title}
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
      {mediaItems.length===0 && <p>No items of type "{type}" found.</p>}
      {filtered.map((item) => (
        <div key={item.version.mediaItem.id} style={{ margin: 12, border: '1px solid #ccc', padding: 8 }}>
          {/* type-specific display */}
          {type==='text' && <p>PDF: <a href={item.version.mediaItem.url} target="_blank">Download</a></p>}
          {type==='audio' && <audio controls src={item.version.mediaItem.url} preload="metadata" />}
          {type==='video' && <iframe src={item.version.mediaItem.url} title={item.version.title} />}
          <h3>{item.version.title}</h3>
          <p>Version: {item.version.title}</p>
          {/* add other attrbutes here */}
        </div>
      ))}
    </div>
  );
};
