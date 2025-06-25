import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServices } from "../providers/serviceProvider";
import { NewDocumentVersion, DocumentVersionUpdate } from "../types/api";

export function useDocumentVersions() {
  const { documentVersionsService } = useServices();
  const queryClient = useQueryClient();

  // Fetch all versions
  const { data: items = [], isLoading: loading, error } = useQuery({
    queryKey: ["documentVersions"],
    queryFn: () => documentVersionsService.fetchAllVersions(),
  });

  // Add version
  const addMutation = useMutation({
    mutationFn: (body: NewDocumentVersion) => documentVersionsService.createVersion(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["documentVersions"] }),
  });

  // Update version
  const patchMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: DocumentVersionUpdate }) =>
      documentVersionsService.updateVersion(id, body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["documentVersions"] }),
  });

  // Remove version
  const removeMutation = useMutation({
    mutationFn: (id: string) => documentVersionsService.deleteVersion(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["documentVersions"] }),
  });

  // Search versions
  const searchVersions = async (query: string) =>
    documentVersionsService.searchVersions(query);

  return {
    items,
    loading,
    error: error ? String(error) : null,
    add: addMutation.mutateAsync,
    patch: (id: string, body: DocumentVersionUpdate) => patchMutation.mutateAsync({ id, body }),
    remove: removeMutation.mutateAsync,
    searchVersions,
  };
}