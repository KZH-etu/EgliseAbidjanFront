import { useMemo } from 'react';
import { Document, DocumentCategory } from '../types/documents/documents';
import { useDocuments } from './useDocuments';

export function useEvents() {
  // pull the raw state from Zustand
  const {items, loading, error} = useDocuments();

  // memoize the filtered list so we only recompute when `items` changes
  const events = useMemo<Document[]>(
    () => items.filter((doc) => doc.categories?.includes(DocumentCategory.EVENT)),
    [items],
  );

    return { events, loading, error };
}