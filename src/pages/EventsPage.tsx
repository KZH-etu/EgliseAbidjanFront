import { useEffect } from "react";
import PageHeader from "../components/ui/PageHeader";
import { useTranslation } from "../hooks/useTranslation";
// import { useLanguageStore as useUILanguageStore } from "../stores/useUILanguageStore";
import { motion } from "framer-motion";
import { useDocuments } from "../hooks/useDocuments";


const EventsPage = () => {

  const { events, loadingEvents, errorEvents, loadEvents } = useDocuments();
  // const { currentLanguage } = useUILanguageStore();
  const { t } = useTranslation();

  useEffect(() => {
    loadEvents();
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
          {loadingEvents ? (
            <div className="flex justify-center">
              <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin"></div>
            </div>
          ) : errorEvents ? (
            <div className="text-center text-error">{errorEvents}</div>
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