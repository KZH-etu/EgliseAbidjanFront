import { useBackendQuery } from './useBackendQuery';
import { useServices } from '../providers/serviceProvider';
import { DocumentVersion } from '../types/api';
import { QueryState } from '../types/common';

export function useDocumentVersionsQuery(initialQuery?: Partial<QueryState>) {
  const { documentVersionsService } = useServices();
  
  return useBackendQuery<DocumentVersion>({
    queryFn: (params) => documentVersionsService.queryVersions(params),
    initialQuery,
  });
}