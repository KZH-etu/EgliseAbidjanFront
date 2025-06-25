import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServices } from "../providers/serviceProvider";
import { NewTag } from "../types/api";

export function useTags() {
  const { tagService } = useServices();
  const queryClient = useQueryClient();

  // Fetch all tags
  const { data: tags = [], isLoading: loading, error } = useQuery({
    queryKey: ["tags"],
    queryFn: () => tagService.fetchTags(),
  });

  // Add tag
  const addMutation = useMutation({
    mutationFn: (body: NewTag) => tagService.createTag(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tags"] }),
  });

  // Update tag
  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: NewTag }) =>
      tagService.updateTag(id, body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tags"] }),
  });

  // Remove tag
  const removeMutation = useMutation({
    mutationFn: (id: string) => tagService.deleteTag(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tags"] }),
  });

  // Search tags
  const searchTags = (query: string) => tagService.searchTags(query);

  // Fetch tag summaries
  const fetchTagSummaries = () => tagService.fetchTagSummaries();

  return {
    tags,
    loading,
    error: error ? String(error) : null,
    searchTags,
    fetchTagSummaries,
    addTag: addMutation.mutateAsync,
    updateTag: (id: string, body: NewTag) => updateMutation.mutateAsync({ id, body }),
    removeTag: removeMutation.mutateAsync,
  };
}