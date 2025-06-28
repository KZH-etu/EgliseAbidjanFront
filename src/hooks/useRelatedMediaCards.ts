import { useState, useEffect } from 'react';
import { BasicMediaCard } from '../types/api';

// Mock service to fetch related media cards by IDs
const fetchRelatedMediaCards = async (ids: string[]): Promise<BasicMediaCard[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Mock data - in real app this would fetch from your API
  const mockCards: BasicMediaCard[] = ids.map((id, index) => ({
    id,
    title: `Related Item ${index + 1}`,
    description: `Description for related item ${index + 1}`,
    categories: ['SERMON' as any],
    mediaType: 'AUDIO' as any,
    tags: [{ id: 'tag1', title: 'Faith' }],
    language: { id: 'en', name: 'English' },
    thumbnailUrl: undefined,
    duration: 1800 + (index * 300), // 30 minutes + variations
    createdAt: new Date(),
    primaryPerson: `Speaker ${index + 1}`,
    location: 'Main Sanctuary',
    recordedAt: new Date(Date.now() - (index * 86400000)) // Recent dates
  }));
  
  return mockCards;
};

export function useRelatedMediaCards(relatedIds: string[]) {
  const [relatedCards, setRelatedCards] = useState<BasicMediaCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (relatedIds.length === 0) {
      setRelatedCards([]);
      return;
    }

    const fetchCards = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const cards = await fetchRelatedMediaCards(relatedIds);
        setRelatedCards(cards);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch related items');
        setRelatedCards([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [relatedIds]);

  return {
    relatedCards,
    loading,
    error
  };
}