import { Calendar, MapPin, Users, BookOpen, Tag, Globe, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { TagSummaryDto } from "../../types/tags";
import { LanguageSummaryDto } from "../../types/languages";
import { Link } from "react-router-dom";
import { useTranslation } from "../../hooks/useTranslation";
import { EventType } from "../../types/documents";

interface EventMetaCardProps {
  title: string;
  type?: EventType;
  startTime?: Date;
  endTime?: Date;
  location?: string;
  description?: string;
  mediaUrl?: string;
  availableLanguages?: LanguageSummaryDto[]
  downloadUrl?: string;
  tags?: TagSummaryDto[];
}

export default function EventMetaCard({
  title,
  type,
  startTime,
  endTime,
  location,
  description,
  mediaUrl,
  availableLanguages,
  tags,
}: EventMetaCardProps) {
  const { t } = useTranslation();

  return (
    <div className="container-custom">
      <div className="py-6">
        <Link 
          to="/library/event" 
          className="inline-flex items-center px-4 py-2 text-neutral-700 bg-white hover:bg-neutral-50 border border-neutral-200 rounded-lg shadow-sm transition-colors group"
        >
          <ArrowLeft size={20} className="mr-2 text-neutral-500 group-hover:text-primary-500 transition-colors" />
          <span>{t('books.backToLibrary')}</span>
        </Link>
      </div>

      <motion.div
        className="bg-white rounded-lg shadow-xl overflow-hidden mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 p-8">
          {/* Icon */}
          <div className="md:col-span-1 flex bg-neutral-100 items-center justify-center">
            <Users size={64} className="text-neutral-300" />
          </div>
          {/* Metadata */}
          <div className="md:col-span-2 space-y-6 flex flex-col justify-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">{title}</h1>
              {type && (
                <div className="flex items-center text-lg text-neutral-600">
                  <span className="font-medium mr-2">{t('common.type') || "Type"}:</span>
                  {type}
                </div>
              )}
            </div>
            {description && (
              <div>
                <h2 className="text-xl font-bold mb-2">{t('books.description')}</h2>
                <p className="text-neutral-600 whitespace-pre-line">{description}</p>
              </div>
            )}
            {/* Tags */}
            {tags && tags.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-2">{t('common.tags')}</h2>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm flex items-center"
                    >
                      <Tag size={14} className="mr-1" />
                      {tag.title}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {/* Languages */}
            {availableLanguages && availableLanguages.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 text-neutral-600">
                  <Globe size={20} className="text-primary-500" />
                  <span className="font-medium">{t('books.availableLanguages') || "Available Languages"}:</span>
                  <div className="flex gap-2">
                    {availableLanguages.map((lang) => (
                      <span
                        key={lang.id}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-neutral-100 rounded-full text-sm"
                      >
                        <span>{lang.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div className="flex flex-wrap gap-4 bg-neutral-50 rounded-lg justify-around p-4 border border-neutral-100">
              {startTime && (
                <div className="flex items-center gap-2 text-sm text-neutral-700">
                  <Calendar size={16} className="text-primary-500" />
                  <span className="font-medium">{t('common.startTime') || "Start Time"}:</span>
                  <span>
                    {new Date(startTime).toLocaleString()}
                  </span>
                </div>
              )}
              {endTime && (
                <div className="flex items-center gap-2 text-sm text-neutral-700">
                  <Calendar size={16} className="text-primary-500" />
                  <span className="font-medium">{t('common.endTime') || "End Time"}:</span>
                  <span>
                    {new Date(endTime).toLocaleString()}
                  </span>
                </div>
              )}
              {location && (
                <div className="flex items-center gap-2 text-sm text-neutral-700">
                  <MapPin size={16} className="text-primary-500" />
                  <span className="font-medium">{t('common.location') || "Location"}:</span>
                  <span>{location}</span>
                </div>
              )}
            </div>
            {/* Action Buttons */}
            <div className="flex gap-4 mt-4">
              {mediaUrl && (
                <a
                  href={mediaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2"
                >
                  <BookOpen size={18} />
                  {t('common.viewOnline') || "View Online"}
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}