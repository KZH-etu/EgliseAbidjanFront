import { create } from 'zustand';
import { Subscriber, NewSubscriber, SubscriberUpdate } from '../types/api';

interface SubscriberState {
  items: Subscriber[];
  loading: boolean;
  error: string | null;
  fetchAll: () => Promise<void>;
  create: (data: NewSubscriber) => Promise<void>;
  update: (id: string, data: SubscriberUpdate) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

// Mock data
const mockSubscribers: Subscriber[] = [
  {
      id: '1',
      email: 'john.doe@example.com',
      subscribedAt: new Date('2024-01-15T09:23:00'),
      isActive: true,
      createdAt: new Date('2024-01-15T09:23:00'),
      updatedAt: new Date('2024-02-01T14:12:00')
  },
  {
      id: '2',
      email: 'jane.smith@example.com',
      subscribedAt: new Date('2024-02-20T16:45:00'),
      isActive: true,
      createdAt: new Date('2024-02-20T16:45:00'),
      updatedAt: new Date('2024-03-05T11:30:00')
  },
  {
      id: '3',
      email: 'marie.martin@example.com',
      subscribedAt: new Date('2024-03-10T08:10:00'),
      isActive: true,
      createdAt: new Date('2024-03-10T08:10:00'),
      updatedAt: new Date('2024-03-22T17:55:00')
  },
];

export const useSubscriberStore = create<SubscriberState>((set) => ({
  items: mockSubscribers,
  loading: false,
  error: null,

  fetchAll: async () => {
    set({ loading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ items: mockSubscribers, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch subscribers', loading: false });
    }
  },

  create: async (data: NewSubscriber) => {
    set({ loading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      const newSubscriber: Subscriber = {
          id: Date.now().toString(),
          email: data.email,
          subscribedAt: new Date(),
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
      };
      set(state => ({ 
        items: [...state.items, newSubscriber], 
        loading: false 
      }));
    } catch (error) {
      set({ error: 'Failed to create subscriber', loading: false });
    }
  },

  update: async (id: string, data: SubscriberUpdate) => {
    set({ loading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      set(state => ({
        items: state.items.map(item => 
          item.id === id ? { ...item, ...data } : item
        ),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to update subscriber', loading: false });
    }
  },

  remove: async (id: string) => {
    set({ loading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      set(state => ({
        items: state.items.filter(item => item.id !== id),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to remove subscriber', loading: false });
    }
  },
}));