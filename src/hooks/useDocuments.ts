import { useState, useEffect, useCallback, useMemo } from 'react';
import { DocumentResponseDto, EventSummaryDto } from '../types/documents/documents';
import { useServices } from '../providers/serviceProvider';
import { CreateDocumentDto, UpdateDocumentDto } from '../types/documents/create-document.dto';

export function useDocuments() {

    const { documentService } = useServices();
    const [docs, setDocs] = useState<DocumentResponseDto[]>([]);
    const [events, setEvents] = useState<EventSummaryDto[]>([]);
    const [loadingDocs, setLoadingDocs] = useState(true);
    const [loadingEvents, setLoadingEvents] = useState(true);
    const [errorDocs, setErrorDocs] = useState<string|null>(null);
    const [errorEvents, setErrorEvents] = useState<string|null>(null);

    const loadDocs = useCallback(async () => {
        setLoadingDocs(true);
        setErrorDocs(null);
    
        try {
          const docData = await documentService.fetchDocuments();
          setDocs(docData);
        } catch (e: any) {
          setErrorDocs(e.message);
        } finally {
          setLoadingDocs(false);
        }
      }, []);

    const loadEvents = useCallback(async () => {
      setLoadingEvents(true);
      setErrorEvents(null);
      try {
        const eventData = await documentService.fetchEvents();
        setEvents(eventData);
      } catch (e: any) {
        setErrorEvents(e.message);
      } finally {
        setLoadingEvents(false);
      }
    }, []);

    useEffect(() => {
      loadDocs();
      loadEvents();
    }, [loadDocs, loadEvents]);

    const remove = useCallback(async (id: string) => {
    await documentService.deleteDocument(id);
    await loadDocs();
    await loadEvents();
    }, [loadDocs, loadEvents]);

    const add = useCallback(async (body: CreateDocumentDto) => {
    await documentService.createDocument(body);
    await loadDocs();
    await loadEvents();
    }, [loadDocs, loadEvents]);

    const patch = useCallback(async (id: string, body: UpdateDocumentDto) => {
    await documentService.updateDocument(id, body);
    await loadDocs();
    await loadEvents();
    }, [loadDocs, loadEvents]);

    const fetchMetaByDocument = useCallback(async (documentId: string) => {
      const meta = await documentService.fetchMetaByDocument(documentId);
      return meta;
    }, [documentService]);

    const memoizedDocs = useMemo(() => ({docs, loadingDocs, errorDocs, fetchMetaByDocument,
      loadDocs, add, patch, remove}), [docs, loadingDocs, errorDocs, loadDocs, add, patch, remove]);

    const memoizedEvents = useMemo(() => ({events, loadingEvents, errorEvents,
      loadEvents}), [events, loadingEvents, errorEvents, loadEvents]);

    return {...memoizedDocs, ...memoizedEvents,};
}
