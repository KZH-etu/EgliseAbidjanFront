import { useState, useEffect, useCallback } from 'react';
import { useServices } from '../providers/serviceProvider';
import { LanguageSummaryDto } from '../types/languages/languages';

export function useLanguages() {
    const { languageService } = useServices();
    const [languageSummaries, setLanguageSummaries] = useState<LanguageSummaryDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string|null>(null);

    const loadLanguageSummaries = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await languageService.fetchLanguageSummaries();
      setLanguageSummaries(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

    useEffect(() => {
        loadLanguageSummaries();
    }, [loadLanguageSummaries]);


  return { languageSummaries, loadLanguageSummaries, loading, error };
}