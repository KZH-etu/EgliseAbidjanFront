import { useBackendQuery } from './useBackendQuery';
import { useServices } from '../providers/serviceProvider';
import { MediaCard, BasicMediaCard } from '../types/api';
import { QueryState } from '../types/common';

interface MediaLibraryQueryParams extends QueryState {
  type?: 'text' | 'audio' | 'video';
}

export function useMediaLibraryQuery(initialQuery?: Partial<MediaLibraryQueryParams>) {
  const { mediaLibraryService } = useServices();
  
  return useBackendQuery<MediaCard | BasicMediaCard>({
    queryFn: (params) => mediaLibraryService.queryMediaCards(params as MediaLibraryQueryParams),
    initialQuery,
  });
}