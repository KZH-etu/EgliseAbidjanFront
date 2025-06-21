import React, { useEffect, useState } from "react";
import { DocumentsByLanguageResponseDto, SermonStatsDto, UserMessageResponseDto } from "../../types/dashboard";
import { ArrowUp, ArrowDown, PlayCircle, Users, Book, Globe, Video, Mic, FileText } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale/fr";
import { MediaType } from "../../types/document-media";
import { EventSummaryDto } from "../../types/documents";

// Mocked data fetching functions using new models
const fetchSermonStats = async (): Promise<SermonStatsDto> => ({
  total: 120,
  byType: { video: 60, audio: 40, text: 20 },
  recent: [
    {
      id: "1",
      title: "Faith in Action",
      preacher: "John Doe",
      date: "2025-06-10",
      type: MediaType.VIDEO,
      mediaUrl: "https://example.com/video1"
    },
    {
      id: "2",
      title: "Hope and Healing",
      preacher: "Jane Smith",
      date: "2025-06-12",
      type: MediaType.AUDIO,
      mediaUrl: "https://example.com/audio1"
    }
  ]
});

const fetchEvents = async (): Promise<EventSummaryDto[]> => [
  { id: "1", title: "Sunday Service", date: "2025-06-22", location: "Main Hall" },
  { id: "2", title: "Youth Meeting", date: "2025-06-24", location: "Youth Center" },
];

const fetchNewsletterStats = async (): Promise<{ subscribers: number }> => ({ subscribers: 350 });

// Mocked streaming stats
const fetchStreamingStats = async (): Promise<{ online: boolean; currentViewers: number; totalStreams: number }> => ({
  online: true,
  currentViewers: 42,
  totalStreams: 15,
});

const fetchDocumentStats = async (): Promise<{ totalDocs: number }> => ({ totalDocs: 87 }); // total documents number

const fetchSystemHealth = async (): Promise<{
  serverStatus: string;
  errorLogs: { id: string; message: string }[];
}> => ({
  serverStatus: "Online",
  errorLogs: [
    { id: "1", message: "Minor warning: Disk space at 80%" },
    { id: "2", message: "No critical errors" },
  ],
});

const fetchLocalizationStats = async (): Promise<DocumentsByLanguageResponseDto> => ({
  data: [
    { languageId: "en", documentsNumber: 80 },
    { languageId: "fr", documentsNumber: 30 },
    { languageId: "es", documentsNumber: 10 }
  ]
});

const fetchFeedback = async (): Promise<UserMessageResponseDto[]> => [
  {
    id: "1",
    username: "John Doe",
    email: "john@example.com",
    message: "Great sermon last week!",
    createdAt: new Date("2025-06-10T10:00:00Z")
  },
  {
    id: "2",
    username: "Jane Smith",
    email: "jane@example.com",
    message: "Can you add more audio content?",
    createdAt: new Date("2025-06-12T14:30:00Z")
  }
];

const DashBoard: React.FC = () => {
  const [sermonStats, setSermonStats] = useState<SermonStatsDto | null>(null);
  const [events, setEvents] = useState<EventSummaryDto[]>([]);
  const [newsletter, setNewsletter] = useState<{ subscribers: number } | null>(null);
  const [streaming, setStreaming] = useState<{ online: boolean; currentViewers: number; totalStreams: number } | null>(null);
  const [docs, setDocs] = useState<{ totalDocs: number } | null>(null);
  const [systemHealth, setSystemHealth] = useState<{ serverStatus: string; errorLogs: { id: string; message: string }[] } | null>(null);
  const [localization, setLocalization] = useState<DocumentsByLanguageResponseDto | null>(null);
  const [feedback, setFeedback] = useState<UserMessageResponseDto[]>([]);

  useEffect(() => {
    fetchSermonStats().then(setSermonStats);
    fetchEvents().then(setEvents);
    fetchNewsletterStats().then(setNewsletter);
    fetchStreamingStats().then(setStreaming);
    fetchDocumentStats().then(setDocs);
    fetchSystemHealth().then(setSystemHealth);
    fetchLocalizationStats().then(setLocalization);
    fetchFeedback().then(setFeedback);
  }, []);

  // Stat cards for the grid
  const statCards = [
    {
      title: "Sermons",
      value: sermonStats?.total ?? 0,
      change: "+5%",
      increasing: true,
      color: "bg-primary-100 text-primary-700",
      icon: Mic,
    },
    {
      title: "Documents",
      value: docs?.totalDocs ?? 0,
      change: "+2%",
      increasing: true,
      color: "bg-blue-100 text-blue-700",
      icon: Book,
    },
    {
      title: "Abonnés Newsletter",
      value: newsletter?.subscribers ?? 0,
      change: "+1%",
      increasing: true,
      color: "bg-green-100 text-green-700",
      icon: Users,
    },
    {
      title: "Streams",
      value: streaming?.totalStreams ?? 0,
      change: streaming?.online ? "+3%" : "0%",
      increasing: !!streaming?.online,
      color: "bg-orange-100 text-orange-700",
      icon: PlayCircle,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-neutral-800">Tableau de Bord</h1>
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 mb-4">
        <a
          href="/admin/sermons/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg shadow hover:bg-primary-700 transition-colors"
        >
          <PlayCircle size={18} />
          Nouveau Sermon
        </a>
        <a
          href="/admin/events/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
        >
          <Users size={18} />
          Nouvel Événement
        </a>
        <a
          href="/admin/documents/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-colors"
        >
          <Book size={18} />
          Nouveau Document
        </a>
        <a
          href="/admin/newsletter"
          className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition-colors"
        >
          <Globe size={18} />
          Newsletter
        </a>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-neutral-500">{stat.title}</p>
                <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
                <div className="flex items-center mt-2">
                  {stat.increasing ? (
                    <ArrowUp size={16} className="text-green-500 mr-1" />
                  ) : stat.change !== '0%' ? (
                    <ArrowDown size={16} className="text-red-500 mr-1" />
                  ) : null}
                  <span className={stat.increasing ? 'text-green-500' : stat.change === '0%' ? 'text-neutral-500' : 'text-red-500'}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Recent Sermons */}
        <div className="bg-white rounded-lg shadow-sm lg:col-span-2">
          <div className="p-6 border-b border-neutral-200">
            <h2 className="text-lg font-bold">Sermons Récents</h2>
            {sermonStats && (
              <div className="mt-2 flex flex-wrap gap-4 text-sm text-neutral-600">
                <div>
                  <span className="font-medium">Total Sermons:</span> {sermonStats.total}
                </div>
                <div>
                  <span className="font-medium">Par Type:</span>
                  <span className="ml-2">
                    <Video size={16} className="inline text-primary-500 mr-1" />
                    {sermonStats.byType.video}
                  </span>
                  <span className="ml-2">
                    <Mic size={16} className="inline text-primary-500 mr-1" />
                    {sermonStats.byType.audio}
                  </span>
                  <span className="ml-2">
                    <FileText size={16} className="inline text-primary-500 mr-1" />
                    {sermonStats.byType.text}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left pb-3 font-medium text-neutral-500">Titre</th>
                  <th className="text-left pb-3 font-medium text-neutral-500 hidden md:table-cell">Prédicateur</th>
                  <th className="text-left pb-3 font-medium text-neutral-500">Date</th>
                  <th className="text-right pb-3 font-medium text-neutral-500">Type</th>
                </tr>
              </thead>
              <tbody>
                {sermonStats?.recent.map((sermon) => (
                  <tr key={sermon.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="py-4 font-medium">{sermon.title}</td>
                    <td className="py-4 text-neutral-600 hidden md:table-cell">{sermon.preacher}</td>
                    <td className="py-4 text-neutral-600">
                      {format(new Date(sermon.date), 'dd MMM', { locale: fr })}
                    </td>
                    <td className="py-4 text-right text-neutral-600">
                      {sermon.type === MediaType.VIDEO && <Video size={18} className="inline mr-1 text-primary-500" />}
                      {sermon.type === MediaType.AUDIO && <Mic size={18} className="inline mr-1 text-primary-500" />}
                      {sermon.type === MediaType.TEXT && <FileText size={18} className="inline mr-1 text-primary-500" />}
                      <span className="capitalize">{sermon.type}</span>
                    </td>
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
                      {format(new Date(event.date), 'MMM', { locale: fr })}
                    </span>
                    <span className="block text-lg font-bold">
                      {format(new Date(event.date), 'dd')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-sm text-neutral-500">
                      {format(new Date(event.date), 'HH:mm')} • {event.location}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-neutral-200">
            <h2 className="text-lg font-bold">Newsletter</h2>
          </div>
          <div className="p-6">
            {newsletter ? (
              <div className="flex flex-col items-center gap-4">
                <div className="bg-orange-100 text-orange-700 rounded-lg p-3 text-center flex-shrink-0 w-full">
                  <Globe size={28} className="mx-auto mb-1" />
                  <span className="block text-lg font-bold">{newsletter.subscribers}</span>
                  <span className="block text-xs">abonnés</span>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-neutral-700 font-medium">Nombre d'abonnés à la newsletter</p>
                  <a
                    href="/admin/newsletter"
                    className="inline-block mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition-colors text-sm"
                  >
                    Gérer la Newsletter
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-neutral-500">Chargement…</div>
            )}
          </div>
        </div>  
      </div>

      {/* Document Management */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold mb-6">Gestion des Documents</h2>
        {docs && <div className="text-lg">Total Uploaded Documents: <span className="font-bold">{docs.totalDocs}</span></div>}
      </div>

      {/* System Health */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold mb-6">Santé du Système</h2>
        {systemHealth && (
          <div>
            <div className="mb-2">Server Status: <span className="font-bold">{systemHealth.serverStatus}</span></div>
            <div>
              <strong>Error Logs:</strong>
              <ul className="list-disc ml-6 mt-2 text-sm text-neutral-600">
                {systemHealth.errorLogs.map((log) => (
                  <li key={log.id}>{log.message}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Localization/Language Stats */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold mb-6">Statistiques de Localisation</h2>
        {localization && (
          <div className="flex flex-wrap gap-4">
            {localization.data.map((lang) => (
              <div key={lang.languageId} className="bg-neutral-50 rounded-lg p-4 flex-1 min-w-[120px]">
                <span className="block text-sm text-neutral-600">{lang.languageId.toUpperCase()}</span>
                <span className="block text-2xl font-bold">{lang.documentsNumber}</span>
                <span className="block text-xs text-neutral-500">documents</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Feedback / Support */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold mb-6">Feedback / Support</h2>
        <ul className="divide-y divide-neutral-200">
          {feedback.map((f) => (
            <li key={f.id} className="py-3">
              <strong>{f.username}:</strong> <span className="text-neutral-700">{f.message}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashBoard;