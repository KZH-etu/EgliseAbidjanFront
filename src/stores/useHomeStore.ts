import { HomePageDto } from '../types/homepage';
import { create } from 'zustand';
import * as API from "../services/home"

interface HomeState {
  home?: HomePageDto;
  loading: boolean;
  error?: Error;
  hasFetched: boolean;
  fetchHome: () => Promise<void>;
};

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
      const res = await API.fetchHome()
      set({ home: res.data });
    } catch (err) {
      set({ error: err as Error });
    } finally {
      set({ loading: false });
    }
  },
}));
