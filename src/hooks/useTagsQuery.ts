import { useBackendQuery } from './useBackendQuery';
import { useServices } from '../providers/serviceProvider';
import { Tag } from '../types/api';
import { QueryState } from '../types/common';

export function useTagsQuery(initialQuery?: Partial<QueryState>) {
  const { tagService } = useServices();
  
  return useBackendQuery<Tag>({
    queryFn: (params) => tagService.queryTags(params),
    initialQuery,
  });
}