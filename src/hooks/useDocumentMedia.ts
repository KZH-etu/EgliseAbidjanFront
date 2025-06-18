import { useState, useEffect, useCallback, useMemo } from 'react';
import { useServices } from '../providers/serviceProvider';
import { DocumentMediaResponseDto } from '../types/document-media';
import { CreateDocumentMediaDto, UpdateDocumentMediaDto } from "../types/document-media";

export function useDocumentMedia() {
    const { documentMediaService } = useServices();
    const [items, setItems] = useState<DocumentMediaResponseDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string|null>(null);

    const loadMedia = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await documentMediaService.fetchAllMedia();
      setItems(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

    useEffect(() => {
        loadMedia();
    }, [loadMedia, documentMediaService]);

    const remove = useCallback(async (id: string) => {
    await documentMediaService.deleteMedia(id);
    // optionally refresh list:
    await loadMedia();
    }, [loadMedia, documentMediaService]);

    const add = useCallback(async (body: CreateDocumentMediaDto) => {
    await documentMediaService.createMedia(body);
    await loadMedia();
    }, [loadMedia, documentMediaService]);

    const patch = useCallback(async (id: string, body: UpdateDocumentMediaDto) => {
    await documentMediaService.updateMedia(id, body);
    await loadMedia();
    }, [loadMedia, documentMediaService]);

    const memoizedMedia = useMemo(()=> ({ items, loadMedia, loading, add,
       patch, remove, error }), [items, loadMedia, loading, add, patch, remove, error]);

    return memoizedMedia;
}