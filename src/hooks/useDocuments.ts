import { useState, useEffect } from 'react';
import { Document } from '../types/documents/documents';
import { useServices } from '../providers/serviceProvider';

export function useDocuments() {
  const { documentService } = useServices();
  const [items, setItems] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    documentService
      .fetchDocuments()
      .then(setItems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [documentService]);

  return { items, loading, error };
}
