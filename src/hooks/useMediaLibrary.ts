import { useQuery } from "@tanstack/react-query";
import { useServices } from "../providers/serviceProvider";

export function useMediaLibrary() {
  const { mediaLibraryService } = useServices();

  // Fetch all media library items
  const { data: items = [], isLoading: loading, error } = useQuery({
    queryKey: ["mediaLibrary"],
    queryFn: () => mediaLibraryService.fetchItems(),
  });

  // Fetch a single view (not cached, just a helper)
  const fetchView = (id: string, languageId: string, type: string) =>
    mediaLibraryService.fetchView(id, languageId, type);

  return {
    items,
    loading,
    error: error ? String(error) : null,
    fetchView,
  };
}