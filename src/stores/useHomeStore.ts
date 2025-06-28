import { create } from 'zustand';
import { SermonCardData, EventCardData } from '../types/api';
import { DocumentCategory, MediaType } from '../types/api';

interface HomePage {
  sermons: (SermonCardData & { type: MediaType })[];
  events: EventCardData[];
}

interface HomeState {
  home?: HomePage;
  loading: boolean;
  error?: Error;
  hasFetched: boolean;
  fetchHome: () => Promise<void>;
}

// Mock data
const mockSermons: (SermonCardData & { type: MediaType })[] = [
  {
    id: '1',
    title: 'Walking in Faith',
    categories: [DocumentCategory.SERMON],
    type: MediaType.VIDEO,
    sermonMeta: {
      preacher: 'Pastor John',
      preachedAt: new Date('2024-01-15'),
      location: 'Main Sanctuary'
    }
  },
  {
    id: '2',
    title: 'The Power of Prayer',
    categories: [DocumentCategory.SERMON],
    type: MediaType.AUDIO,
    sermonMeta: {
      preacher: 'Pastor Jane',
      preachedAt: new Date('2024-01-20'),
      location: 'Chapel'
    }
  },
  {
    id: '3',
    title: 'Hope in Difficult Times',
    categories: [DocumentCategory.SERMON],
    type: MediaType.VIDEO,
    sermonMeta: {
      preacher: 'Pastor Mark',
      preachedAt: new Date('2024-01-25'),
      location: 'Main Sanctuary'
    }
  }
];

const mockEvents: EventCardData[] = [
  {
    id: '1',
    title: 'Sunday Service',
    categories: [DocumentCategory.EVENT],
    eventMeta: {
      type: 'CONVENTION' as any,
      startTime: new Date('2024-02-15T10:00:00'),
      location: 'Main Sanctuary'
    }
  },
  {
    id: '2',
    title: 'Prayer Meeting',
    categories: [DocumentCategory.EVENT],
    eventMeta: {
      type: 'PRAYER' as any,
      startTime: new Date('2024-02-20T19:00:00'),
      location: 'Chapel'
    }
  }
];

export const useHomeStore = create<HomeState>((set, get) => ({
  home: undefined,
  loading: false,
  error: undefined,
  hasFetched: false,

  fetchHome: async () => {
    const { hasFetched } = get();
    if (hasFetched) return;
    
    set({ loading: true, error: undefined });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const homeData: HomePage = {
        sermons: mockSermons,
        events: mockEvents
      };
      set({ home: homeData, hasFetched: true, loading: false });
    } catch (err) {
      set({ error: err as Error, loading: false });
    }
  },
}));