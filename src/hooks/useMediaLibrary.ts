import { useCallback, useEffect, useMemo, useState } from "react";
import { useServices } from "../providers/serviceProvider";
import { MediaLibraryItemDto } from "../types/mediaLibrary";


export const useMediaLibrary = () => {
    const { mediaLibraryService } = useServices();
    const [items, setItems] = useState<MediaLibraryItemDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [loadingView, setLoadingView] = useState(true);
    const [errorView, setErrorView] = useState<string | null>(null);

    const loadItems = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await mediaLibraryService.fetchItems();
            setItems(data);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, [mediaLibraryService]);

    useEffect(() => {
        loadItems();
    }, [loadItems]);

    const fetchView = useCallback(async (id: string, languageId: string, type: string) => {
        setLoadingView(true);
        setErrorView(null);
        try {
            const view = await mediaLibraryService.fetchView(id, languageId, type);
            setLoadingView(false);
            return view;
        } catch (e: any) {
            setErrorView(e.message);
            setLoadingView(false);
            throw e; // Re-throw to handle in the component
        } finally {
            setLoadingView(false);
        }
    }, [mediaLibraryService]);


    const memoizedItems = useMemo(() => ({
        items,
        loadItems,
        fetchView,
        loading,
        error,
        loadingView,
        errorView,
    }),[ items, loadItems, fetchView, loading, error,
        loadingView, errorView, ]);

    return memoizedItems;
}