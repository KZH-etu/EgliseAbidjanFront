import { Calendar, User, Tag, Book, Globe, BookOpen, ArrowLeft } from "lucide-react";
import { TagSummaryDto } from "../../types/tags";
import { LanguageSummaryDto } from "../../types/languages";
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { useTranslation } from "../../hooks/useTranslation";

interface BookMetaCardProps {
  title: string;
  author?: string;
  description?: string;
  tags?: TagSummaryDto[];
  availableLanguages?: LanguageSummaryDto[];
  publisher?: string;
  publishedAt?: Date;
  isbn?: string;
  pageCount?: number;
  mediaUrl?: string;
}

export default function BookMetaCard({
  title,
  author,
  description,
  tags,
  availableLanguages,
  publisher,
  publishedAt,
  isbn,
  pageCount,
  mediaUrl,
}: BookMetaCardProps) {
  const { t } = useTranslation();

  return (
    <div className="container-custom">
      <div className="py-6">
        <Link 
          to="/library/text" 
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
        {/* Cover */}
        <div className="md:col-span-1">
          <div className="aspect-[4/5] bg-neutral-100 rounded-lg flex items-center justify-center">
              <Book size={64} className="text-neutral-300" />
          </div>
        </div>

        <div className="md:col-span-2 space-y-6 flex flex-col justify-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            {author && (
              <div className="flex items-center text-lg text-neutral-600">
                <User size={20} className="mr-2" />
                {author}
              </div>
            )}
          </div>
          {description && (
            <div>
              <h2 className="text-xl font-bold mb-2">Description</h2>
              <p className="text-neutral-600 whitespace-pre-line">{description}</p>
            </div>
          )}
          {/* Tags */}
          {tags && tags.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-2">Tags</h2>
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
                <span className="font-medium">Available Languages:</span>
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
          {/* Book extra meta */}
          {(publisher || publishedAt || isbn || pageCount) && (
            <div className="flex flex-wrap gap-4 bg-neutral-50 rounded-lg justify-around p-4 border border-neutral-100">
              {publisher && (
                <div className="flex items-center gap-2 text-sm text-neutral-700">
                  <span className="font-medium">Publisher:</span>
                  <span>{publisher}</span>
                </div>
              )}
              {publishedAt && (
                <div className="flex items-center gap-2 text-sm text-neutral-700">
                  <Calendar size={16} className="text-primary-500" />
                  <span className="font-medium">Published:</span>
                  <span>{new Date(publishedAt).toLocaleDateString()}</span>
                </div>
              )}
              {pageCount && (
                <div className="flex items-center gap-2 text-sm text-neutral-700">
                  <span className="font-medium">Pages:</span>
                  <span>{pageCount}</span>
                </div>
              )}
            </div>
          )}
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
                  Lire en ligne
                </a>
              )}
            </div>
        </div>
      </div>
    </motion.div>
    </div>
    
  )
}