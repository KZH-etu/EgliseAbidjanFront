import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useSermons } from '../../hooks/useSermons';
import { useEvents } from '../../hooks/useEvents';

const DashboardPage = () => {

  const { 
    sermons,
    loading: loadingSermons, 
    error: errorSermons,
  } = useSermons();

  const {
    events,
    loading: loadingEvents,
    error: errorEvents
  } = useEvents();

  if (loadingSermons) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (errorSermons) {
    return (
      <div className="p-6">
        <div className="bg-error/10 border-l-4 border-error text-error p-4 rounded">
          {errorSermons}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-neutral-800">Tableau de Bord</h1>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Sermons */}
        <div className="bg-white rounded-lg shadow-sm lg:col-span-2">
          <div className="p-6 border-b border-neutral-200">
            <h2 className="text-lg font-bold">Sermons Récents</h2>
          </div>
          <div className="p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left pb-3 font-medium text-neutral-500">Titre</th>
                  <th className="text-left pb-3 font-medium text-neutral-500 hidden md:table-cell">Prédicateur</th>
                  <th className="text-left pb-3 font-medium text-neutral-500">Date</th>
                </tr>
              </thead>
              <tbody>
                {sermons.map((sermon) => (
                  <tr key={sermon.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="py-4 font-medium">{sermon.versions?.find(val => val.languageId === 'fr')?.title}</td>
                    <td className="py-4 text-neutral-600 hidden md:table-cell">{sermon.sermonMeta?.preacher}</td>
                    {/*add date here*/}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-neutral-200">
            <h2 className="text-lg font-bold">Événements à Venir</h2>
          </div>
          <div className="p-6">
            <ul className="space-y-6">
              {events.map((event) => (
                <li key={event.id} className="flex items-start space-x-4">
                  <div className="bg-primary-100 text-primary-700 rounded-lg p-3 text-center flex-shrink-0 w-14">
                    <span className="block text-xs">
                      {format(new Date(event.eventMeta?.startTime || ''), 'MMM', { locale: fr })}
                    </span>
                    <span className="block text-lg font-bold">
                      {format(new Date(event.eventMeta?.startTime || ''), 'dd')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium">{event.versions?.find(val => val.languageId === 'fr')?.title}</h3>
                    <p className="text-sm text-neutral-500">
                      {format(new Date(event.eventMeta?.startTime || ''), 'HH:mm')} • {event.eventMeta?.location}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;