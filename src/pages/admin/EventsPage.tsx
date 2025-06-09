import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Plus, 
  Search,
  Calendar,
  MapPin,
  Clock,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';
// impportation du composant permettant d'entrer des evenements en fonction de la langue
// import EventTranslationsForm from '../../components/admin/EventTranslationsForm';


const EventsPage = () => {
  // const { events, loading, error, addItem, updateItem, deleteItem } = useAdminStore();
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [translations, setTranslations] = useState([
  { lang: 'fr', title: '', description: '', is_auto_translated: false },
  { lang: 'en', title: '', description: '' , is_auto_translated: false },
  { lang: 'es', title: '', description: '', is_auto_translated: false },
]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm(
    {
      defaultValues: {
        title: '',
        date: '',
        time: '',
        location: '',
        description: ''
      }
    }
  );

  // const onSubmit = async (data : any) => {
  //   console.log('Form data:', data);
  //   setSubmitting(true);
  //   try {
  //     const dateTime = new Date(`${data.date}T${data.time}`).toISOString();
  //     const eventData = {
  //       ...data,
  //       date: dateTime,
  //       language: 'fr',
  //       location: data.location || '',
  //       translations,
  //     };
      
  //     // Remove direct title and description as they're now in language-specific objects
  //     // delete eventData.title;
  //     // delete eventData.description;

  //     if (editingEvent) {
  //       await updateItem('events', editingEvent.id, eventData);
  //     } else {
  //       await addItem('events', eventData);
  //     }
  //     setShowForm(false);
  //     setEditingEvent(null);
  //     reset();
  //   } catch (error) {
  //     console.error('Failed to save event:', error);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  // const handleDelete = async (id : string) => {
  //   if (window.confirm('Are you sure you want to delete this event?')) {
  //     await deleteItem('events', id);
  //   }
  // };

  // const handleEdit = (event : Event) => {
  //   const eventDate = new Date(event.date);
  //   setEditingEvent(event);
  //   setShowForm(true);
  //   setTranslations(
  //   ['fr', 'en', 'es'].map(lang => {
  //     const tr = event.translations.find(t => t.lang === lang);
  //     let description = tr?.description || '';
  //     if (Array.isArray(description)) {
  //       description = description.join(' ');
  //     }
  //     return { lang, title: tr?.title || '', description, is_auto_translated: false };
  //   })
  // );
  //   reset({
  //     title: event.translations.find(t => t.lang == 'fr')?.title || '',
  //     date: format(eventDate, 'yyyy-MM-dd'),
  //     time: format(eventDate, 'HH:mm'),
  //     location: event.location,
  //     description: (() => {
  //       const desc = event.translations.find(t => t.lang == 'fr')?.description;
  //       if (Array.isArray(desc)) {
  //         return desc.join(' ');
  //       }
  //       return desc;
  //     })(),
  //   });
  // };

  // const filteredEvents = events.filter(event =>
  //   (event.translations.find(t => t.lang == 'fr')?.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   (event.location || '').toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center h-[calc(100vh-64px)]">
  //       <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin"></div>
  //     </div>
  //   );
  // }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Événements</h1>
        <button
          className="btn-primary"
          onClick={() => {
            setShowForm(true);
            setEditingEvent(null);
            reset();
          }}
        >
          <Plus size={20} className="mr-2" />
          Ajouter un Événement
        </button>
      </div>

      {/* {error && (
        <div className="bg-error/10 border-l-4 border-error text-error p-4 mb-6">
          {error}
        </div>
      )} */}

      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Rechercher un événement..."
            className="pl-10 pr-4 py-2 w-full border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Affichage des evenements filtrés */}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                {editingEvent ? 'Modifier l\'Événement' : 'Ajouter un Événement'}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingEvent(null);
                  reset();
                }}
                className="text-neutral-500 hover:text-neutral-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={() => console.log('submit')} className="space-y-4">
                {/* Formulaire d'ajout ou de modifiaction d'un evenements --- (EventsTranslationForm) */}
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;