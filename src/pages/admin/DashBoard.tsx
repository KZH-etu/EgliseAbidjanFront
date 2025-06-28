import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  FileText, 
  Calendar, 
  Tv, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Globe,
  MessageSquare,
  Activity
} from "lucide-react";
import { DocumentsByLanguageResponse, SermonStats, UserMessageResponse } from "../../types/dashboard";
import { DocumentCategory, EventCardData, EventType } from "../../types/api";
import EventCard from "../../components/shared/cards/EventCard";

// Enhanced mocked data fetching functions
const fetchSermonStats = async (): Promise<SermonStats> => ({
  total: 120,
  byType: { video: 60, audio: 40, text: 20 },
  recent: [
    {
      id: "1",
      title: "Faith in Action",
      categories: [DocumentCategory.SERMON],
      sermonMeta: {
        preacher: "John Doe",
        preachedAt: new Date("2025-06-10"),
        location: "Main Sanctuary"
      }
    },
    {
      id: "2",
      title: "Hope and Healing",
      categories: [DocumentCategory.SERMON],
      sermonMeta: {
        preacher: "Jane Smith",
        preachedAt: new Date("2025-06-12"),
        location: "Chapel"
      }
    },
    {
      id: "3",
      title: "Walking in Faith",
      categories: [DocumentCategory.SERMON],
      sermonMeta: {
        preacher: "Pastor Mark",
        preachedAt: new Date("2025-06-15"),
        location: "Main Sanctuary"
      }
    }
  ]
});

const fetchEvents = async (): Promise<EventCardData[]> => [
  {
    id: "1",
    title: "Sunday Service",
    categories: [DocumentCategory.EVENT],
    eventMeta: {
      type: EventType.CONVENTION,
      startTime: new Date("2025-06-22T10:00:00"),
      endTime: new Date("2025-06-22T12:00:00"),
      location: "Main Hall"
    }
  },
  {
    id: "2",
    title: "Youth Meeting",
    categories: [DocumentCategory.EVENT],
    eventMeta: {
      type: EventType.SEMINAR,
      startTime: new Date("2025-06-24T18:00:00"),
      endTime: new Date("2025-06-24T20:00:00"),
      location: "Youth Center"
    }
  }
];

const fetchNewsletterStats = async (): Promise<{ subscribers: number }> => ({ subscribers: 350 });

const fetchStreamingStats = async (): Promise<{ online: boolean; currentViewers: number; totalStreams: number }> => ({
  online: true,
  currentViewers: 42,
  totalStreams: 15,
});

const fetchDocumentStats = async (): Promise<{ totalDocs: number }> => ({ totalDocs: 87 });

const fetchSystemHealth = async (): Promise<{
  serverStatus: string;
  errorLogs: { id: string; message: string; type: 'warning' | 'error' | 'info' }[];
}> => ({
  serverStatus: "Online",
  errorLogs: [
    { id: "1", message: "Disk space at 80%", type: 'warning' },
    { id: "2", message: "All systems operational", type: 'info' },
  ],
});

const fetchLocalizationStats = async (): Promise<DocumentsByLanguageResponse> => ({
  data: [
    { languageId: "fr", documentsNumber: 80 },
    { languageId: "en", documentsNumber: 30 },
    { languageId: "es", documentsNumber: 10 }
  ]
});

const fetchFeedback = async (): Promise<UserMessageResponse[]> => [
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
  const [sermonStats, setSermonStats] = useState<SermonStats | null>(null);
  const [events, setEvents] = useState<EventCardData[]>([]);
  const [newsletter, setNewsletter] = useState<{ subscribers: number } | null>(null);
  const [streaming, setStreaming] = useState<{ online: boolean; currentViewers: number; totalStreams: number } | null>(null);
  const [docs, setDocs] = useState<{ totalDocs: number } | null>(null);
  const [systemHealth, setSystemHealth] = useState<{ serverStatus: string; errorLogs: { id: string; message: string; type: 'warning' | 'error' | 'info' }[] } | null>(null);
  const [localization, setLocalization] = useState<DocumentsByLanguageResponse | null>(null);
  const [feedback, setFeedback] = useState<UserMessageResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [
          sermonData,
          eventsData,
          newsletterData,
          streamingData,
          docsData,
          healthData,
          localizationData,
          feedbackData
        ] = await Promise.all([
          fetchSermonStats(),
          fetchEvents(),
          fetchNewsletterStats(),
          fetchStreamingStats(),
          fetchDocumentStats(),
          fetchSystemHealth(),
          fetchLocalizationStats(),
          fetchFeedback()
        ]);

        setSermonStats(sermonData);
        setEvents(eventsData);
        setNewsletter(newsletterData);
        setStreaming(streamingData);
        setDocs(docsData);
        setSystemHealth(healthData);
        setLocalization(localizationData);
        setFeedback(feedbackData);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 bg-neutral-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Tableau de Bord</h1>
        <p className="text-neutral-600">Vue d'ensemble de votre système de gestion</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Documents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Documents</p>
              <p className="text-3xl font-bold text-neutral-900">{docs?.totalDocs || 0}</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp size={14} className="mr-1" />
                +12% ce mois
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <FileText size={24} className="text-blue-600" />
            </div>
          </div>
        </motion.div>

        {/* Total Sermons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Sermons</p>
              <p className="text-3xl font-bold text-neutral-900">{sermonStats?.total || 0}</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp size={14} className="mr-1" />
                +8% ce mois
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Activity size={24} className="text-green-600" />
            </div>
          </div>
        </motion.div>

        {/* Newsletter Subscribers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Abonnés</p>
              <p className="text-3xl font-bold text-neutral-900">{newsletter?.subscribers || 0}</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp size={14} className="mr-1" />
                +15% ce mois
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Users size={24} className="text-purple-600" />
            </div>
          </div>
        </motion.div>

        {/* Current Viewers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Spectateurs</p>
              <p className="text-3xl font-bold text-neutral-900">{streaming?.currentViewers || 0}</p>
              <p className="text-sm text-neutral-600 flex items-center mt-1">
                <div className={`w-2 h-2 rounded-full mr-2 ${streaming?.online ? 'bg-green-500' : 'bg-red-500'}`}></div>
                {streaming?.online ? 'En ligne' : 'Hors ligne'}
              </p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <Tv size={24} className="text-red-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Sermons Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-xl font-bold text-neutral-900 mb-6">Aperçu des Sermons</h2>
            
            {sermonStats && (
              <div className="space-y-6">
                {/* Type Distribution */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{sermonStats.byType.video}</p>
                    <p className="text-sm text-blue-600">Vidéos</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{sermonStats.byType.audio}</p>
                    <p className="text-sm text-green-600">Audio</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">{sermonStats.byType.text}</p>
                    <p className="text-sm text-purple-600">Textes</p>
                  </div>
                </div>

                {/* Recent Sermons */}
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-3">Sermons Récents</h3>
                  <div className="space-y-3">
                    {sermonStats.recent.map((sermon) => (
                      <div key={sermon.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Activity size={16} className="text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-neutral-900">{sermon.title}</p>
                            <p className="text-sm text-neutral-600">{sermon.sermonMeta.preacher}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-neutral-500">
                            {new Date(sermon.sermonMeta.preachedAt).toLocaleDateString()}
                          </span>
                          <p className="text-xs text-neutral-400">{sermon.sermonMeta.location}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-xl font-bold text-neutral-900 mb-6">Événements à Venir</h2>
            <div className="space-y-3">
              {events.map((event) => (
                <EventCard key={event.id} data={event} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* System Health */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-xl font-bold text-neutral-900 mb-6">État du Système</h2>
            
            {systemHealth && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-500" />
                  <span className="font-medium text-neutral-900">Serveur: {systemHealth.serverStatus}</span>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-neutral-900">Journaux</h4>
                  {systemHealth.errorLogs.map((log) => (
                    <div key={log.id} className="flex items-center gap-2 text-sm">
                      {log.type === 'warning' ? (
                        <AlertCircle size={14} className="text-yellow-500" />
                      ) : log.type === 'error' ? (
                        <AlertCircle size={14} className="text-red-500" />
                      ) : (
                        <CheckCircle size={14} className="text-green-500" />
                      )}
                      <span className="text-neutral-600">{log.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Language Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-xl font-bold text-neutral-900 mb-6">Répartition par Langue</h2>
            
            {localization && (
              <div className="space-y-3">
                {localization.data.map((lang) => (
                  <div key={lang.languageId} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe size={16} className="text-neutral-500" />
                      <span className="font-medium text-neutral-900">{lang.languageId.toUpperCase()}</span>
                    </div>
                    <span className="text-neutral-600">{lang.documentsNumber} documents</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Recent Feedback */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-xl font-bold text-neutral-900 mb-6">Commentaires Récents</h2>
            
            <div className="space-y-4">
              {feedback.map((item) => (
                <div key={item.id} className="p-3 bg-neutral-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare size={14} className="text-neutral-500" />
                    <span className="font-medium text-neutral-900">{item.username}</span>
                    <span className="text-xs text-neutral-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600">{item.message}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <h2 className="text-xl font-bold text-neutral-900 mb-6">Actions Rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="btn-primary flex items-center justify-center gap-2 py-3">
            <FileText size={18} />
            Ajouter un Document
          </button>
          <button className="btn-primary flex items-center justify-center gap-2 py-3">
            <Calendar size={18} />
            Créer un Événement
          </button>
          <button className="btn-primary flex items-center justify-center gap-2 py-3">
            <Activity size={18} />
            Nouveau Sermon
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DashBoard;