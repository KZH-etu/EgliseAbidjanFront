import { useBackendQuery } from './useBackendQuery';
import { useServices } from '../providers/serviceProvider';
import { Language } from '../types/api';
import { QueryState } from '../types/common';

export function useLanguagesQuery(initialQuery?: Partial<QueryState>) {
  const { languageService } = useServices();
  
  return useBackendQuery<Language>({
    queryFn: (params) => languageService.queryLanguages(params),
    initialQuery,
  });
}