export interface CountryAPI {
  id: string;
  name: string;
  flag: string;
}

export interface CityAPI {
  id: number;
  name: string;
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

export type CountriesMap = Record<string, CountryAPI>;
export type HotelsMap = Record<string, HotelAPI>;
