import { useState, useCallback, useEffect, useRef } from 'react';
import { QueryState, DEFAULT_QUERY_STATE, PaginatedResponse } from '../types/common';

interface UseBackendQueryOptions<T> {
  queryFn: (params: QueryState) => Promise<PaginatedResponse<T>>;
  initialQuery?: Partial<QueryState>;
  autoFetch?: boolean;
}

export function useBackendQuery<T>({
  queryFn,
  initialQuery = {},
  autoFetch = true
}: UseBackendQueryOptions<T>) {
  const [queryState, setQueryState] = useState<QueryState>({
    ...DEFAULT_QUERY_STATE,
    ...initialQuery
  });
  
  const [data, setData] = useState<T[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Use ref to track if we've made the initial fetch
  const hasFetchedRef = useRef(false);
  const queryFnRef = useRef(queryFn);
  
  // Update the ref when queryFn changes
  useEffect(() => {
    queryFnRef.current = queryFn;
  }, [queryFn]);

  const executeQuery = useCallback(async (params?: Partial<QueryState>) => {
    const finalParams = params ? { ...queryState, ...params } : queryState;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await queryFnRef.current(finalParams);
      setData(response.data);
      setPagination(response.pagination);
      
      // Update query state if params were provided
      if (params) {
        setQueryState(finalParams);
      }
      
      hasFetchedRef.current = true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Query failed';
      setError(errorMessage);
      setData([]);
      setPagination({
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
        hasNext: false,
        hasPrev: false,
      });
    } finally {
      setLoading(false);
    }
  }, [queryState]);

  // Update query state and execute query
  const updateQuery = useCallback((updates: Partial<QueryState>) => {
    setQueryState(prevState => {
      const newQuery = { ...prevState, ...updates };
      
      // Reset to page 1 when filters change (except when explicitly changing page)
      if ('page' in updates) {
        return newQuery;
      } else {
        return { ...newQuery, page: 1 };
      }
    });
  }, []);

  // Execute query when query state changes, but only after initial render if autoFetch is true
  useEffect(() => {
    if (autoFetch) {
      executeQuery();
    }
  }, [queryState, autoFetch, executeQuery]);

  // Helper functions for common operations
  const setPage = useCallback((page: number) => {
    updateQuery({ page });
  }, [updateQuery]);

  const setLimit = useCallback((limit: number) => {
    updateQuery({ limit, page: 1 });
  }, [updateQuery]);

  const setSort = useCallback((sortBy: string, sortOrder?: 'asc' | 'desc') => {
    setQueryState(prevState => {
      const newSortOrder = sortOrder || (prevState.sortBy === sortBy && prevState.sortOrder === 'asc' ? 'desc' : 'asc');
      return { ...prevState, sortBy, sortOrder: newSortOrder };
    });
  }, []);

  const setSearch = useCallback((search: string) => {
    updateQuery({ search });
  }, [updateQuery]);

  const setFilter = useCallback((key: string, value: any) => {
    updateQuery({ [key]: value });
  }, [updateQuery]);

  const clearFilters = useCallback(() => {
    updateQuery({
      search: '',
      // Reset other filter fields but keep pagination and sorting
      page: 1,
    });
  }, [updateQuery]);

  const refresh = useCallback(() => {
    executeQuery();
  }, [executeQuery]);

  return {
    // Data
    data,
    pagination,
    loading,
    error,
    
    // Query state
    queryState,
    
    // Actions
    executeQuery,
    updateQuery,
    setPage,
    setLimit,
    setSort,
    setSearch,
    setFilter,
    clearFilters,
    refresh,
  };
}