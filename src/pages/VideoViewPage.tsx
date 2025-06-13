const VideoViewPage = () => {
  const { docId, versionId } = useParams();
  const { current: document, fetchOne: fetchDoc } = useDocumentStore();
  const { items: allLangs, fetchAll: fetchLangs } = useLanguageStore();

  const [selectedVersionId, setSelectedVersionId] = useState(versionId);

  useEffect(() => {
    if (docId) fetchDoc(docId);
    fetchLangs();
  }, [docId, fetchDoc, fetchLangs]);

  const currentVersion = useMemo(() => {
    return (
      document?.versions?.find((v) => v.id === selectedVersionId) ||
      document?.versions?.[0]
    );
  }, [document, selectedVersionId]);

  const videoMediaUrl = useMemo(() => {
    return currentVersion?.mediaItems?.find((m) => m.mediaType === 'VIDEO')?.url;
  }, [currentVersion]);

  if (!document) return <p>Loading...</p>;

  return (
    <div>
      <h1>{document.globalTitle}</h1>
      <p>Speaker: {document.sermonMeta?.preacher ?? 'N/A'}</p>

      {videoMediaUrl && (
        <video
          controls
          src={videoMediaUrl}
          style={{ width: '100%', maxHeight: '70vh' }}
        />
      )}

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

      {/* Related Videos (stub) */}
      <section>
        <h2>Related Videos</h2>
        {/* Insert related logic here */}
      </section>
    </div>
  );
}

export default VideoViewPage;