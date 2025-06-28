import PageHeader from '../components/ui/PageHeader';
import { Tv, Play, Pause, Volume2 } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';

const WebTVPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLive,] = useState<boolean | null>(null);
  const { t } = useTranslation();

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const getLiveStatus = () => {
    if (isLive === null) return t('webtv.statusLiveNull');
    if (isLive === false) return t('webtv.statusLiveFalse');
    return 'En direct maintenant';
  };

  return (
    <div>
      <PageHeader 
        title={t('nav.webtv')}
        subtitle={t('webtv.subtitle')}
        backgroundImage="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg"
      />
      
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* TV Player Card */}
            <div className="bg-white rounded-lg shadow-xl p-8 mb-12">
              <div className="text-center">
                <Tv size={64} className="text-primary-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">{t('webtv.titleCard')}</h2>
                <p className="text-neutral-600 mb-8">
                  {t('webtv.descriptionCard')}
                </p>
                
                {/* Video Player Placeholder */}
                <div className="bg-neutral-900 rounded-lg aspect-video mb-6 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Tv size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-lg">{getLiveStatus()}</p>
                  </div>
                </div>
                
                {/* Player Controls */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <button
                    onClick={togglePlay}
                    className="btn-primary flex items-center gap-2 text-lg px-8 py-4"
                    disabled={isLive === false}
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    {isPlaying ? 'Pause' : 'Regarder'}
                  </button>
                  <Volume2 size={24} className="text-neutral-500" />
                </div>
                
                {/* Live Status */}
                <div className="bg-neutral-50 rounded-lg p-4">
                  <div className="flex items-center justify-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-red-500' : 'bg-neutral-400'}`}></div>
                    <p className="font-semibold">{getLiveStatus()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6">{t('webtv.schedule.title')}</h3>
              <div className="space-y-4">
                {t('webtv.schedule.scheduleInfo').map((schedule: any, index: number) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-neutral-50 rounded-lg">
                    <span className="font-medium">{schedule.day}</span>
                    <span className="text-neutral-600">{schedule.content}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Events */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6">{t('webtv.specialEvent.title')}</h3>
              <div className="text-center text-neutral-600">
                <p>Aucun événement spécial programmé pour le moment.</p>
                <p className="mt-2">Restez connectés pour les prochaines annonces.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebTVPage;