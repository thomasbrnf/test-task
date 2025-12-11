import { useCallback } from "react";
import { useSearchStore } from "@/store";
import { executeSearch } from "@/services/searchService";

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
  } = useSearchStore();
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
      return;
    }

    resetSearch();
    setSearchStatus("loading");

    try {
      const tourResults = await executeSearch(countryId);
      setResults(tourResults);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Помилка пошуку. Спробуйте ще раз.";
      setError(message);
    }
  }, [selectedDestination, resetSearch, setSearchStatus, setResults, setError]);

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
