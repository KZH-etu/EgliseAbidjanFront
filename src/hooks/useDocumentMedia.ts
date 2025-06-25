import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServices } from "../providers/serviceProvider";
import { NewDocumentMedia, DocumentMediaUpdate } from "../types/api";

export function useDocumentMedia() {
  const { documentMediaService } = useServices();
  const queryClient = useQueryClient();

  // Fetch all media
  const { data: items = [], isLoading: loading, error } = useQuery({
    queryKey: ["documentMedia"],
    queryFn: () => documentMediaService.fetchAllMedia(),
  });

  // Add media
  const addMutation = useMutation({
    mutationFn: (body: NewDocumentMedia) => documentMediaService.createMedia(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["documentMedia"] }),
  });

  // Update media
  const patchMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: DocumentMediaUpdate }) =>
      documentMediaService.updateMedia(id, body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["documentMedia"] }),
  });

  // Remove media
  const removeMutation = useMutation({
    mutationFn: (id: string) => documentMediaService.deleteMedia(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["documentMedia"] }),
  });

  return {
    items,
    loading,
    error: error ? String(error) : null,
    add: addMutation.mutateAsync,
    patch: (id: string, body: DocumentMediaUpdate) => patchMutation.mutateAsync({ id, body }),
    remove: removeMutation.mutateAsync,
  };
}