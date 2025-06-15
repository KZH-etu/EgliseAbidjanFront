import { useState, useEffect, useCallback } from 'react';
import { useServices } from '../providers/serviceProvider';
import { DocumentMediaResponseDto } from '../types/document-media/document-media';
import { CreateDocumentMediaDto, UpdateDocumentMediaDto } from '../types/document-media/create-document-media.dto';

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
    }, [loadMedia]);

    const remove = useCallback(async (id: string) => {
    await documentMediaService.deleteMedia(id);
    // optionally refresh list:
    await loadMedia();
    }, [loadMedia]);

    const add = useCallback(async (body: CreateDocumentMediaDto) => {
    await documentMediaService.createMedia(body);
    await loadMedia();
    }, [loadMedia]);

    const patch = useCallback(async (id: string, body: UpdateDocumentMediaDto) => {
    await documentMediaService.updateMedia(id, body);
    await loadMedia();
    }, [loadMedia]);

  return { items, loadMedia, loading, add, patch, remove, error };
}