import { useEffect } from "react";
import PageHeader from "../components/ui/PageHeader";
import { useTranslation } from "../hooks/useTranslation";
// import { useLanguageStore as useUILanguageStore } from "../stores/useUILanguageStore";
import EventCard from "../components/events/EventCard";
import { motion } from "framer-motion";
import { EventSummaryDto } from "../api/types/documents/documents";

interface EventsStore {
  events: EventSummaryDto[];
  loading: boolean;
  error?: string;
  hasFetched: boolean;
  fetchEvents: () => Promise<void>;
}

interface Props {
  store: EventsStore
}

const EventsPage: React.FC<Props> = ({ store }) => {

  const { events, loading, error, fetchEvents } = store;
  // const { currentLanguage } = useUILanguageStore();
  const { t } = useTranslation();

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <PageHeader 
        title={t('nav.events')}
        subtitle={t('events.subtitle')}
        backgroundImage="https://images.pexels.com/photos/533982/pexels-photo-533982.jpeg"
      />
      
      <section className="py-16">
        <div className="container-custom">
          {loading ? (
            <div className="flex justify-center">
              <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-center text-error">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <EventCard 
                    event={{
                      ...event,
                      title: event.title || '',
                      description: event.description || '',
                    }}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default EventsPage;