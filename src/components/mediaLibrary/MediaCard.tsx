import React from 'react';
import { MediaCard, BasicMediaCard, isTextMediaCard, isAudioMediaCard, isVideoMediaCard } from '../../types/api';
import { Play, Download, FileText, Clock, User, MapPin, Calendar } from 'lucide-react';
import { formatDuration, formatFileSize, formatDate } from '../../utils/formatters';

interface MediaCardProps {
  card: MediaCard | BasicMediaCard;
  onClick: () => void;
  variant?: 'basic' | 'detailed';
}

const MediaCardComponent: React.FC<MediaCardProps> = ({ 
  card, 
  onClick, 
  variant = 'detailed' 
}) => {
  const isBasicCard = !('mediaUrl' in card);
  
  // Render basic card for mixed-type displays
  if (variant === 'basic' || isBasicCard) {
    return <BasicMediaCardComponent card={card as BasicMediaCard} onClick={onClick} />;
  }

  const mediaCard = card as MediaCard;

  // Render specific card based on media type
  if (isTextMediaCard(mediaCard)) {
    return <TextMediaCardComponent card={mediaCard} onClick={onClick} />;
  }
  
  if (isAudioMediaCard(mediaCard)) {
    return <AudioMediaCardComponent card={mediaCard} onClick={onClick} />;
  }
  
  if (isVideoMediaCard(mediaCard)) {
    return <VideoMediaCardComponent card={mediaCard} onClick={onClick} />;
  }

  return null;
};

// Basic Media Card Component (for mixed displays)
const BasicMediaCardComponent: React.FC<{ card: BasicMediaCard; onClick: () => void }> = ({ 
  card, 
  onClick 
}) => {
  const getMediaIcon = () => {
    switch (card.mediaType) {
      case 'TEXT': return <FileText size={20} className="text-blue-500" />;
      case 'AUDIO': return <Play size={20} className="text-green-500" />;
      case 'VIDEO': return <Play size={20} className="text-red-500" />;
      default: return <FileText size={20} className="text-gray-500" />;
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      {/* Thumbnail/Preview */}
      <div className="relative h-48 bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
        {card.thumbnailUrl ? (
          <img 
            src={card.thumbnailUrl} 
            alt={card.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center">
            {getMediaIcon()}
            <p className="text-xs text-neutral-500 mt-2 uppercase tracking-wide">
              {card.mediaType}
            </p>
          </div>
        )}
        
        {/* Duration overlay for audio/video */}
        {card.duration && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
            {formatDuration(card.duration)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{card.title}</h3>
        
        {card.description && (
          <p className="text-neutral-600 text-sm mb-3 line-clamp-2">{card.description}</p>
        )}

        {/* Metadata */}
        <div className="space-y-1 text-xs text-neutral-500">
          {card.primaryPerson && (
            <div className="flex items-center">
              <User size={12} className="mr-1" />
              <span>{card.primaryPerson}</span>
            </div>
          )}
          
          {card.location && (
            <div className="flex items-center">
              <MapPin size={12} className="mr-1" />
              <span>{card.location}</span>
            </div>
          )}
          
          {card.recordedAt && (
            <div className="flex items-center">
              <Calendar size={12} className="mr-1" />
              <span>{formatDate(card.recordedAt)}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-3">
          {card.tags.slice(0, 3).map((tag) => (
            <span
              key={tag.id}
              className="bg-neutral-100 text-neutral-600 text-xs px-2 py-1 rounded"
            >
              {tag.title || tag.id}
            </span>
          ))}
          {card.tags.length > 3 && (
            <span className="text-xs text-neutral-500">+{card.tags.length - 3}</span>
          )}
        </div>

        {/* Language */}
        <div className="mt-2 text-xs text-neutral-500">
          <span className="bg-neutral-200 px-2 py-1 rounded">{card.language.name}</span>
        </div>
      </div>
    </div>
  );
};

// Text Media Card Component
const TextMediaCardComponent: React.FC<{ card: import('../../types/api').TextMediaCard; onClick: () => void }> = ({ 
  card, 
  onClick 
}) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      {/* Header with document icon */}
      <div className="relative h-48 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <FileText size={48} className="text-blue-500 mx-auto mb-2" />
          <p className="text-sm text-blue-600 font-medium">DOCUMENT</p>
          {card.textMeta?.format && (
            <p className="text-xs text-blue-500">{card.textMeta.format}</p>
          )}
        </div>
        
        {/* Page count badge */}
        {card.pageCount && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
            {card.pageCount} pages
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{card.title}</h3>
        
        {card.description && (
          <p className="text-neutral-600 text-sm mb-3 line-clamp-2">{card.description}</p>
        )}

        {/* Author */}
        {card.author && (
          <div className="flex items-center text-sm text-neutral-700 mb-2">
            <User size={14} className="mr-1" />
            <span>{card.author}</span>
          </div>
        )}

        {/* Text metadata */}
        {card.textMeta && (
          <div className="bg-neutral-50 rounded p-2 mb-3 text-xs space-y-1">
            {card.textMeta.readingTime && (
              <div className="flex items-center">
                <Clock size={12} className="mr-1" />
                <span>{card.textMeta.readingTime} min read</span>
              </div>
            )}
            {card.textMeta.wordCount && (
              <div>
                <span>{card.textMeta.wordCount.toLocaleString()} words</span>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mb-3">
          <button className="flex-1 bg-blue-500 text-white text-sm py-2 px-3 rounded hover:bg-blue-600 transition-colors">
            <FileText size={14} className="inline mr-1" />
            Read
          </button>
          <button className="bg-neutral-200 text-neutral-700 text-sm py-2 px-3 rounded hover:bg-neutral-300 transition-colors">
            <Download size={14} />
          </button>
        </div>

        {/* Tags and Language */}
        <div className="flex flex-wrap gap-1 mb-2">
          {card.tags.slice(0, 2).map((tag) => (
            <span key={tag.id} className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
              {tag.title || tag.id}
            </span>
          ))}
        </div>
        
        <div className="text-xs text-neutral-500">
          <span className="bg-neutral-200 px-2 py-1 rounded">{card.language.name}</span>
        </div>
      </div>
    </div>
  );
};

// Audio Media Card Component
const AudioMediaCardComponent: React.FC<{ card: import('../../types/api').AudioMediaCard; onClick: () => void }> = ({ 
  card, 
  onClick 
}) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      {/* Audio visualization */}
      <div className="relative h-48 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <Play size={48} className="text-green-500 mx-auto mb-2" />
          <p className="text-sm text-green-600 font-medium">AUDIO</p>
          {card.audioMeta?.format && (
            <p className="text-xs text-green-500">{card.audioMeta.format}</p>
          )}
        </div>
        
        {/* Duration */}
        {card.duration && (
          <div className="absolute bottom-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
            {formatDuration(card.duration)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{card.title}</h3>
        
        {card.description && (
          <p className="text-neutral-600 text-sm mb-3 line-clamp-2">{card.description}</p>
        )}

        {/* Speaker/Preacher */}
        {(card.speaker || card.preacher) && (
          <div className="flex items-center text-sm text-neutral-700 mb-2">
            <User size={14} className="mr-1" />
            <span>{card.speaker || card.preacher}</span>
          </div>
        )}

        {/* Location and Date */}
        <div className="space-y-1 text-xs text-neutral-500 mb-3">
          {card.location && (
            <div className="flex items-center">
              <MapPin size={12} className="mr-1" />
              <span>{card.location}</span>
            </div>
          )}
          {card.recordedAt && (
            <div className="flex items-center">
              <Calendar size={12} className="mr-1" />
              <span>{formatDate(card.recordedAt)}</span>
            </div>
          )}
        </div>

        {/* Audio metadata */}
        {card.audioMeta && (
          <div className="bg-neutral-50 rounded p-2 mb-3 text-xs space-y-1">
            {card.audioMeta.quality && (
              <div>Quality: {card.audioMeta.quality}</div>
            )}
            {card.fileSize && (
              <div>Size: {formatFileSize(card.fileSize)}</div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mb-3">
          <button className="flex-1 bg-green-500 text-white text-sm py-2 px-3 rounded hover:bg-green-600 transition-colors">
            <Play size={14} className="inline mr-1" />
            Play
          </button>
          <button className="bg-neutral-200 text-neutral-700 text-sm py-2 px-3 rounded hover:bg-neutral-300 transition-colors">
            <Download size={14} />
          </button>
        </div>

        {/* Tags and Language */}
        <div className="flex flex-wrap gap-1 mb-2">
          {card.tags.slice(0, 2).map((tag) => (
            <span key={tag.id} className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded">
              {tag.title || tag.id}
            </span>
          ))}
        </div>
        
        <div className="text-xs text-neutral-500">
          <span className="bg-neutral-200 px-2 py-1 rounded">{card.language.name}</span>
        </div>
      </div>
    </div>
  );
};

// Video Media Card Component
const VideoMediaCardComponent: React.FC<{ card: import('../../types/api').VideoMediaCard; onClick: () => void }> = ({ 
  card, 
  onClick 
}) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      {/* Video thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-red-50 to-red-100">
        {card.thumbnailUrl ? (
          <img 
            src={card.thumbnailUrl} 
            alt={card.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Play size={48} className="text-red-500 mx-auto mb-2" />
              <p className="text-sm text-red-600 font-medium">VIDEO</p>
              {card.videoMeta?.resolution && (
                <p className="text-xs text-red-500">{card.videoMeta.resolution}</p>
              )}
            </div>
          </div>
        )}
        
        {/* Play overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <Play size={32} className="text-white" />
        </div>
        
        {/* Duration */}
        {card.duration && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
            {formatDuration(card.duration)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{card.title}</h3>
        
        {card.description && (
          <p className="text-neutral-600 text-sm mb-3 line-clamp-2">{card.description}</p>
        )}

        {/* Speaker/Preacher */}
        {(card.speaker || card.preacher) && (
          <div className="flex items-center text-sm text-neutral-700 mb-2">
            <User size={14} className="mr-1" />
            <span>{card.speaker || card.preacher}</span>
          </div>
        )}

        {/* Location and Date */}
        <div className="space-y-1 text-xs text-neutral-500 mb-3">
          {card.location && (
            <div className="flex items-center">
              <MapPin size={12} className="mr-1" />
              <span>{card.location}</span>
            </div>
          )}
          {card.recordedAt && (
            <div className="flex items-center">
              <Calendar size={12} className="mr-1" />
              <span>{formatDate(card.recordedAt)}</span>
            </div>
          )}
        </div>

        {/* Video metadata */}
        {card.videoMeta && (
          <div className="bg-neutral-50 rounded p-2 mb-3 text-xs space-y-1">
            {card.videoMeta.resolution && (
              <div>Resolution: {card.videoMeta.resolution}</div>
            )}
            {card.videoMeta.hasSubtitles && (
              <div>Subtitles available</div>
            )}
            {card.fileSize && (
              <div>Size: {formatFileSize(card.fileSize)}</div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mb-3">
          <button className="flex-1 bg-red-500 text-white text-sm py-2 px-3 rounded hover:bg-red-600 transition-colors">
            <Play size={14} className="inline mr-1" />
            Watch
          </button>
          <button className="bg-neutral-200 text-neutral-700 text-sm py-2 px-3 rounded hover:bg-neutral-300 transition-colors">
            <Download size={14} />
          </button>
        </div>

        {/* Tags and Language */}
        <div className="flex flex-wrap gap-1 mb-2">
          {card.tags.slice(0, 2).map((tag) => (
            <span key={tag.id} className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
              {tag.title || tag.id}
            </span>
          ))}
        </div>
        
        <div className="text-xs text-neutral-500">
          <span className="bg-neutral-200 px-2 py-1 rounded">{card.language.name}</span>
        </div>
      </div>
    </div>
  );
};

export default MediaCardComponent;