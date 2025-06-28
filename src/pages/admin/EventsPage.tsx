import { useState } from 'react';
import { Plus, Edit2, Trash2, Calendar, MapPin, Clock } from 'lucide-react';
import { Document, DocumentCategory, EventType } from "../../types/api";
import { useDocumentsQuery } from '../../hooks/useDocumentsQuery';
import { useDocuments } from '../../hooks/useDocuments';
import { useAsyncOperation } from '../../hooks/useAsyncOperation';
import { AdminPageLayout } from '../../components/admin/shared/AdminPageLayout';
import { DataTable, Column } from '../../components/ui/DataTable/DataTable';
import { Pagination } from '../../components/ui/Pagination/Pagination';
import { QueryControls } from '../../components/ui/QueryControls/QueryControls';
import { formatDate } from '../../utils/formatters';

// Filter for events only
const eventsFilter = {
  categories: [DocumentCategory.EVENT]
};

export default function AdminEventsPage() {
  // Backend query hook with events filter
  const {
    data: events,
    pagination,
    loading,
    error,
    queryState,
    setSearch,
    setFilter,
    setSort,
    setPage,
    refresh
  } = useDocumentsQuery({
    ...eventsFilter,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  // API hooks for operations
  const { remove } = useDocuments();

  // UI state
  const [searchInput, setSearchInput] = useState(queryState.search || '');

  // Async operations
  const deleteOperation = useAsyncOperation(
    async (id: string) => {
      if (window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
        await remove(id);
        refresh();
      }
    }
  );

  // Handle search submission
  const handleSearchSubmit = () => {
    setSearch(searchInput);
  };

  // Handle event type filter
  const handleEventTypeChange = (type: string) => {
    setFilter('eventType', type);
  };

  // Table columns configuration
  const columns: Column<Document>[] = [
    {
      key: 'id',
      header: 'ID',
      sortable: true,
      width: '100px'
    },
    {
      key: 'globalTitle',
      header: 'Titre de l\'Événement',
      sortable: true,
      render: (event) => (
        <div>
          <div className="font-medium text-neutral-900">{event.globalTitle}</div>
          <div className="text-sm text-neutral-500">
            {event.categories.join(', ')}
          </div>
        </div>
      )
    },
    {
      key: 'eventMeta',
      header: 'Type d\'Événement',
      render: (_event) => (
        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium">
          {/* This would come from metadata in real implementation */}
          CONVENTION
        </span>
      ),
      width: '150px'
    },
    {
      key: 'eventDate',
      header: 'Date & Heure',
      render: (event) => (
        <div className="text-sm">
          <div className="flex items-center gap-1 text-neutral-700">
            <Calendar size={12} />
            <span>{formatDate(event.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1 text-neutral-500 mt-1">
            <Clock size={12} />
            <span>{new Date(event.createdAt).toLocaleTimeString('fr-FR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}</span>
          </div>
        </div>
      ),
      width: '150px'
    },
    {
      key: 'location',
      header: 'Lieu',
      render: (_event) => (
        <div className="flex items-center gap-1 text-sm text-neutral-600">
          <MapPin size={12} />
          <span>Sanctuaire Principal</span> {/* This would come from metadata */}
        </div>
      ),
      width: '150px'
    },
    {
      key: 'availableLanguages',
      header: 'Langues',
      render: (event) => (
        <div className="flex flex-wrap gap-1">
          {event.availableLanguages.map(lang => (
            <span key={lang.id} className="bg-neutral-100 text-neutral-600 px-2 py-1 rounded text-xs">
              {lang.name}
            </span>
          ))}
        </div>
      ),
      width: '120px'
    },
    {
      key: 'status',
      header: 'Statut',
      render: (_event) => {
        // In real implementation, this would be based on event dates
        const isUpcoming = true; // Mock logic
        return (
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            isUpcoming 
              ? 'bg-green-100 text-green-700' 
              : 'bg-neutral-100 text-neutral-600'
          }`}>
            {isUpcoming ? 'À venir' : 'Passé'}
          </span>
        );
      },
      width: '100px'
    },
    {
      key: 'createdAt',
      header: 'Créé le',
      sortable: true,
      render: (event) => formatDate(event.createdAt),
      width: '120px'
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (event) => (
        <div className="flex gap-2">
          <button
            className="text-blue-600 hover:text-blue-800 p-1"
            onClick={() => {
              // Handle edit - would open event form
              console.log('Edit event:', event.id);
            }}
            title="Modifier l'événement"
          >
            <Edit2 size={16} />
          </button>
          <button
            className="text-red-500 hover:text-red-700 p-1"
            onClick={() => deleteOperation.execute(event.id)}
            disabled={deleteOperation.isLoading}
            title="Supprimer l'événement"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
      width: '100px'
    }
  ];

  const actions = (
    <button
      className="btn-primary"
      onClick={() => {
        // Handle create new event
        console.log('Create new event');
      }}
    >
      <Plus size={18} className="mr-1" /> Nouvel Événement
    </button>
  );

  return (
    <AdminPageLayout
      title="Gestion des Événements"
      error={error}
      actions={actions}
    >
      {/* Query Controls */}
      <QueryControls
        searchValue={searchInput}
        onSearchChange={setSearchInput}
        onSearchSubmit={handleSearchSubmit}
        onRefresh={refresh}
        loading={loading}
        placeholder="Rechercher par titre d'événement..."
      >
        {/* Event-specific filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            className="form-select"
            value={queryState.eventType || ''}
            onChange={(e) => handleEventTypeChange(e.target.value)}
          >
            <option value="">Tous les types</option>
            {Object.values(EventType).map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          
          <select
            className="form-select"
            value={queryState.status || ''}
            onChange={(e) => setFilter('status', e.target.value)}
          >
            <option value="">Tous les statuts</option>
            <option value="upcoming">À venir</option>
            <option value="ongoing">En cours</option>
            <option value="past">Passés</option>
          </select>

          <select
            className="form-select"
            value={queryState.languageId || ''}
            onChange={(e) => setFilter('languageId', e.target.value)}
          >
            <option value="">Toutes les langues</option>
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
      </QueryControls>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Calendar size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-600">Total Événements</p>
              <p className="text-xl font-bold text-neutral-900">{pagination.total}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Clock size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-600">À venir</p>
              <p className="text-xl font-bold text-neutral-900">
                {events.filter(() => true).length} {/* Mock filter */}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <MapPin size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-600">Lieux uniques</p>
              <p className="text-xl font-bold text-neutral-900">5</p> {/* Mock data */}
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Calendar size={20} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-600">Ce mois</p>
              <p className="text-xl font-bold text-neutral-900">3</p> {/* Mock data */}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <DataTable
          data={events}
          columns={columns}
          sortParams={{
            sortBy: queryState.sortBy,
            sortOrder: queryState.sortOrder
          }}
          onSort={setSort}
          loading={loading || deleteOperation.isLoading}
          emptyMessage="Aucun événement trouvé"
        />
        
        {/* Pagination */}
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={setPage}
          hasNext={pagination.hasNext}
          hasPrev={pagination.hasPrev}
          loading={loading}
        />
      </div>
    </AdminPageLayout>
  );
}