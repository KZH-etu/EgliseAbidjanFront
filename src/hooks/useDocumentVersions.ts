import { useState, useEffect, useCallback, useMemo } from 'react';
import { useServices } from '../providers/serviceProvider';
import { DocumentVersionResponseDto } from '../types/document-versions';
import { CreateDocumentVersionDto, UpdateDocumentVersionDto } from "../types/document-versions";

export function useDocumentVersions() {
    const { documentVersionsService } = useServices();
    const [items, setItems] = useState<DocumentVersionResponseDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string|null>(null);

    const loadVersions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await documentVersionsService.fetchAllVersions();
      setItems(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

    useEffect(() => {
        loadVersions();
    }, [loadVersions, documentVersionsService]);

    const remove = useCallback(async (id: string) => {
    await documentVersionsService.deleteVersion(id);
    // optionally refresh list:
    await loadVersions();
    }, [loadVersions, documentVersionsService]);

    const add = useCallback(async (body: CreateDocumentVersionDto) => {
    await documentVersionsService.createVersion(body);
    await loadVersions();
    }, [loadVersions, documentVersionsService]);

    const patch = useCallback(async (id: string, body: UpdateDocumentVersionDto) => {
    await documentVersionsService.updateVersion(id, body);
    await loadVersions();
    }, [loadVersions, documentVersionsService]);

    const searchVersions = useCallback(async (query: string) => {
      const searchedVersions = await documentVersionsService.searchVersions(query);
      return searchedVersions;
    }, [documentVersionsService]);

    const memoizedVersions = useMemo(() => ({ items, loadVersions, loading, add,
       patch, remove, searchVersions, error }), [items, loadVersions, loading,
        searchVersions, add, patch, remove, error]);

   return memoizedVersions;
}