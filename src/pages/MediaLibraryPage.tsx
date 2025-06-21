import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DocumentCategory } from '../types/documents';
import { useTags } from '../hooks/useTags';
import { useLanguages } from '../hooks/useLanguages';
import { useMediaLibrary } from '../hooks/useMediaLibrary';
import { TagSummaryDto } from '../types/tags';
import PageHeader from '../components/ui/PageHeader';
import { useTranslation } from '../hooks/useTranslation';
import { Book, Filter, Search } from 'lucide-react';
import Select from 'react-select';

const ITEMS_PER_PAGE_OPTIONS = [12, 24, 48];

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
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);
  const { items, loadItems } = useMediaLibrary();
  const [currentPage, setCurrentPage] = useState(1);
  const type = params.type as 'text' | 'audio' | 'video' | undefined;
  const [showFilters, setShowFilters] = useState(false);
  const { t } = useTranslation();

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
          if (filters.search && !item.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
          if (filters.tags.length && !filters.tags.every(tag => item.tags.map(t => t.id).includes(tag))) return false;
          if (filters.categories.length && !filters.categories.some(cat => item.categories.includes(cat))) return false;
          if (filters.languageId && item.language.id !== filters.languageId) return false;
          if (type === 'text' && filters.author && !item.keyPersons?.some(p => p.toLowerCase().includes(filters.author.toLowerCase()))) return false;
          if (type === 'audio' && filters.preacher && !item.keyPersons?.some(p => p.toLowerCase().includes(filters.preacher.toLowerCase()))) return false;
          return true;
        })
      : [];
  }, [items, filters, type]);

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((f) => ({ ...f, [name]: value }));
  };
  // const toggleTag = (id: string) =>
  //   setFilters((f) => ({ ...f, tags: f.tags.includes(id) ? f.tags.filter(t => t!==id) : [...f.tags,id] }));
  // // toggle a category on/off in the filters array
  // const toggleCategory = (cat: DocumentCategory) => {
  //   setFilters((f) => ({
  //     ...f,
  //     categories: f.categories.includes(cat) ? f.categories.filter(c => c !== cat) : [...f.categories, cat],
  //   }));
  // };

  const tagOptions = tags.map(t => ({ value: t.id, label: t.title || t.id }));
  const categoryOptions = Object.values(DocumentCategory).map(cat => ({
    value: cat,
    label: cat[0] + cat.slice(1).toLowerCase()
  }));

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBooks = filtered.slice(startIndex, startIndex + itemsPerPage);

  if (!type || !['text', 'audio', 'video'].includes(type)) return <p className="text-center text-red-500">Invalid media type.</p>;


  // Render
  return (
    <div className="min-h-screen bg-neutral-50">
      <PageHeader 
        title={t('nav.books')}
        subtitle={t('books.subtitle')}
        backgroundImage="https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg"
      />

      {/* Filters */}
      <section className="container-custom py-12">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-grow relative">
              <Search size={20} className="absolute left-3 top-[40%] transform -translate-y-1/2 text-neutral-400" />
              <input
                name="search"
                placeholder={t('common.search') || "Search title…"}
                value={filters.search}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <button
              onClick={() => setShowFilters((prev) => !prev)}
              className="btn-outline flex items-center gap-2"
              type="button"
            >
              <Filter size={20} />
              <span>{t('common.filters')}</span>
            </button>
          </div>

          {showFilters && (
            <div className="mt-6 pt-6 border-t border-neutral-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Catégories */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">{t('common.categories')}</label>
                <Select
                  isMulti
                  options={categoryOptions}
                  value={categoryOptions.filter(opt => filters.categories.includes(opt.value))}
                  onChange={selected =>
                    setFilters(f => ({
                      ...f,
                      categories: selected ? selected.map(opt => opt.value) : []
                    }))
                  }
                  placeholder={t('books.allCategories')}
                  classNamePrefix="react-select"
                />
              </div>
              {/* Auteur/Prédicateur */}
              {type === 'text' && (
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">{t('common.author')}</label>
                  <input
                    name="author"
                    placeholder={t('books.filterByAuthor') || "Filter by author…"}
                    value={filters.author}
                    onChange={handleChange}
                    className="w-full p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              )}
              {type === 'audio' && (
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">{t('common.preacher')}</label>
                  <input
                    name="preacher"
                    placeholder={t('books.filterByPreacher') || "Filter by preacher…"}
                    value={filters.preacher}
                    onChange={handleChange}
                    className="w-full p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              )}
              {/* Langue */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">{t('common.language')}</label>
                <select
                  name="languageId"
                  value={filters.languageId}
                  onChange={handleChange}
                  className="w-full p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">{t('books.allLanguages')}</option>
                  {languages.map((l) => (
                    <option key={l.id} value={l.id}>{l.name}</option>
                  ))}
                </select>
              </div>
              {/* Tags */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-2">{t('common.tags')}</label>
                <Select
                  isMulti
                  options={tagOptions}
                  value={tagOptions.filter(opt => filters.tags.includes(opt.value))}
                  onChange={selected =>
                    setFilters(f => ({
                      ...f,
                      tags: selected ? selected.map(opt => opt.value) : []
                    }))
                  }
                  placeholder={t('books.selectTags')}
                  classNamePrefix="react-select"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-2">
          <div className="text-neutral-700 font-bold">
            {filtered.length} {t('books.foundResults')}
          </div>
          
          <div className="flex items-center gap-3">
            <p className="text-sm text-neutral-600">
              {t('books.itemsPerPage')}
            </p>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="form-input py-1 pl-3 pr-8 text-sm"
            >
              {ITEMS_PER_PAGE_OPTIONS.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Results */}
      {paginatedBooks.length === 0 ? (
        <div className="text-center py-12 text-neutral-600">
          {t('books.noResults')}
        </div>
      ) : (
        <div className='pb-16 container-custom'>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
            {paginatedBooks.map((item) => (
              <div
                key={item.mediaId}
                className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden border border-neutral-100"
                onClick={() => navigate(`/library/view/${item.id}/${item.language.id}/${type}`)}
                title="View details"
                style={{ cursor: "pointer" }}
              >
                <div className="relative aspect-[2/3] bg-neutral-100 flex items-center justify-center">
                  <Book size={48} className="text-neutral-300" />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </div>
                {/* Card Content */}
                <div className="flex flex-col flex-1 p-4">
                  {/* Title */}
                  <h3 className="text-base font-semibold text-neutral-900 mb-1 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200">
                    {item.title}
                  </h3>
                  {/* Key Persons */}
                  {item.keyPersons?.length > 0 && (
                    <p className="text-xs text-neutral-600 mb-2 line-clamp-1">
                      {item.keyPersons.join(', ')}
                    </p>
                  )}
                  {/* Categories & Language */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {item.categories.map((cat) => (
                      <span
                        key={cat}
                        className="px-2 py-0.5 bg-primary-50 text-primary-600 rounded-full text-xs font-medium"
                      >
                        {cat}
                      </span>
                    ))}
                    <span className="px-2 py-0.5 bg-neutral-50 text-neutral-700 rounded-full text-xs font-medium">
                      {item.language?.name}
                    </span>
                  </div>
                  {/* Tags */}
                  <div className="mb-2 text-xs">
                    <strong className="text-neutral-700">Tags:</strong>{" "}
                    {item.tags.length > 0 ? (
                      item.tags.map((t) => (
                        <span
                          key={t.id}
                          className="inline-block mr-1 mb-1 bg-neutral-100 rounded px-2 py-0.5 text-xs text-neutral-700"
                        >
                          {t.title}
                        </span>
                      ))
                    ) : (
                      <span className="text-neutral-400">None</span>
                    )}
                  </div>
                  {/* Media Type & Media ID */}
                  <div className="mb-1 text-xs">
                    <strong className="text-neutral-700">Media Type:</strong>{" "}
                    <span className="text-neutral-600">{item.mediaType}</span>
                  </div>
                  <div className="mb-2 text-[11px] text-neutral-400">
                    <strong>Media ID:</strong> {item.mediaId}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-neutral-300 text-neutral-600 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg border ${
                    currentPage === page
                      ? 'bg-primary-500 text-white border-primary-500'
                      : 'border-neutral-300 text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-neutral-300 text-neutral-600 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &gt;
              </button>
            </div>
          )}
        </div>
      )}

      {/* {filtered.length === 0 && <p>No items of type "{type}" found.</p>}
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
      </div> */}
    </div>
  );
};
 export default MediaLibraryPage;