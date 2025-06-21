import { MediaLibraryItemViewDto } from "../../types/mediaLibrary";
import BookMetaCard from "./BookMetaCard";
import EventMetaCard from "./EventMetaCard";
import { MediaViewer } from "./MediaViewer";
import SermonMetaCard from "./SermonMetaCard";

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
        <>
          <SermonMetaCard
            title={data.title}
            type={type}
            preacher={data.sermonMeta.preacher}
            preachedAt={data.sermonMeta.preachedAt}
            location={data.sermonMeta.location}
            description={data.description ? data.description : "no description available yet"}
            tags={data.tags}
            availableLanguages={data.availableLanguages}
            mediaUrl={data.mediaUrl}
          />
        </>
      )}

      {/* Event Metadata */}
      {data.eventMeta && (
        <>
          <EventMetaCard
            title={data.title}
            type={data.eventMeta.type}
            startTime={data.eventMeta.startTime}
            endTime={data.eventMeta.endTime}
            location={data.eventMeta.location}
            description={data.description ? data.description : "no description available yet"}
            tags={data.tags}
            availableLanguages={data.availableLanguages}
            mediaUrl={data.mediaUrl}
          />
          <div>
            <h4>Event Details</h4>
            {data.eventMeta.type && <p><strong>Type:</strong> {data.eventMeta.type}</p>}
            {data.eventMeta.startTime && <p><strong>Start Time:</strong> {new Date(data.eventMeta.startTime).toLocaleString()}</p>}
            {data.eventMeta.endTime && <p><strong>End Time:</strong> {new Date(data.eventMeta.endTime).toLocaleString()}</p>}
            {data.eventMeta.location && <p><strong>Location:</strong> {data.eventMeta.location}</p>}
          </div>
        </>
      )}

      {/* Book Metadata */}
      {data.bookMeta && (
        <>
          <BookMetaCard
            title={data.title}
            author={data.bookMeta.author}
            description={data.description ? data.description : "no description available yet"}
            publisher={data.bookMeta.publisher}
            publishedAt={data.bookMeta.publishedAt}
            isbn={data.bookMeta.isbn}
            pageCount={data.bookMeta.pageCount}
            tags={data.tags}
            availableLanguages={data.availableLanguages}
            mediaUrl={data.mediaUrl}
          />
        </>
      )}

      {/* Tags */}
      {/* <div>
        <h4>Tags</h4>
        <p>
          {data.tags?.length
            ? data.tags.map((t) => <span key={t.id}>{t.title} </span>)
            : "N/A"}
        </p>
      </div> */}

      {/* Embedded Reader */}
      <div className="container-custom">
        <MediaViewer type={type} url={data.mediaUrl} />
      </div>
      {/* <div style={{ margin: "16px 0" }}>
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
      </div> */}
    </section>
  );
}