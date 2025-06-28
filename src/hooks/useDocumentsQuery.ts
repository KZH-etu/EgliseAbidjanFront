import { useBackendQuery } from './useBackendQuery';
import { useServices } from '../providers/serviceProvider';
import { Document } from '../types/api';
import { QueryState } from '../types/common';

export function useDocumentsQuery(initialQuery?: Partial<QueryState>) {
  const { documentService } = useServices();
  
  return useBackendQuery<Document>({
    queryFn: (params) => documentService.queryDocuments(params),
    initialQuery,
  });
}