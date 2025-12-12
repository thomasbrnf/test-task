import {
  getSearchPrices,
  startSearchPrices,
  stopSearchPrices,
} from "@/lib/api";
import { useSearchStore } from "@/store";
import type {
  GetSearchPricesResponse,
  PriceAPI,
  SearchError,
  StartSearchResponse,
  TourPrice,
} from "@/types";

const mapPriceToTour = (price: PriceAPI): TourPrice => ({
  id: price.id,
  hotelId: price.hotelID,
  amount: price.amount,
  currency: price.currency,
  startDate: price.startDate,
  endDate: price.endDate,
});

const MAX_RETRIES = 2;

const waitUntil = (isoTime: string): Promise<void> => {
  const waitTime = new Date(isoTime).getTime() - Date.now();
  if (waitTime <= 0) return Promise.resolve();
  return new Promise((resolve) => setTimeout(resolve, waitTime));
};

const isSearchError = (data: unknown): data is SearchError => {
  return typeof data === "object" && data !== null && "error" in data;
};

const getActiveToken = () => useSearchStore.getState().activeToken;

export const stopSearch = async (token: string) => {
  try {
    const res = await stopSearchPrices(token);

    if (!res.ok) {
      const errData = await res.json().catch(() => null);
      throw new Error(errData?.message ?? "Помилка зупинки пошуку");
    }

    return;
  } catch (error) {
    throw error;
  }
};

export const initiateSearch = async (
  countryId: string,
): Promise<StartSearchResponse> => {
  const response = await startSearchPrices(countryId);
  const data = await response.json();

  if (!response.ok || isSearchError(data)) {
    throw data;
  }

  return data as StartSearchResponse;
};

export const fetchSearchResults = async (
  token: string,
  retryCount = 0,
): Promise<TourPrice[] | null> => {
  if (token !== getActiveToken()) {
    return null;
  }

  try {
    const response = await getSearchPrices(token);

    if (token !== getActiveToken()) return null;

    const data = await response.json();

    if (!response.ok || isSearchError(data)) {
      const error = data as SearchError;

      if (error.code === 425 && error.waitUntil) {
        await waitUntil(error.waitUntil);

        if (token !== getActiveToken()) return null;

        return fetchSearchResults(token, 0);
      }

      throw error;
    }

    if (token !== getActiveToken()) return null;

    const result = data as GetSearchPricesResponse;
    return Object.values(result.prices).map(mapPriceToTour);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.startsWith("Search with this token was not found.")
    ) {
      return null;
    }

    if (retryCount < MAX_RETRIES && !isSearchError(error)) {
      if (token !== getActiveToken()) return null;

      return fetchSearchResults(token, retryCount + 1);
    }
    throw error;
  }
};

export const executeSearch = async (
  countryId: string,
): Promise<TourPrice[] | null> => {
  const { setActiveToken } = useSearchStore.getState();

  const { token, waitUntil: waitTime } = await initiateSearch(countryId);

  setActiveToken(token);

  await waitUntil(waitTime);

  return fetchSearchResults(token);
};
