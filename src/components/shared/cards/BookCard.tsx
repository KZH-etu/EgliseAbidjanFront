import React from 'react';
import { BookCardData } from "../../../types/api";
import { FileText, User, Calendar, BookOpen, Download } from 'lucide-react';
import { formatDate } from '../../../utils/formatters';
import CardContainer from "./CardContainer";

interface BookCardProps {
  data: BookCardData;
  onClick?: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ data, onClick }) => {
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
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium uppercase tracking-wide">
                Livre
              </span>
            </div>
          </div>
          <div className="ml-3 p-2 bg-blue-50 rounded-lg">
            <BookOpen size={20} className="text-blue-600" />
          </div>
        </div>

        {/* Author */}
        <div className="flex items-center gap-2 text-neutral-700">
          <User size={16} className="text-neutral-500" />
          <span className="font-medium">{data.bookMeta.author}</span>
        </div>

        {/* Book Details */}
        <div className="space-y-2">
          {data.bookMeta.publisher && (
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <FileText size={14} className="text-neutral-400" />
              <span>{data.bookMeta.publisher}</span>
            </div>
          )}
          
          {data.bookMeta.publishedAt && (
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <Calendar size={14} className="text-neutral-400" />
              <span>Publié en {formatDate(data.bookMeta.publishedAt)}</span>
            </div>
          )}

          {data.bookMeta.pageCount && (
            <div className="text-sm text-neutral-600">
              <span className="font-medium">{data.bookMeta.pageCount}</span> pages
            </div>
          )}

          {data.bookMeta.isbn && (
            <div className="text-xs text-neutral-500 font-mono">
              ISBN: {data.bookMeta.isbn}
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

        {/* Actions */}
        <div className="pt-2 border-t border-neutral-100 space-y-2">
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
            <FileText size={16} />
            <span>Lire</span>
          </button>
          <button className="w-full bg-neutral-200 text-neutral-700 py-2 px-4 rounded-md hover:bg-neutral-300 transition-colors flex items-center justify-center gap-2">
            <Download size={16} />
            <span>Télécharger</span>
          </button>
        </div>
      </div>
    </CardContainer>
  );
};

export default BookCard;