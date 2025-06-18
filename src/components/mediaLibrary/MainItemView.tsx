import { MediaLibraryItemViewDto } from "../../types/mediaLibrary";

type MainViewProps = {
  type: "audio" | "video" | "text";
  data: MediaLibraryItemViewDto;
};

export default function MainItemView({ type, data }: MainViewProps) {
  return (
    <section>
      <h2 style={{ fontSize: "1.2em", marginBottom: 8 }}>{data.title}</h2>
      {/* Description */}
      <div>
        <h3>Description</h3>
        <p>{data.description ? data.description : "no description available yet"}</p>
      </div>

      {/* Sermon Metadata */}
      {data.sermonMeta && (
        <div>
          <h4>Sermon Details</h4>
          {data.sermonMeta.preacher && <p><strong>Preacher:</strong> {data.sermonMeta.preacher}</p>}
          {data.sermonMeta.preachedAt && <p><strong>Date:</strong> {new Date(data.sermonMeta.preachedAt).toLocaleDateString()}</p>}
          {data.sermonMeta.location && <p><strong>Location:</strong> {data.sermonMeta.location}</p>}
        </div>
      )}

      {/* Event Metadata */}
      {data.eventMeta && (
        <div>
          <h4>Event Details</h4>
          {data.eventMeta.type && <p><strong>Type:</strong> {data.eventMeta.type}</p>}
          {data.eventMeta.startTime && <p><strong>Start Time:</strong> {new Date(data.eventMeta.startTime).toLocaleString()}</p>}
          {data.eventMeta.endTime && <p><strong>End Time:</strong> {new Date(data.eventMeta.endTime).toLocaleString()}</p>}
          {data.eventMeta.location && <p><strong>Location:</strong> {data.eventMeta.location}</p>}
        </div>
      )}

      {/* Book Metadata */}
      {data.bookMeta && (
        <div>
          <h4>Book Details</h4>
          {data.bookMeta.author && <p><strong>Author:</strong> {data.bookMeta.author}</p>}
          {data.bookMeta.publisher && <p><strong>Publisher:</strong> {data.bookMeta.publisher}</p>}
          {data.bookMeta.publishedAt && <p><strong>Published At:</strong> {new Date(data.bookMeta.publishedAt).toLocaleDateString()}</p>}
          {data.bookMeta.isbn && <p><strong>ISBN:</strong> {data.bookMeta.isbn}</p>}
          {data.bookMeta.pageCount && <p><strong>Page Count:</strong> {data.bookMeta.pageCount}</p>}
        </div>
      )}

      {/* Tags */}
      <div>
        <h4>Tags</h4>
        <p>
          {data.tags?.length
            ? data.tags.map((t) => <span key={t.id}>{t.title} </span>)
            : "N/A"}
        </p>
      </div>

      {/* Embedded Reader */}
      <div style={{ margin: "16px 0" }}>
        {type === "audio" && data.mediaUrl && (
          <audio controls src={data.mediaUrl} style={{ width: "100%" }} />
        )}
        {type === "video" && data.mediaUrl && (
          <video controls src={data.mediaUrl} style={{ width: "100%" }} />
        )}
        {type === "text" && data.mediaUrl && (
          <iframe
            src={data.mediaUrl}
            title="Document"
            style={{ width: "100%", height: 400, border: "1px solid #ccc" }}
          />
        )}
      </div>
    </section>
  );
}