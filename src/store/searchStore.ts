import { create } from "zustand";
import type { GeoEntity, Hotel, TourPrice } from "@/types";

type SearchStatus = "idle" | "loading" | "success" | "error";

interface SearchState {
  destination: string;
  selectedDestination: GeoEntity | null;

  searchStatus: SearchStatus;
  results: TourPrice[];
  error: string | null;

  hotels: Hotel[];

  setDestination: (value: string) => void;
  setSelectedDestination: (entity: GeoEntity | null) => void;

  setSearchStatus: (status: SearchStatus) => void;
  setResults: (results: TourPrice[]) => void;
  setError: (error: string | null) => void;
  resetSearch: () => void;

  setHotels: (hotels: Hotel[]) => void;
}

const initialState = {
  destination: "",
  selectedDestination: null,
  searchStatus: "idle" as SearchStatus,
  results: [],
  error: null,
  hotels: [],
};

export const useSearchStore = create<SearchState>((set) => ({
  ...initialState,

  setDestination: (value) => set({ destination: value }),
  setSelectedDestination: (entity) => set({ selectedDestination: entity }),
  reset: () => set(initialState),

  setSearchStatus: (status) => set({ searchStatus: status }),
  setResults: (results) => set({ results, searchStatus: "success" }),
  setError: (error) => set({ error, searchStatus: "error" }),
  resetSearch: () =>
    set({
      searchStatus: "idle",
      results: [],
      error: null,
    }),

  setHotels: (hotels) => set({ hotels }),
}));
