import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DocumentCategory } from "../types/api";
import { useTags } from '../hooks/useTags';
import { useLanguages } from '../hooks/useLanguages';
import { useMediaLibrary } from '../hooks/useMediaLibrary';
import { TagSummary } from "../types/api";
import MediaLibraryFilters from '../components/mediaLibrary/MediaLibraryFilters';
import MediaLibraryResultCard from '../components/mediaLibrary/MediaLibraryResultCard';


export interface MediaLibFilters {
  search: string;
  tags:     string[];
  categories: DocumentCategory[];       // BOOK/SERMON/EVENT
  preacher: string;         // for audio
  author:    string;        // for text
  languageId: string;
}

const MediaLibraryPage: React.FC = () => {
  const params = useParams<{ type?: string }>();
  const [tags, setTags] = useState<TagSummary[]>([]);
  const { fetchTagSummaries } = useTags();
  const { languages, } = useLanguages();
  const { items } = useMediaLibrary();
  const type = params.type as 'text' | 'audio' | 'video' | undefined;

  const [filters, setFilters] = useState<MediaLibFilters>({
    search: '',
    tags: [],
    categories: [],
    preacher: '',
    author: '',
    languageId: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchTagSummaries().then((fetchedTags) => {
      setTags(fetchedTags);
    });
  }, [fetchTagSummaries]);

  const toggleTag = (id: string) =>
    setFilters((f) => ({ ...f, tags: f.tags.includes(id) ? f.tags.filter(t => t !== id) : [...f.tags, id] }));
  const toggleCategory = (cat: DocumentCategory) => {
    setFilters((f) => ({
      ...f,
      categories: f.categories.includes(cat)
        ? f.categories.filter((c) => c !== cat)
        : [...f.categories, cat],
    }));
  };

  const filtered = useMemo(() => {
    return Array.isArray(items)
      ? items.filter((item) => {
          if (
            filters.search &&
            !item.title.toLowerCase().includes(filters.search.toLowerCase())
          ) {
            return false;
          }
          if (filters.tags.length) {
            const docTags = item.tags.map((t) => t.id);
            if (!filters.tags.every((tid) => docTags.includes(tid))) return false;
          }
          if (filters.categories.length > 0) {
            const hasIntersection = filters.categories.some((sel) =>
              item.categories.includes(sel)
            );
            if (!hasIntersection) {
              return false;
            }
          }
          if (filters.languageId && item.language.id !== filters.languageId) {
            return false;
          }
          if (type === 'text' && filters.author) {
            const authorFilter = filters.author.toLowerCase();
            const keyPersons = item.keyPersons?.map((p) => p.toLowerCase()) || [];
            if (!keyPersons.some((person) => person.includes(authorFilter))) return false;
          }
          if (type === 'audio' && filters.preacher) {
            const preacherFilter = filters.preacher.toLowerCase();
            const keyPersons = item.keyPersons?.map((p) => p.toLowerCase()) || [];
            if (!keyPersons.some((person) => person.includes(preacherFilter))) return false;
          }
          return true;
        })
      : [];
  }, [items, filters, type]);

  if (!type || !['text', 'audio', 'video'].includes(type)) {
    return <p>Invalid media type.</p>;
  }

  return (
    <div>
      <h2>{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
      <MediaLibraryFilters
        type={type}
        filters={filters}
        setFilters={setFilters}
        tags={tags}
        languages={languages}
        toggleTag={toggleTag}
        toggleCategory={toggleCategory}
      />
      {filtered.length === 0 && <p>No items of type "{type}" found.</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {filtered.map((item) => (
          <MediaLibraryResultCard
            key={item.mediaId}
            item={item}
            onClick={() => navigate(`/library/view/${item.id}/${item.language.id}/${type}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default MediaLibraryPage;