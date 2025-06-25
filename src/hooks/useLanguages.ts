import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServices } from "../providers/serviceProvider";
import { LanguageOption, NewLanguage, LanguageUpdate } from "../types/api";

export function useLanguages() {
  const { languageService } = useServices();
  const queryClient = useQueryClient();

  // Fetch all languages
  const { data: languages = [], isLoading: loading, error } = useQuery({
    queryKey: ["languages"],
    queryFn: () => languageService.fetchLanguages(),
  });

  // Add language
  const addMutation = useMutation({
    mutationFn: (body: NewLanguage) => languageService.createLanguage(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["languages"] }),
  });

  // Update language
  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: LanguageUpdate }) =>
      languageService.updateLanguage(id, body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["languages"] }),
  });

  // Remove language
  const removeMutation = useMutation({
    mutationFn: (id: string) => languageService.deleteLanguage(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["languages"] }),
  });

  // Get language summaries
  const getLanguageSummaries = async (): Promise<LanguageOption[]> =>
    languageService.fetchLanguageSummaries();

  return {
    languages,
    loading,
    error: error ? String(error) : null,
    addLanguage: addMutation.mutateAsync,
    updateLanguage: (id: string, body: LanguageUpdate) => updateMutation.mutateAsync({ id, body }),
    removeLanguage: removeMutation.mutateAsync,
    getLanguageSummaries,
  };
}