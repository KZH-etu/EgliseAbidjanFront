import React from 'react';
import { EventCardData } from "../../../types/api";
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { formatDateTime } from '../../../utils/formatters';
import CardContainer from "./CardContainer";

interface EventCardProps {
  data: EventCardData;
  onClick?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ data, onClick }) => {
  const isUpcoming = new Date(data.eventMeta.startTime) > new Date();
  const isPast = new Date(data.eventMeta.endTime || data.eventMeta.startTime) < new Date();

  return (
    <CardContainer onClick={onClick}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2">
              {data.title}
            </h3>
            <div className="flex items-center gap-2 text-sm">
              <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${
                isUpcoming 
                  ? 'bg-blue-100 text-blue-700' 
                  : isPast 
                  ? 'bg-neutral-100 text-neutral-600'
                  : 'bg-green-100 text-green-700'
              }`}>
                {isUpcoming ? 'À venir' : isPast ? 'Passé' : 'En cours'}
              </span>
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                {data.eventMeta.type}
              </span>
            </div>
          </div>
          <div className="ml-3 p-2 bg-blue-50 rounded-lg">
            <Calendar size={20} className="text-blue-600" />
          </div>
        </div>

        {/* Date and Time */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-neutral-700">
            <Clock size={16} className="text-neutral-500" />
            <div className="flex flex-col">
              <span className="font-medium">
                {formatDateTime(data.eventMeta.startTime)}
              </span>
              {data.eventMeta.endTime && (
                <span className="text-sm text-neutral-600">
                  jusqu'à {formatDateTime(data.eventMeta.endTime)}
                </span>
              )}
            </div>
          </div>
          
          {data.eventMeta.location && (
            <div className="flex items-center gap-2 text-neutral-600">
              <MapPin size={16} className="text-neutral-500" />
              <span>{data.eventMeta.location}</span>
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
          <button className={`w-full py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2 ${
            isUpcoming 
              ? 'bg-blue-500 text-white hover:bg-blue-600' 
              : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'
          }`}>
            <Users size={16} />
            <span>{isUpcoming ? 'Participer' : 'Voir détails'}</span>
          </button>
        </div>
      </div>
    </CardContainer>
  );
};

export default EventCard;