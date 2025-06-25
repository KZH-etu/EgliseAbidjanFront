import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMediaLibrary } from "../hooks/useMediaLibrary";
import { MediaLibraryItemView } from "../types/api";
import MainItemView from "../components/mediaLibrary/MainItemView";
import RelatedItem from "../components/mediaLibrary/RelatedItem";

export default function LibraryItemViewPage() {
  const { docId, langId, type } = useParams<{ docId: string; langId: string; type: "audio" | "video" | "text" }>();
  const { fetchView, loading, error } = useMediaLibrary();
  const [view, setView] = useState<MediaLibraryItemView | null>(null);

  useEffect(() => {
    if (docId && langId && type) {
      fetchView(docId, langId, type)
        .then(setView)
        .catch(console.error);
    }
  }, [docId, langId, type, fetchView]);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error}</p>;
  if (!view) return <p>Not found.</p>;

  return (
    <div>
      <h1>{view.title}</h1>
      {type === undefined ? (
        <p>Unknown type</p>
      ) : (
        <MainItemView type={type} data={view} />
      )}

      {/* Language selector */}
      <div style={{ margin: "16px 0" }}>
        <label>
          Language:{" "}
          <select value={langId}>
            {view.availableLanguages && view.availableLanguages.length > 0 ? (
              view.availableLanguages.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))
            ) : (
              <option value="">No languages available</option>
            )}
          </select>
        </label>
      </div>
      {!view.relatedItems || view.relatedItems.length === 0 ? (
        <p>No related items found.</p>
      ) : (
        <section>
          <h2>Related Items</h2>
          <ul>
            {view.relatedItems.map((item) => (
              <RelatedItem key={item.id} item={item} type={type} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}