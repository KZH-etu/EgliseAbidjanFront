import { useEffect, useState } from "react";
import PageHeader from "../components/ui/PageHeader";
import EventCard from "../components/shared/cards/EventCard";
import { useTranslation } from "../hooks/useTranslation";
import { useUpcomingEvents } from "../hooks/useUpcomingEvents";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Star } from "lucide-react";

const EventsPage = () => {
  const { events, loading, error } = useUpcomingEvents();
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Hero images that rotate
  const heroImages = [
    "https://images.pexels.com/photos/533982/pexels-photo-533982.jpeg",
    "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg",
    "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg"
  ];

  // Rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Get the next big event (furthest in the future)
  const nextBigEvent = events.find(event => 
    event.eventMeta.type === 'CONVENTION' || event.eventMeta.type === 'SEMINAR'
  );

  return (
    <div>
      <PageHeader 
        title={t('nav.events')}
        subtitle={t('events.subtitle')}
        backgroundImage={heroImages[currentImageIndex]}
      />

      {/* Hero Content Section */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Bible Verse */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <blockquote className="text-xl md:text-2xl font-serif text-neutral-800 mb-4">
                "Car là où deux ou trois sont assemblés en mon nom, je suis au milieu d'eux."
              </blockquote>
              <cite className="text-primary-600 font-medium">Matthieu 18:20</cite>
            </motion.div>

            {/* Next Big Event Highlight */}
            {nextBigEvent && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-lg shadow-xl p-8 border-l-4 border-primary-500"
              >
                <div className="flex items-center justify-center mb-4">
                  <Star size={24} className="text-primary-500 mr-2" />
                  <h2 className="text-2xl font-bold text-neutral-900">Prochain Grand Événement</h2>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-primary-600 mb-4">
                  {nextBigEvent.title}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg">
                  <div className="flex items-center justify-center gap-2 text-neutral-700">
                    <Calendar size={20} className="text-primary-500" />
                    <span className="font-semibold">
                      {new Date(nextBigEvent.eventMeta.startTime).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 text-neutral-700">
                    <Clock size={20} className="text-primary-500" />
                    <span className="font-semibold">
                      {new Date(nextBigEvent.eventMeta.startTime).toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  
                  {nextBigEvent.eventMeta.location && (
                    <div className="flex items-center justify-center gap-2 text-neutral-700">
                      <MapPin size={20} className="text-primary-500" />
                      <span className="font-semibold">{nextBigEvent.eventMeta.location}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
      
      {/* Events Grid Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tous nos Événements</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Découvrez tous nos événements à venir et rejoignez-nous pour des moments de communion et d'édification spirituelle.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-center text-error bg-error/10 p-8 rounded-lg">
              <p className="text-lg font-medium mb-2">Erreur de chargement</p>
              <p>{error}</p>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-16">
              <Calendar size={64} className="mx-auto text-neutral-400 mb-4" />
              <h3 className="text-xl font-medium text-neutral-600 mb-2">
                Aucun événement à venir
              </h3>
              <p className="text-neutral-500">
                Revenez bientôt pour découvrir nos prochains événements.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <EventCard 
                    data={event}
                    onClick={() => {
                      // Handle event click - could navigate to event details
                      console.log('Event clicked:', event.id);
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