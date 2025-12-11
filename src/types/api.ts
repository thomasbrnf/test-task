export interface CountryAPI {
  id: string;
  name: string;
  flag: string;
}

export interface CityAPI {
  id: number;
  name: string;
  countryId: string;
}

export interface HotelAPI {
  id: number;
  name: string;
  img: string;
  cityId: number;
  cityName: string;
  countryId: string;
  countryName: string;
}

export interface PriceAPI {
  id: string;
  hotelID: string;
  amount: number;
  currency: string;
  startDate: string;
  endDate: string;
}

export interface StartSearchResponse {
  token: string;
  waitUntil: string;
}

export interface GetSearchPricesResponse {
  prices: Record<string, PriceAPI>;
}

export interface SearchError {
  code: number;
  error: true;
  message: string;
  waitUntil?: string;
}

export interface StopSearchResponse {
  status: "cancelled";
  message: string;
}

export type CountriesMap = Record<string, CountryAPI>;
export type HotelsMap = Record<string, HotelAPI>;
