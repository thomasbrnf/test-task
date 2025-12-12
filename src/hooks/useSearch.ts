import { useCallback } from "react";
import { useSearchStore } from "@/store";
import { executeSearch, stopSearch } from "@/services/searchService";
import { fetchHotelsByCountry } from "@/services";

export const useSearch = () => {
  const {
    selectedDestination,
    searchStatus,
    results,
    error,
    activeToken,
    isCancelling,
    activeSearchId,
    setSearchStatus,
    setResults,
    setError,
    resetSearch,
    setHotels,
    setIsCancelling,
    setActiveToken,
    setActiveSearchId,
  } = useSearchStore();

  const cancelSearchIfActive = useCallback(async (): Promise<void> => {
    if (!activeToken) return;
    setIsCancelling(true);
    try {
      await stopSearch(activeToken);
      setActiveToken(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsCancelling(false);
    }
  }, [activeToken, setIsCancelling, setActiveToken]);

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

    if (activeToken) {
      await cancelSearchIfActive();
    }

    resetSearch();
    setSearchStatus("loading");
    setActiveSearchId(selectedDestination.id);

    try {
      const [tourResults, hotelsData] = await Promise.all([
        executeSearch(countryId),
        fetchHotelsByCountry(countryId),
      ]);

      if (!tourResults) {
        return;
      }

      setResults(tourResults);
      setHotels(hotelsData);
      setSearchStatus("success");
      setActiveToken(null);
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
    activeToken,
    cancelSearchIfActive,
    resetSearch,
    setSearchStatus,
    setResults,
    setError,
    setHotels,
    setActiveSearchId,
  ]);

  return {
    search,
    isIdle: searchStatus === "idle",
    isError: searchStatus === "error",
    activeSearchId,
    isLoading: searchStatus === "loading" || isCancelling,
    isCancelling,
    isEmpty: searchStatus === "success" && results.length === 0,
    isSuccess: searchStatus === "success" && results.length > 0,
    results,
    error,
  };
};
