import { create } from "zustand";
import type { GeoEntity } from "@/types";

interface SearchState {
  destination: string;
  selectedDestination: GeoEntity | null;

  setDestination: (value: string) => void;
  setSelectedDestination: (entity: GeoEntity | null) => void;
  reset: () => void;
}

const initialState = {
  destination: "",
  selectedDestination: null,
};

export const useSearchStore = create<SearchState>((set) => ({
  ...initialState,

  setDestination: (value) => set({ destination: value }),
  setSelectedDestination: (entity) => set({ selectedDestination: entity }),
  reset: () => set(initialState),
}));
