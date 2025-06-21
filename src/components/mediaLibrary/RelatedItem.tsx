import { Link } from "react-router-dom";
import { MediaLibraryCardDto } from "../../types/mediaLibrary";
import { Book, PlayCircle, Video } from "lucide-react";

type RelatedItemsProps = {
  item: MediaLibraryCardDto;
  type?: "audio" | "video" | "text";
};

// This component renders a related item in the media library, displaying its title, speaker, description, location, date, and media controls.

export default function RelatedItem({ item, type }: RelatedItemsProps) {
  return (
        <Link to={``} className="group block">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 w-56">
                <div className="relative aspect-[3/4] bg-neutral-100 flex items-center justify-center">
                {type === "audio" ? (
                    <PlayCircle size={48} className="text-primary-400" />
                ) : type === "video" ? (
                    <Video size={48} className="text-primary-400" />
                ) : (
                    <Book size={48} className="text-neutral-300" />
                )}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </div>
                <div className="p-4">
                <h3 className="text-sm font-bold text-neutral-900 mb-1 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200">
                    {item.title}
                </h3>
                {item.speaker && (
                    <p className="text-xs text-neutral-600 mb-1">{item.speaker}</p>
                )}
                {item.location && (
                    <p className="text-xs text-neutral-500 mb-1">{item.location}</p>
                )}
                {item.date && (
                    <p className="text-xs text-neutral-400 mb-1">
                        {new Date(item.date).toLocaleDateString()}
                    </p>
                )}
                </div>
            </div>
        </Link>
    )};

