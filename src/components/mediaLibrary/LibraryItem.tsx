import { useNavigate } from "react-router-dom";
import { MediaLibraryItemDto } from "../../types/mediaLibrary";
import { Book } from "lucide-react";


type LibraryItemProps = {
  item: MediaLibraryItemDto;
  type: "text" | "audio" | "video" | undefined
};

const LibraryItem = ({ item, type }: LibraryItemProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden border border-neutral-100"
      onClick={() => navigate(`/library/view/${item.id}/${item.language.id}/${type}`)}
      title="View details"
      style={{ cursor: "pointer" }}
    >
      <div className="relative aspect-[2/3] bg-neutral-100 flex items-center justify-center">
        <Book size={48} className="text-neutral-300" />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      </div>
      {/* Card Content */}
      <div className="flex flex-col flex-1 p-4">
        {/* Title */}
        <h3 className="text-base font-semibold text-neutral-900 mb-1 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200">
          {item.title}
        </h3>
        {/* Key Persons */}
        {item.keyPersons?.length > 0 && (
          <p className="text-xs text-neutral-600 mb-2 line-clamp-1">
            {item.keyPersons.join(', ')}
          </p>
        )}
        {/* Categories & Language */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {item.categories.map((cat) => (
            <span
              key={cat}
              className="px-2 py-0.5 bg-primary-50 text-primary-600 rounded-full text-xs font-medium"
            >
              {cat}
            </span>
          ))}
          <span className="px-2 py-0.5 bg-neutral-50 text-neutral-700 rounded-full text-xs font-medium">
            {item.language?.name}
          </span>
        </div>
        {/* Tags */}
        <div className="mb-2 text-xs">
          <strong className="text-neutral-700">Tags:</strong>{" "}
          {item.tags.length > 0 ? (
            item.tags.map((t) => (
              <span
                key={t.id}
                className="inline-block mr-1 mb-1 bg-neutral-100 rounded px-2 py-0.5 text-xs text-neutral-700"
              >
                {t.title}
              </span>
            ))
          ) : (
            <span className="text-neutral-400">None</span>
          )}
        </div>
        {/* Media Type & Media ID */}
        <div className="mb-1 text-xs">
          <strong className="text-neutral-700">Media Type:</strong>{" "}
          <span className="text-neutral-600">{item.mediaType}</span>
        </div>
        {/* <div className="mb-2 text-[11px] text-neutral-400">
          <strong>Media ID:</strong> {item.mediaId}
        </div> */}
      </div>
    </div>
  )
}

export default LibraryItem