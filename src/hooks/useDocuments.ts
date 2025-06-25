import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServices } from "../providers/serviceProvider";
import { NewDocument, DocumentUpdate } from "../types/api";

export function useDocuments() {
  const { documentService } = useServices();
  const queryClient = useQueryClient();

  // Fetch all documents
  const { data: docs = [], isLoading: loadingDocs, error: errorDocs } = useQuery({
    queryKey: ["documents"],
    queryFn: () => documentService.fetchDocuments(),
  });

  // Add document
  const addMutation = useMutation({
    mutationFn: (body: NewDocument) => documentService.createDocument(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["documents"] }),
  });

  // Update document
  const patchMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: DocumentUpdate }) =>
      documentService.updateDocument(id, body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["documents"] }),
  });

  // Remove document
  const removeMutation = useMutation({
    mutationFn: (id: string) => documentService.deleteDocument(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["documents"] }),
  });

  // Fetch meta by document
  const fetchMetaByDocument = (documentId: string) =>
    documentService.fetchMetaByDocument(documentId);

  return {
    docs,
    loadingDocs,
    errorDocs: errorDocs ? String(errorDocs) : null,
    fetchMetaByDocument,
    add: addMutation.mutateAsync,
    patch: (id: string, body: DocumentUpdate) => patchMutation.mutateAsync({ id, body }),
    remove: removeMutation.mutateAsync,
  };
}