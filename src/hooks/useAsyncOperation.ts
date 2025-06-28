import { useState, useCallback } from 'react';
import { LoadingState } from '../types/common';

interface UseAsyncOperationOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useAsyncOperation<T extends any[]>(
  operation: (...args: T) => Promise<void>,
  options: UseAsyncOperationOptions = {}
) {
  const [status, setStatus] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (...args: T) => {
    setStatus('loading');
    setError(null);
    
    try {
      await operation(...args);
      setStatus('success');
      options.onSuccess?.();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setStatus('error');
      options.onError?.(err as Error);
    }
  }, [operation, options]);

  const reset = useCallback(() => {
    setStatus('idle');
    setError(null);
  }, []);

  return {
    execute,
    reset,
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    isError: status === 'error',
    error,
    status
  };
}