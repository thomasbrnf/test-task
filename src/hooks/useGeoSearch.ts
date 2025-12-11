import { useRef, useState } from "react";
import { getCountriesService, searchGeoService } from "../services/geoService";
import type { GeoEntity } from "../types";

export const useGeoSearch = () => {
  const [results, setResults] = useState<GeoEntity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchCache = useRef<Map<string, GeoEntity[]>>(new Map());
  const countriesCache = useRef<GeoEntity[] | null>(null);

  const loadCountries = async () => {
    if (countriesCache.current) {
      setResults(countriesCache.current);
      return;
    }

    setIsLoading(true);
    try {
      const countries = await getCountriesService();
      countriesCache.current = countries;
      setResults(countries);
    } catch (error) {
      console.error("Failed to load countries:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };
  const search = async (query: string) => {
    if (!query) {
      await loadCountries();
      return;
    }

    const cached = searchCache.current.get(query.toLowerCase());
    if (cached) {
      setResults(cached);
      return;
    }

    setIsLoading(true);
    try {
      const searchResults = await searchGeoService(query);
      searchCache.current.set(query.toLowerCase(), searchResults);
      setResults(searchResults);
    } catch (error) {
      console.error("Search failed:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setResults([]);
  };

  return {
    results,
    isLoading,
    loadCountries,
    search,
    clearResults,
  };
};
