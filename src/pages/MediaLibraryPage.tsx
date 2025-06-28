import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DocumentCategory } from "../types/api";
import { useTags } from '../hooks/useTags';
import { useLanguages } from '../hooks/useLanguages';
import { useMediaLibraryQuery } from '../hooks/useMediaLibrayQuery';
import { TagSummary } from "../types/api";
import MediaCardComponent from '../components/mediaLibrary/MediaCard';
import PageHeader from '../components/ui/PageHeader';
import { Pagination } from '../components/ui/Pagination/Pagination';
import { useTranslation } from '../hooks/useTranslation';
import { Search, Filter, RefreshCw, X } from 'lucide-react';

export default function MediaLibraryPage() {
  const params = useParams<{ type?: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const type = params.type as 'text' | 'audio' | 'video' | undefined;

  // Backend query hook
  const {
    data: mediaCards,
    pagination,
    loading,
    error,
    queryState,
    setSearch,
    setFilter,
    setPage,
    refresh
  } = useMediaLibraryQuery({
    type: type || undefined
  });

  // Additional data for filters
  const { fetchTagSummaries } = useTags();
  const { languages } = useLanguages();
  const [tags, setTags] = useState<TagSummary[]>([]);
  const [searchInput, setSearchInput] = useState(queryState.search || '');
  const [showFilters, setShowFilters] = useState(false);

  // Load tags for filters
  React.useEffect(() => {
    fetchTagSummaries().then(setTags);
  }, [fetchTagSummaries]);

  // Handle search submission
  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    setSearch(searchInput);
  };

  // Handle filter changes
  const handleCategoryToggle = (category: DocumentCategory) => {
    const currentCategories = queryState.categories || [];
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter((c: DocumentCategory) => c !== category)
      : [...currentCategories, category];
    setFilter('categories', newCategories);
  };

  const handleTagToggle = (tagId: string) => {
    const currentTags = queryState.tags || [];
    const newTags = currentTags.includes(tagId)
      ? currentTags.filter((t: string) => t !== tagId)
      : [...currentTags, tagId];
    setFilter('tags', newTags);
  };

  const clearAllFilters = () => {
    setSearchInput('');
    setSearch('');
    setFilter('languageId', '');
    setFilter('categories', []);
    setFilter('tags', []);
    setFilter('author', '');
    setFilter('preacher', '');
  };

  // Get page title and subtitle based on type
  const getPageInfo = () => {
    switch (type) {
      case 'text':
        return {
          title: t('nav.text'),
          subtitle: 'Découvrez notre collection de livres et documents'
        };
      case 'audio':
        return {
          title: t('nav.audio'),
          subtitle: 'Écoutez nos sermons et enseignements audio'
        };
      case 'video':
        return {
          title: t('nav.video'),
          subtitle: 'Regardez nos sermons et événements en vidéo'
        };
      default:
        return {
          title: t('nav.mediatheque'),
          subtitle: 'Explorez notre collection complète de contenus spirituels'
        };
    }
  };

  const { title, subtitle } = getPageInfo();

  // Count active filters
  const activeFiltersCount = [
    queryState.search,
    queryState.languageId,
    queryState.author,
    queryState.preacher,
    ...(queryState.categories || []),
    ...(queryState.tags || [])
  ].filter(Boolean).length;

  return (
    <div>
      <PageHeader 
        title={title}
        subtitle={subtitle}
        backgroundImage="https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg"
      />
      
      <section className="py-16">
        <div className="container-custom">
          {/* Search and Filter Controls */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="mb-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Rechercher dans la médiathèque..."
                    className="form-input pl-10 w-full"
                    disabled={loading}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex items-center px-6"
                >
                  <Search size={16} className="mr-2" />
                  Rechercher
                </button>
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`btn-outline flex items-center px-6 ${showFilters ? 'bg-primary-50 border-primary-500 text-primary-600' : ''}`}
                >
                  <Filter size={16} className="mr-2" />
                  Filtres
                  {activeFiltersCount > 0 && (
                    <span className="ml-2 bg-primary-500 text-white text-xs rounded-full px-2 py-1">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={refresh}
                  disabled={loading}
                  className="btn-secondary flex items-center px-4"
                >
                  <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                </button>
              </div>
            </form>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="border-t pt-6 space-y-6">
                {/* Quick Filters Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Language Filter */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Langue
                    </label>
                    <select
                      className="form-select w-full"
                      value={queryState.languageId || ''}
                      onChange={(e) => setFilter('languageId', e.target.value)}
                    >
                      <option value="">Toutes les langues</option>
                      {languages.map((l) => (
                        <option key={l.id} value={l.id}>{l.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Type-specific filters */}
                  {type === 'text' && (
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Auteur
                      </label>
                      <input
                        className="form-input w-full"
                        placeholder="Filtrer par auteur..."
                        value={queryState.author || ''}
                        onChange={(e) => setFilter('author', e.target.value)}
                      />
                    </div>
                  )}

                  {(type === 'audio' || type === 'video') && (
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Prédicateur
                      </label>
                      <input
                        className="form-input w-full"
                        placeholder="Filtrer par prédicateur..."
                        value={queryState.preacher || ''}
                        onChange={(e) => setFilter('preacher', e.target.value)}
                      />
                    </div>
                  )}
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    Catégories
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {Object.values(DocumentCategory).map((cat) => (
                      <label key={cat} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={queryState.categories?.includes(cat) || false}
                          onChange={() => handleCategoryToggle(cat)}
                          className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 mr-2"
                        />
                        <span className="text-sm text-neutral-700 capitalize">
                          {cat.toLowerCase()}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    Tags
                  </label>
                  <div className="max-h-32 overflow-y-auto border border-neutral-200 rounded-lg p-3">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {tags.map((tag) => (
                        <label key={tag.id} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={queryState.tags?.includes(tag.id) || false}
                            onChange={() => handleTagToggle(tag.id)}
                            className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 mr-2"
                          />
                          <span className="text-sm text-neutral-700 truncate">
                            {tag.title || tag.id}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Filter Actions */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-neutral-600 hover:text-neutral-800 flex items-center"
                  >
                    <X size={14} className="mr-1" />
                    Effacer tous les filtres
                  </button>
                  <div className="text-sm text-neutral-600">
                    {activeFiltersCount} filtre(s) actif(s)
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Summary */}
          <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <p className="text-neutral-600">
                <span className="font-semibold">{pagination.total}</span> {type ? `${type} item(s)` : 'item(s)'} trouvé(s)
                {pagination.totalPages > 1 && (
                  <span> • Page {pagination.page} sur {pagination.totalPages}</span>
                )}
              </p>
              {loading && (
                <div className="flex items-center text-sm text-neutral-500">
                  <RefreshCw size={14} className="animate-spin mr-2" />
                  Chargement...
                </div>
              )}
            </div>
          </div>

          {/* Error state */}
          {error && (
            <div className="bg-error/10 border-l-4 border-error text-error p-4 rounded mb-6">
              {error}
            </div>
          )}

          {/* Results grid */}
          {mediaCards.length === 0 && !loading ? (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <div className="max-w-md mx-auto">
                <div className="text-neutral-400 mb-4">
                  <Search size={48} className="mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-neutral-900 mb-2">
                  Aucun résultat trouvé
                </h3>
                <p className="text-neutral-500 mb-6">
                  Aucun élément ne correspond à vos critères de recherche.
                </p>
                <button 
                  onClick={clearAllFilters}
                  className="btn-outline"
                >
                  Effacer tous les filtres
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mediaCards.map((card) => (
                <MediaCardComponent
                  key={card.id}
                  card={card}
                  variant={type ? 'detailed' : 'basic'}
                  onClick={() => navigate(`/library/view/${card.id}/${card.language.id}/${type || 'text'}`)}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={setPage}
                hasNext={pagination.hasNext}
                hasPrev={pagination.hasPrev}
                loading={loading}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}