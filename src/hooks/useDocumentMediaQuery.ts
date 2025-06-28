import { useBackendQuery } from './useBackendQuery';
import { useServices } from '../providers/serviceProvider';
import { DocumentMedia } from '../types/api';
import { QueryState } from '../types/common';

export function useDocumentMediaQuery(initialQuery?: Partial<QueryState>) {
  const { documentMediaService } = useServices();
  
  return useBackendQuery<DocumentMedia>({
    queryFn: (params) => documentMediaService.queryMedia(params),
    initialQuery,
  });
}