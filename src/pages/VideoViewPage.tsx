import { useParams } from "react-router-dom";
import { DocumentFullDto, DocumentMediaResponseDto } from "../types/documents/documents";
import { useLanguageStore } from "../stores/useLanguageStore";
import { useEffect, useMemo, useState } from "react";

interface DocumentsStore {
    current: DocumentFullDto;
    mediaItems: DocumentMediaResponseDto[];
    fetchOne: (id: string) => Promise<void>;
    fetchMediaItems: () => Promise<void>;
    loading: boolean;
    error: string;
}

interface Props {
    store: DocumentsStore
}

const VideoViewPage: React.FC<Props> = ({store}) => {
  // URL params
    const { docId, versionId } = useParams<{
    docId: string;
    versionId: string;
    }>();

    // Store hooks
    const {
      current: document,
      mediaItems,
      fetchOne: fetchDoc,
      fetchMediaItems,
      loading: loadingDoc,
      error: docError,
    } = store;

    const { items: allLangs, fetchAll: fetchLangs } = useLanguageStore();

    // Local state for UI
    const [selectedVersionId, setSelectedVersionId] = useState(versionId);

    // Fetch data
    useEffect(() => {
      if (docId) fetchDoc(docId);
      fetchLangs();
    }, [docId, fetchDoc, fetchLangs]);

    const currentVersion = useMemo(() => {
      return (
          document.versions.find((v) => v.id === selectedVersionId) ||
          document.versions?.[0]
      );
    }, [document, selectedVersionId]);

    useEffect(() => {
        fetchMediaItems();
    }, [mediaItems, fetchMediaItems, currentVersion])

    // Derive Video Media
    const videoMediaUrl = useMemo(() => {
      return currentVersion?.mediaItems.find((m) => m.mediaType === 'VIDEO')?.url;
    }, [currentVersion]);

    // Related videos
    const relatedVideos = useMemo(() => {
      if (!document) return [];
      const preacher = document.sermonMeta?.preacher
      const location = document.sermonMeta?.location || document.eventMeta?.location
      const type = document.eventMeta?.type as string
      const docTags = document.tags?.map((t) => t.id) || [];
      return mediaItems.filter((d) => d.id !== document.id)
        .filter((d) => {
          const samePreacher = preacher && d.sermonMeta?.preacher === preacher;
          const sameLocation = location && (d.sermonMeta?.location === location
             || d.eventMeta?.location === location);
          const sameType = type && d.eventMeta?.type as string === type
          const sharedTag =
            docTags.length > 0 &&
            d.tags?.some((t) => docTags.includes(t.id));
          return samePreacher || sameLocation || sameType || sharedTag;
        });
    }, [document, mediaItems]);

    // 8) Render
    if (loadingDoc) return <p>Loading document…</p>;
    if (docError)   return <p>Error: {docError}</p>;
    if (!document)  return <p>Document not found.</p>;

    return (
      <div>
        {/* Header & Metadata */}
        <h1>{document.globalTitle}</h1>
        <p>
          <strong>Preacher:</strong>{' '}
          {document.sermonMeta?.preacher ?? 'N/A'}
        </p>
        <p>
          <strong>Location:</strong>{' '}
          { (document.sermonMeta?.location || document.eventMeta?.location) ?? 'N/A' }
        </p>
        <p>
          <strong>Tags:</strong>{' '}
          {document.tags?.map((t) => (
            <span key={t.id}>{t.translations[0].title} </span>
          )) ?? 'N/A'}
        </p>

          {/* Embedded Reader */}
        {videoMediaUrl && (
          <video
            controls
            src={videoMediaUrl}
            style={{ width: '100%', maxHeight: '70vh' }}
          />
        )}

        {/* Version / Language selector */}
        <select
          value={currentVersion?.id}
          onChange={(e) => setSelectedVersionId(e.target.value)}
        >
          {document.versions?.map((v) => (
            <option key={v.id} value={v.id}>
              {allLangs.find((l) => l.id === v.languageId)?.name ?? v.languageId}
            </option>
          ))}
        </select>

      {/* Related Videos */}
        <section>
          <h2>Related Videos</h2>
          {relatedVideos.length === 0 && <p>No related videos found.</p>}
          <ul>
            {relatedVideos.map((rel) => (
              <li key={rel.id}>
                <a href={`/media/text/${rel.id}/${rel.version.id}`}>
                  {rel.globalTitle}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }

export default VideoViewPage;