import { useCallback, useEffect, useMemo, useState } from "react";
import { useServices } from "../providers/serviceProvider";
import { TagResponseDto } from "../types/tags";
import { CreateTagDto } from "../types/tags";


export const useTags = () => {
    const { tagService } = useServices();
    const [tags, setTags] = useState<TagResponseDto[]>([]);
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

    const fetchTagSummaries = useCallback(async () => {
        const summaries = await tagService.fetchTagSummaries();
        return summaries;
    }, [tagService]);

    const addTag = useCallback(async (tag: CreateTagDto) => {
        await tagService.createTag(tag);
        await loadTags(); // Reload tags after adding
    }, [tagService, loadTags]);  

    const updateTag = useCallback(async (id: string, tag: CreateTagDto) => {
        await tagService.updateTag(id, tag);
        await loadTags(); // Reload tags after updating
    }, [tagService, loadTags]);

    const removeTag = useCallback(async (id: string) => {
        await tagService.deleteTag(id);
        await loadTags(); // Reload tags after removing
    }, [tagService, loadTags]);

    const memoizedTags = useMemo(() => ({
        tags,
        loadTags,
        loading,
        error,
        searchTags,
        fetchTagSummaries,
        addTag,
        updateTag,
        removeTag
    }),[tags, loadTags, loading, error, searchTags, fetchTagSummaries]);

    return memoizedTags;
}