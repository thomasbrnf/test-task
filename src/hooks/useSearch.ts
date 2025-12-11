import { useCallback, useRef } from "react";
import { useSearchStore } from "@/store";
import { executeSearch } from "@/services/searchService";
import { fetchHotelsByCountry } from "@/services";

export const useSearch = () => {
  const {
    selectedDestination,
    searchStatus,
    results,
    error,
    setSearchStatus,
    setResults,
    setError,
    resetSearch,
    setHotels,
  } = useSearchStore();

  const abortControllerRef = useRef<AbortController | null>(null);

  const search = useCallback(async () => {
    if (!selectedDestination) return;

    let countryId: string | null = null;

    if (selectedDestination.type === "country") {
      countryId = selectedDestination.id;
    } else if (
      selectedDestination.type === "city" ||
      selectedDestination.type === "hotel"
    ) {
      countryId = selectedDestination.countryId;
    }

    if (!countryId) {
      setError("Не вдалося визначити країну для пошуку");
      setSearchStatus("error");
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    resetSearch();
    setSearchStatus("loading");

    try {
      const [tourResults, hotelsData] = await Promise.all([
        executeSearch(countryId),
        fetchHotelsByCountry(countryId),
      ]);

      setResults(tourResults);
      setHotels(hotelsData);
      setSearchStatus("success");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Помилка пошуку турів. Спробуйте ще раз.";

      setError(message);
      setSearchStatus("error");
    }
  }, [
    selectedDestination,
    resetSearch,
    setSearchStatus,
    setResults,
    setError,
    setHotels,
  ]);

  return {
    search,
    isIdle: searchStatus === "idle",
    isLoading: searchStatus === "loading",
    isError: searchStatus === "error",
    isEmpty: searchStatus === "success" && results.length === 0,
    isSuccess: searchStatus === "success" && results.length > 0,
    results,
    error,
  };
};
