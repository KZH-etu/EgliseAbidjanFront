import { useCallback, useEffect, useMemo, useState } from "react";
import { useServices } from "../providers/serviceProvider";
import { TagSummaryDto } from "../types/tags/tags";


export const useTags = () => {
    const { tagService } = useServices();
    const [tags, setTags] = useState<TagSummaryDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadTags = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const tagData = await tagService.fetchTags();
            setTags(tagData);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, [tagService]);

    useEffect(() => {
        loadTags();
    }, [loadTags]);

    const searchTags = useCallback(async (query: string) => {
        const searchedTags = await tagService.searchTags(query);
        return searchedTags;
    }, [tagService]);

    const memoizedTags = useMemo(() => ({
        tags,
        loadTags,
        loading,
        error,
        searchTags,
    }),[tags, loadTags, loading, error,searchTags]);

    return memoizedTags;
}