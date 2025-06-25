import { MediaLibFilters } from "../../pages/MediaLibraryPage";
import { DocumentCategory } from "../../types/api";
import { TagSummary } from "../../types/api";


export default function MediaLibraryFilters({
  type,
  filters,
  setFilters,
  tags,
  languages,
  toggleTag,
  toggleCategory,
}: {
  type: 'text' | 'audio' | 'video';
  filters: MediaLibFilters;
  setFilters: (f: any) => void;
  tags: TagSummary[];
  languages: { id: string; name: string }[];
  toggleTag: (id: string) => void;
  toggleCategory: (cat: DocumentCategory) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((f: MediaLibFilters) => ({ ...f, [name]: value }));
  };

  return (
    <section>
      <input
        name="search"
        placeholder="Search title…"
        value={filters.search}
        onChange={handleChange}
      />
      <select name="languageId" value={filters.languageId} onChange={handleChange}>
        <option value="">All Languages</option>
        {languages.map((l) => (
          <option key={l.id} value={l.id}>{l.name}</option>
        ))}
      </select>
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
      {type === 'text' && (
        <input
          name="author"
          placeholder="Filter by author…"
          value={filters.author}
          onChange={handleChange}
        />
      )}
      {type === 'audio' && (
        <input
          name="preacher"
          placeholder="Filter by preacher…"
          value={filters.preacher}
          onChange={handleChange}
        />
      )}
    </section>
  );
}