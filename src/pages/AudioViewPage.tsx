const AudioViewPage = () => {
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

  const audioMediaUrl = useMemo(() => {
    return currentVersion?.mediaItems?.find((m) => m.mediaType === 'AUDIO')?.url;
  }, [currentVersion]);

  if (!document) return <p>Loading...</p>;

  return (
    <div>
      <h1>{document.globalTitle}</h1>
      <p>Preacher: {document.sermonMeta?.preacher ?? 'N/A'}</p>

      {audioMediaUrl && <audio controls src={audioMediaUrl} style={{ width: '100%' }} />}

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

      {/* Related Audios (stub) */}
      <section>
        <h2>Related Audios</h2>
        {/* Insert related logic here */}
      </section>
    </div>
  );
}

export default AudioViewPage;