import PageHeader from '../components/ui/PageHeader';
import { Radio, Play, Pause, Volume2 } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';

const WebRadioPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { t } = useTranslation();

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <PageHeader 
        title={t('nav.webradio')}
        subtitle={t('webradio.subtitle')}
        backgroundImage="https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg"
      />
      
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Radio Player Card */}
            <div className="bg-white rounded-lg shadow-xl p-8 mb-12">
              <div className="text-center">
                <Radio size={64} className="text-primary-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">{t('webradio.titleCard')}</h2>
                <p className="text-neutral-600 mb-8">
                  {t('webradio.descriptionCard')}
                </p>
                
                {/* Player Controls */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <button
                    onClick={togglePlay}
                    className="btn-primary flex items-center gap-2 text-lg px-8 py-4"
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    {isPlaying ? 'Pause' : 'Écouter'}
                  </button>
                  <Volume2 size={24} className="text-neutral-500" />
                </div>
                
                {/* Now Playing */}
                <div className="bg-neutral-50 rounded-lg p-4">
                  <p className="text-sm text-neutral-600 mb-1">En cours de diffusion</p>
                  <p className="font-semibold">Messages d'enseignement spirituel</p>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6">{t('webradio.schedule.title')}</h3>
              <div className="space-y-4">
                {t('webradio.schedule.scheduleInfo').map((schedule: any, index: number) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-neutral-50 rounded-lg">
                    <span className="font-medium">{schedule.day}</span>
                    <span className="text-neutral-600">{schedule.content}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebRadioPage;