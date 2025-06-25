import React, { useEffect, useState } from "react";
import { DocumentsByLanguageResponse, SermonStats, UserMessageResponse } from "../../types/dashboard";
import { MediaType } from "../../types/api";
import { DocumentCard } from "../../types/api";

// Mocked data fetching functions using new models
const fetchSermonStats = async (): Promise<SermonStats> => ({
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

const fetchEvents = async (): Promise<DocumentCard[]> => [
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

const fetchLocalizationStats = async (): Promise<DocumentsByLanguageResponse> => ({
  data: [
    { languageId: "en", documentsNumber: 80 },
    { languageId: "fr", documentsNumber: 30 },
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
  const [events, setEvents] = useState<DocumentCard[]>([]);
  const [newsletter, setNewsletter] = useState<{ subscribers: number } | null>(null);
  const [streaming, setStreaming] = useState<{ online: boolean; currentViewers: number; totalStreams: number } | null>(null);
  const [docs, setDocs] = useState<{ totalDocs: number } | null>(null);
  const [systemHealth, setSystemHealth] = useState<{ serverStatus: string; errorLogs: { id: string; message: string }[] } | null>(null);
  const [localization, setLocalization] = useState<DocumentsByLanguageResponse | null>(null);
  const [feedback, setFeedback] = useState<UserMessageResponse[]>([]);

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

  return (
    <div style={{ padding: 24 }}>
      <h1>Admin Dashboard</h1>
      {/* Quick Actions */}
      <section style={{ marginBottom: 24 }}>
        <h2>Quick Actions</h2>
        <button>Add Sermon</button>
        <button>Add Event</button>
        <button>Add Document</button>
      </section>

      {/* Sermons */}
      <section style={{ marginBottom: 24 }}>
        <h2>Sermons</h2>
        {sermonStats && (
          <div>
            <div>Total Sermons: {sermonStats.total}</div>
            <div>
              By Type: Video {sermonStats.byType.video}, Audio {sermonStats.byType.audio}, Text {sermonStats.byType.text}
            </div>
            <div>
              <strong>Recent Sermons:</strong>
              <ul>
                {sermonStats.recent.map((s) => (
                  <li key={s.id}>
                    {s.title} ({s.type}) <button>Edit</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>

      {/* Events */}
      <section style={{ marginBottom: 24 }}>
        <h2>Upcoming Events</h2>
        <ul>
          {events.map((e) => (
            <li key={e.id}>
              {e.title} - {e.date}
            </li>
          ))}
        </ul>
      </section>

      {/* Newsletter */}
      <section style={{ marginBottom: 24 }}>
        <h2>Newsletter</h2>
        {newsletter && <div>Subscribers: {newsletter.subscribers}</div>}
      </section>

      {/* Streaming Stats */}
      <section style={{ marginBottom: 24 }}>
        <h2>Streaming Stats</h2>
        {streaming ? (
          streaming.online ? (
            <div>
              <div>Current Viewers: {streaming.currentViewers}</div>
              <div>Total Streams Broadcasted: {streaming.totalStreams}</div>
            </div>
          ) : (
            <div>Stream is currently <strong>offline</strong>.</div>
          )
        ) : (
          <div>Loading...</div>
        )}
      </section>

      {/* Document Management */}
      <section style={{ marginBottom: 24 }}>
        <h2>Document Management</h2>
        {docs && <div>Total Uploaded Documents: {docs.totalDocs}</div>}
      </section>

      {/* System Health */}
      <section style={{ marginBottom: 24 }}>
        <h2>System Health</h2>
        {systemHealth && (
          <div>
            <div>Server Status: {systemHealth.serverStatus}</div>
            <div>
              <strong>Error Logs:</strong>
              <ul>
                {systemHealth.errorLogs.map((log) => (
                  <li key={log.id}>{log.message}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>

      {/* Localization/Language Stats */}
      <section style={{ marginBottom: 24 }}>
        <h2>Localization / Language Stats</h2>
        {localization && (
          <div>
            {localization.data.map((lang) => (
              <div key={lang.languageId}>
                {lang.languageId.toUpperCase()}: {lang.documentsNumber} items
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Feedback / Support */}
      <section style={{ marginBottom: 24 }}>
        <h2>Feedback / Support</h2>
        <ul>
          {feedback.map((f) => (
            <li key={f.id}>
              <strong>{f.username}:</strong> {f.message}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default DashBoard;