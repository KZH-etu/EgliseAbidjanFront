import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { DocumentFullDto, DocumentMediaResponseDto } from '../types/documents/documents';
import { useLanguageStore } from '../stores/useLanguageStore';

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

const TextViewPage: React.FC<Props> = ({store}) => {
  // 1) Get URL params
  const { docId, versionId } = useParams<{
    docId: string;
    versionId: string;
  }>();

  // 2) Store hooks
  const {
    current: document,
    mediaItems,
    fetchOne: fetchDoc,
    fetchMediaItems,
    loading: loadingDoc,
    error: docError,
  } = store;

  const {
    items: allLangs,
    fetchAll: fetchLangs,
  } = useLanguageStore();

  // 3) Local state for UI controls
  const [showReader, setShowReader] = useState(false);
  const [selectedVersionId, setSelectedVersionId] = useState(versionId);

    // 4) Fetch data on mount
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


  // 6) Derive the text media item for this version
  const textMediaUrl = useMemo(() => {
    return currentVersion.mediaItems.find((m) => m.mediaType === 'TEXT')
      ?.url;
  }, [currentVersion]);

  // 7) Related texts: same author OR shared tags
  const relatedTexts = useMemo(() => {
    if (!document) return [];
    const author = document.bookMeta?.author;
    const docTags = document.tags?.map((t) => t.id) || [];
    return mediaItems.filter((d) => d.id !== document.id)
      .filter((d) => {
        const sameAuthor = author && d.bookMeta?.author === author;
        const sharedTag =
          docTags.length > 0 &&
          d.tags?.some((t) => docTags.includes(t.id));
        return sameAuthor || sharedTag;
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
        <strong>Author:</strong>{' '}
        {document.bookMeta?.author ?? 'N/A'}
      </p>
      <p>
        <strong>Published:</strong>{' '}
        {document.bookMeta?.publishedAt
          ? new Date(document.bookMeta.publishedAt).toLocaleDateString()
          : 'N/A'}
      </p>
      <p>
        <strong>Tags:</strong>{' '}
        {document.tags?.map((t) => (
          <span key={t.id}>{t.translations[0].title} </span>
        )) ?? 'N/A'}
      </p>

      {/* Action Bar */}
      <div>
        <button onClick={() => setShowReader((v) => !v)}>
          {showReader ? 'Hide Reader' : 'Read In‑Browser'}
        </button>
        {textMediaUrl && (
          <a href={textMediaUrl} download>
            <button>Download PDF</button>
          </a>
        )}
        {/* Version / Language selector */}
        <select
          value={currentVersion?.id}
          onChange={(e) => setSelectedVersionId(e.target.value)}
        >
          {document.versions?.map((v) => (
            <option key={v.id} value={v.id}>
              {
                allLangs.find((l) => l.id === v.languageId)?.name ??
                v.languageId
              }
            </option>
          ))}
        </select>
      </div>

      {/* Embedded Reader */}
      {showReader && textMediaUrl && (
        <iframe
          src={textMediaUrl}
          style={{ width: '100%', height: '600px', border: 0 }}
          title="PDF Reader"
        />
      )}

      {/* Related Texts */}
      <section>
        <h2>Related Books</h2>
        {relatedTexts.length === 0 && <p>No related texts found.</p>}
        <ul>
          {relatedTexts.map((rel) => (
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

export default TextViewPage;