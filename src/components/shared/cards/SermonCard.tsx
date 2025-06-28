import React from 'react';
import { SermonCardData } from "../../../types/api";
import { Calendar, MapPin, User, Play } from 'lucide-react';
import { formatDate } from '../../../utils/formatters';
import CardContainer from "./CardContainer";

interface SermonCardProps {
  data: SermonCardData;
  onClick?: () => void;
}

const SermonCard: React.FC<SermonCardProps> = ({ data, onClick }) => {
  return (
    <CardContainer onClick={onClick}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2">
              {data.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium uppercase tracking-wide">
                Sermon
              </span>
            </div>
          </div>
          <div className="ml-3 p-2 bg-green-50 rounded-lg">
            <Play size={20} className="text-green-600" />
          </div>
        </div>

        {/* Preacher */}
        <div className="flex items-center gap-2 text-neutral-700">
          <User size={16} className="text-neutral-500" />
          <span className="font-medium">{data.sermonMeta.preacher}</span>
        </div>

        {/* Date and Location */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Calendar size={14} className="text-neutral-400" />
            <span>{formatDate(data.sermonMeta.preachedAt)}</span>
          </div>
          
          {data.sermonMeta.location && (
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <MapPin size={14} className="text-neutral-400" />
              <span>{data.sermonMeta.location}</span>
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-1">
          {data.categories.map((category) => (
            <span
              key={category}
              className="bg-neutral-100 text-neutral-600 text-xs px-2 py-1 rounded capitalize"
            >
              {category.toLowerCase()}
            </span>
          ))}
        </div>

        {/* Action */}
        <div className="pt-2 border-t border-neutral-100">
          <button className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
            <Play size={16} />
            <span>Écouter</span>
          </button>
        </div>
      </div>
    </CardContainer>
  );
};

export default SermonCard;