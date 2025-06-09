import { useMemo } from 'react';
import { useDocumentStore } from '../stores/useDocumentStore';
import { Document, DocumentCategory } from '../api/types/documents/documents';

export function useEvents() {
  // pull the raw state from Zustand
  const items = useDocumentStore((s) => s.items);
  const loading = useDocumentStore((s) => s.loading);
  const error = useDocumentStore((s) => s.error);

  // memoize the filtered list so we only recompute when `items` changes
  const events = useMemo<Document[]>(
    () => items.filter((doc) => doc.categories?.includes(DocumentCategory.EVENT)),
    [items],
  );

    return { events, loading, error };
}