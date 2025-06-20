import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMediaLibrary } from "../hooks/useMediaLibrary";
import { MediaLibraryItemViewDto } from "../types/mediaLibrary";
import MainItemView from "../components/mediaLibrary/MainItemView";
import PageHeader from "../components/ui/PageHeader";
import ScrollableLibraryList from "../components/mediaLibrary/ScrollableLibraryList";

export default function LibraryItemViewPage() {
  const { docId, langId, type } = useParams<{ docId: string; langId: string; type: "audio" | "video" | "text" }>();
  const { fetchView, loadingView, errorView } = useMediaLibrary();
  const [view, setView] = useState<MediaLibraryItemViewDto | null>(null);

  useEffect(() => {
    if (docId && langId && type) {
      fetchView(docId, langId, type)
        .then(setView)
        .catch(console.error);
    }
  }, [docId, langId, type, fetchView]);

  if (loadingView) return <p>Loading…</p>;
  if (errorView) return <p>Error: {errorView}</p>;
  if (!view) return <p>Not found.</p>;

  return (
    <div>
      <PageHeader 
        title={view.title}
        backgroundImage="https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg"
      />
      {type === undefined ? (
        <p>Unknown type</p>
      ) : (
        <MainItemView type={type} data={view} />
      )}

      {/* Language selector */}
      {/* <div style={{ margin: "16px 0" }}>
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
      </div> */}

      {!view.relatedItems || view.relatedItems.length === 0 ? (
        <p>No related items found.</p>
      ) : (
        <section className="container-custom">
          <ScrollableLibraryList
            title="Related Items"
            items={view.relatedItems}
            type={type}
          />
        </section>
      )}
    </div>
  );
}