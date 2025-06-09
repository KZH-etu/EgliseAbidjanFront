import { useEffect, useMemo, useState } from "react";
import { useSermons } from "../../hooks/useSermons";
import { useLanguageStore } from "../../stores/useLanguageStore";
import { useTagStore } from "../../stores/useTagStore";
import { useDocumentStore } from "../../stores/useDocumentStore";

interface FilterOptions {
  search: string;
  tags: string[];
  languageId: string;
  preacher: string;
  location: string;
}

const SermonsPage = () => {
  // ----- Data & loading state from stores/hooks -----
  const { hasFetched: hasFetchedDocs, fetchAll: fetchDocs } = useDocumentStore();
  const { sermons, loading: loadingSermons, error: sermonsError } = useSermons();
  const { items: allTags, hasFetched: hasFetchedTags, fetchAll: fetchTags } = useTagStore();
  const { items: allLanguages, hasFetched: hasFetchedLangs, fetchAll: fetchLanguages } = useLanguageStore();

  // ----- Local filter state -----
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    tags: [],
    languageId: '',
    preacher: '',
    location: '',
  });

  // ----- Fetch tags & languages once -----
  useEffect(() => {
    if (!hasFetchedDocs) fetchDocs();
    if (!hasFetchedTags) fetchTags();
    if (!hasFetchedLangs) fetchLanguages();
  }, [hasFetchedDocs, hasFetchedTags, hasFetchedLangs, fetchDocs, fetchTags, fetchLanguages]);

  // ----- Filtered list of sermons -----
  const filtered = useMemo(() => {
    return sermons.filter((doc) => {
      // version-level filter: search in title
      const matchesSearch =
        !filters.search ||
        doc.globalTitle.toLowerCase().includes(filters.search.toLowerCase());

      // metadata-level filters
      const meta = doc.sermonMeta;
      const matchesPreacher =
        !filters.preacher ||
        meta?.preacher.toLowerCase().includes(filters.preacher.toLowerCase());

      const matchesLocation =
        !filters.location ||
        meta?.location?.toLowerCase().includes(filters.preacher.toLowerCase());

      // language filter
      const availableLanguages = doc.versions?.map(v => v.languageId)
      const matchesLang =
        !filters.languageId || availableLanguages?.includes(filters.languageId);

      // tag filter (doc.tags is an array of Tag IDs on the document)
      const matchesTags =
        filters.tags.length === 0 ||
        filters.tags.every((tid) => doc.tags?.map(t => t.id).includes(tid));

      return (
        matchesSearch &&
        matchesPreacher &&
        matchesLocation &&
        matchesLang &&
        matchesTags
      );
    });
  }, [sermons, filters]);

  // ----- Handlers for inputs -----
  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSelectLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((f) => ({ ...f, languageId: e.target.value }));
  };

  const toggleTag = (tagId: string) => {
    setFilters((f) => ({
      ...f,
      tags: f.tags.includes(tagId)
        ? f.tags.filter((t) => t !== tagId)
        : [...f.tags, tagId],
    }));
  };

  // ----- Render -----
  return (
    <div>
      <h1>Sermons</h1>

      {/* Filters */}
      <section>
        <input
          type="text"
          placeholder="Search by title..."
          name="search"
          value={filters.search}
          onChange={onChangeField}
        />
        <input
          type="text"
          placeholder="Filter by preacher..."
          name="preacher"
          value={filters.preacher}
          onChange={onChangeField}
        />
        <input
          type="text"
          placeholder="Filter by location..."
          name="location"
          value={filters.location}
          onChange={onChangeField}
        />

        <select
          name="languageId"
          value={filters.languageId}
          onChange={onSelectLanguage}
        >
          <option value="">All Languages</option>
          {allLanguages.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.name}
            </option>
          ))}
        </select>

        <div>
          {allTags.map((tag) => (
            <label key={tag.id} style={{ marginRight: 8 }}>
              <input
                type="checkbox"
                checked={filters.tags.includes(tag.id)}
                onChange={() => toggleTag(tag.id)}
              />
              {/* display the title in the user’s UI language, e.g. */}
              {tag.translations.find((t) => t.language === 'en')?.title ??
                tag.translations[0]?.title}
            </label>
          ))}
        </div>
      </section>

      {/* Content */}
      {loadingSermons && <p>Loading sermons…</p>}
      {sermonsError && <p style={{ color: 'red' }}>Error: {sermonsError}</p>}
      {!loadingSermons && filtered.length === 0 && <p>No sermons found.</p>}

      <ul>
        {filtered.map((doc) => (
          <li key={doc.id} style={{ marginBottom: 16 }}>
            <h2>{doc.globalTitle}</h2>
            <p>
              <strong>Preacher:</strong> {doc.sermonMeta?.preacher ?? 'N/A'}
            </p>
            <p>
              <strong>Location:</strong> {doc.sermonMeta?.location ?? 'N/A'}
            </p>
            <p>
              <strong>Date:</strong>{' '}
              {doc.sermonMeta?.preachedAt
                ? new Date(doc.sermonMeta.preachedAt).toLocaleDateString()
                : 'N/A'}
            </p>
            {/* Add links or players for audio/pdf here */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SermonsPage;