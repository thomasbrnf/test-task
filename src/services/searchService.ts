import { getSearchPrices, startSearchPrices } from "@/lib/api";
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
): Promise<TourPrice[]> => {
  try {
    const response = await getSearchPrices(token);
    const data = await response.json();

    if (!response.ok || isSearchError(data)) {
      const error = data as SearchError;

      if (error.code === 425 && error.waitUntil) {
        await waitUntil(error.waitUntil);
        return fetchSearchResults(token, 0);
      }

      throw error;
    }

    const result = data as GetSearchPricesResponse;
    return Object.values(result.prices).map(mapPriceToTour);
  } catch (error) {
    if (retryCount < MAX_RETRIES && !isSearchError(error)) {
      return fetchSearchResults(token, retryCount + 1);
    }
    throw error;
  }
};

export const executeSearch = async (
  countryId: string,
): Promise<TourPrice[]> => {
  const { token, waitUntil: waitTime } = await initiateSearch(countryId);
  console.log(token, waitTime);

  await waitUntil(waitTime);

  return fetchSearchResults(token);
};
