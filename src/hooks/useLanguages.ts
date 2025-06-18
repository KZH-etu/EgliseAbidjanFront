import { useState, useEffect, useCallback, useMemo } from 'react';
import { useServices } from '../providers/serviceProvider';
import { LanguageResponseDto, LanguageSummaryDto } from '../types/languages';
import { CreateLanguageDto, UpdateLanguageDto } from "../types/languages";

export function useLanguages() {
    const { languageService } = useServices();
    const [languages, setLanguages] = useState<LanguageResponseDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string|null>(null);

    const loadLanguages = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await languageService.fetchLanguages();
      setLanguages(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

    useEffect(() => {
        loadLanguages();
    }, [loadLanguages, languageService]);

    const getLanguageSummaries = useCallback(async (): Promise<LanguageSummaryDto[]> => {
        return await languageService.fetchLanguageSummaries();
    }, [languageService]);

    const removeLanguage = useCallback(async (id: string) => {
        await languageService.deleteLanguage(id);
        await loadLanguages();
    }, [loadLanguages, languageService]);

    const addLanguage = useCallback(async (body: CreateLanguageDto) => {
        await languageService.createLanguage(body);
        await loadLanguages();
    }, [loadLanguages, languageService]);

    const updateLanguage = useCallback(async (id: string, body: UpdateLanguageDto) => {
        await languageService.updateLanguage(id, body);
        await loadLanguages();
    }, [loadLanguages, languageService]);

    const memoizedLanguages = useMemo(() => ({
        languages,
        loadLanguages,
        loading,
        addLanguage,
        updateLanguage,
        removeLanguage,
        getLanguageSummaries,
        error
    }), [languages, loadLanguages, loading, addLanguage, updateLanguage, removeLanguage, getLanguageSummaries, error]);

  return memoizedLanguages;
}