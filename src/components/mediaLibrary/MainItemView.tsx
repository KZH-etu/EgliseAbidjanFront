import { MediaLibraryItemView } from "../../types/api";
import { Play, Download, FileText, Calendar, MapPin, User, Tag, Globe } from "lucide-react";
import { formatDate } from "../../utils/formatters";

type MainViewProps = {
  type: "audio" | "video" | "text";
  data: MediaLibraryItemView;
};

export default function MainItemView({ type, data }: MainViewProps) {
  const getMediaIcon = () => {
    switch (type) {
      case 'audio': return <Play size={24} className="text-green-500" />;
      case 'video': return <Play size={24} className="text-red-500" />;
      case 'text': return <FileText size={24} className="text-blue-500" />;
    }
  };

  const getMediaColor = () => {
    switch (type) {
      case 'audio': return 'green';
      case 'video': return 'red';
      case 'text': return 'blue';
    }
  };

  const color = getMediaColor();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className={`bg-${color}-50 border-b border-${color}-100 p-6`}>
        <div className="flex items-start gap-4">
          <div className={`p-3 bg-${color}-100 rounded-lg`}>
            {getMediaIcon()}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">{data.title}</h1>
            <div className="flex items-center gap-4 text-sm text-neutral-600">
              <span className={`px-3 py-1 bg-${color}-100 text-${color}-700 rounded-full font-medium uppercase tracking-wide`}>
                {type}
              </span>
              {data.availableLanguages.length > 0 && (
                <div className="flex items-center gap-1">
                  <Globe size={14} />
                  <span>{data.availableLanguages.map(l => l.name).join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Media Player/Viewer */}
      <div className="p-6 border-b border-neutral-200">
        {type === "audio" && data.mediaUrl && (
          <div className="space-y-4">
            <audio 
              controls 
              src={data.mediaUrl} 
              className="w-full"
              style={{ height: '54px' }}
            />
            <div className="flex gap-2">
              <button className={`btn-primary bg-${color}-500 hover:bg-${color}-600`}>
                <Play size={16} className="mr-2" />
                Écouter
              </button>
              <button className="btn-outline">
                <Download size={16} className="mr-2" />
                Télécharger
              </button>
            </div>
          </div>
        )}

        {type === "video" && data.mediaUrl && (
          <div className="space-y-4">
            <video 
              controls 
              src={data.mediaUrl} 
              className="w-full rounded-lg"
              style={{ maxHeight: '400px' }}
            />
            <div className="flex gap-2">
              <button className={`btn-primary bg-${color}-500 hover:bg-${color}-600`}>
                <Play size={16} className="mr-2" />
                Regarder
              </button>
              <button className="btn-outline">
                <Download size={16} className="mr-2" />
                Télécharger
              </button>
            </div>
          </div>
        )}

        {type === "text" && data.mediaUrl && (
          <div className="space-y-4">
            <div className="border border-neutral-200 rounded-lg overflow-hidden">
              <iframe
                src={data.mediaUrl}
                title="Document"
                className="w-full h-96"
              />
            </div>
            <div className="flex gap-2">
              <button className={`btn-primary bg-${color}-500 hover:bg-${color}-600`}>
                <FileText size={16} className="mr-2" />
                Lire en ligne
              </button>
              <button className="btn-outline">
                <Download size={16} className="mr-2" />
                Télécharger PDF
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Description */}
        {data.description && (
          <div>
            <h3 className="text-lg font-semibold mb-3 text-neutral-900">Description</h3>
            <p className="text-neutral-700 leading-relaxed">{data.description}</p>
          </div>
        )}

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sermon Metadata */}
          {data.sermonMeta && (
            <div className="bg-neutral-50 rounded-lg p-4">
              <h4 className="font-semibold text-neutral-900 mb-3 flex items-center">
                <User size={18} className="mr-2 text-neutral-600" />
                Détails du Sermon
              </h4>
              <div className="space-y-2 text-sm">
                {data.sermonMeta.preacher && (
                  <div className="flex items-center">
                    <span className="font-medium text-neutral-600 w-20">Prédicateur:</span>
                    <span className="text-neutral-800">{data.sermonMeta.preacher}</span>
                  </div>
                )}
                {data.sermonMeta.preachedAt && (
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1 text-neutral-500" />
                    <span className="font-medium text-neutral-600 w-16">Date:</span>
                    <span className="text-neutral-800">{formatDate(data.sermonMeta.preachedAt)}</span>
                  </div>
                )}
                {data.sermonMeta.location && (
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-1 text-neutral-500" />
                    <span className="font-medium text-neutral-600 w-16">Lieu:</span>
                    <span className="text-neutral-800">{data.sermonMeta.location}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Event Metadata */}
          {data.eventMeta && (
            <div className="bg-neutral-50 rounded-lg p-4">
              <h4 className="font-semibold text-neutral-900 mb-3 flex items-center">
                <Calendar size={18} className="mr-2 text-neutral-600" />
                Détails de l'Événement
              </h4>
              <div className="space-y-2 text-sm">
                {data.eventMeta.type && (
                  <div className="flex items-center">
                    <span className="font-medium text-neutral-600 w-16">Type:</span>
                    <span className="text-neutral-800">{data.eventMeta.type}</span>
                  </div>
                )}
                {data.eventMeta.startTime && (
                  <div className="flex items-center">
                    <span className="font-medium text-neutral-600 w-16">Début:</span>
                    <span className="text-neutral-800">{new Date(data.eventMeta.startTime).toLocaleString()}</span>
                  </div>
                )}
                {data.eventMeta.endTime && (
                  <div className="flex items-center">
                    <span className="font-medium text-neutral-600 w-16">Fin:</span>
                    <span className="text-neutral-800">{new Date(data.eventMeta.endTime).toLocaleString()}</span>
                  </div>
                )}
                {data.eventMeta.location && (
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-1 text-neutral-500" />
                    <span className="font-medium text-neutral-600 w-16">Lieu:</span>
                    <span className="text-neutral-800">{data.eventMeta.location}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Book Metadata */}
          {data.bookMeta && (
            <div className="bg-neutral-50 rounded-lg p-4">
              <h4 className="font-semibold text-neutral-900 mb-3 flex items-center">
                <FileText size={18} className="mr-2 text-neutral-600" />
                Détails du Livre
              </h4>
              <div className="space-y-2 text-sm">
                {data.bookMeta.author && (
                  <div className="flex items-center">
                    <span className="font-medium text-neutral-600 w-20">Auteur:</span>
                    <span className="text-neutral-800">{data.bookMeta.author}</span>
                  </div>
                )}
                {data.bookMeta.publisher && (
                  <div className="flex items-center">
                    <span className="font-medium text-neutral-600 w-20">Éditeur:</span>
                    <span className="text-neutral-800">{data.bookMeta.publisher}</span>
                  </div>
                )}
                {data.bookMeta.publishedAt && (
                  <div className="flex items-center">
                    <span className="font-medium text-neutral-600 w-20">Publié:</span>
                    <span className="text-neutral-800">{formatDate(data.bookMeta.publishedAt)}</span>
                  </div>
                )}
                {data.bookMeta.isbn && (
                  <div className="flex items-center">
                    <span className="font-medium text-neutral-600 w-20">ISBN:</span>
                    <span className="text-neutral-800">{data.bookMeta.isbn}</span>
                  </div>
                )}
                {data.bookMeta.pageCount && (
                  <div className="flex items-center">
                    <span className="font-medium text-neutral-600 w-20">Pages:</span>
                    <span className="text-neutral-800">{data.bookMeta.pageCount}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Tags */}
        {data.tags && data.tags.length > 0 && (
          <div>
            <h4 className="font-semibold text-neutral-900 mb-3 flex items-center">
              <Tag size={18} className="mr-2 text-neutral-600" />
              Tags
            </h4>
            <div className="flex flex-wrap gap-2">
              {data.tags.map((tag) => (
                <span
                  key={tag.id}
                  className={`px-3 py-1 bg-${color}-100 text-${color}-700 rounded-full text-sm font-medium`}
                >
                  {tag.title || tag.id}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}