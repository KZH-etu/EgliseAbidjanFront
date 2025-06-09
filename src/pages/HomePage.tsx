import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { useTranslation } from "../hooks/useTranslation";
import { Link } from "react-router-dom";

const videos = [
  {
    url: "https://static.s123-cdn-static-d.com/uploads/8356083/normal_64c6efbd7559b.mp4",
    titleByLang: {
      fr: "Culte du dimanche",
      en: "Sunday Service",
      es: "Servicio Dominical"
    }
  },
  {
    url: "https://static.s123-cdn-static-d.com/uploads/8356083/normal_64c6efe7b6441.mp4",
    titleByLang: {
      fr: "Étude biblique",
      en: "Bible Study",
      es: "Estudio Bíblico"
    }
  },
  {
    url: "https://static.s123-cdn-static-d.com/uploads/8356083/normal_64c8d304a59fd.mp4",
    titleByLang: {
      fr: "Prière et adoration",
      en: "Prayer and Worship",
      es: "Oración y Adoración"
    }
  }
];

const HomePage = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section with Video Carousel */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-neutral-900">
          <div className="absolute inset-0 bg-neutral-900/60 z-20"></div>
          {videos.map((video, index) => (
            <motion.div
              key={video.url}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: currentVideo === index ? 1 : 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                playsInline
                loop
              >
                <source src={video.url} type="video/mp4" />
              </video>
            </motion.div>
          ))}
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentVideo(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentVideo ? 'bg-white w-4' : 'bg-white/50'
              }`}
            ></button>
          ))}
        </div>
        
        <div className="container-custom relative z-30 px-4 flex h-full items-center">
          <div className="ml-auto max-w-lg text-right">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t('home.hero.title')}
            </motion.h1>
            
            <motion.p 
              className="text-2xl md:text-3xl max-w-3xl mb-8 text-white"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t('home.hero.subtitle')}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-end gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link to="/about" className="btn-primary">
                {t('common.readMore')}
              </Link>
              <Link to="/sermons/video" className="btn-outline border-white text-white hover:bg-white/10">
                {t('home.hero.discoverSermons')}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;