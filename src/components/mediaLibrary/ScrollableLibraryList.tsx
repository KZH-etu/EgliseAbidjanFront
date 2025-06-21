import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RelatedItem from "./RelatedItem";
import { MediaLibraryCardDto } from "../../types/mediaLibrary";
import { useTranslation } from "../../hooks/useTranslation";

type Props = {
  title: string;
  items: MediaLibraryCardDto[];
  type?: "audio" | "video" | "text";
};

export default function ScrollableLibraryList({ title, items, type }: Props) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const { t } = useTranslation();

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setScrollPosition(containerRef.current.scrollLeft + scrollAmount);
    }
  };

  const displayedItems = items.slice(0, 10);
  const hasMore = items.length > 10;

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        {/* Ajoute un bouton "Voir tout" si besoin */}
        {/* {hasMore && (
          <button 
            onClick={handleSeeAll}
            className="btn-outline text-sm"
          >
            {t('common.seeAll')} ({books.length})
          </button>
        )} */}
      </div>
      <div className="relative group">
        <div
          ref={containerRef}
          className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {displayedItems.map((item) => (
            <div key={item.id} className="flex-shrink-0 w-48">
              <RelatedItem item={item} type={type} />
            </div>
          ))}
        </div>
        {displayedItems.length > 4 && (
          <>
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -translate-x-1/2"
              style={{ visibility: scrollPosition <= 0 ? "hidden" : "visible" }}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 translate-x-1/2"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}