import { getCountries, searchGeo } from "../lib/api";
import type { CountryAPI, CityAPI, HotelAPI } from "../types/api";
import type { GeoEntity, Country, City, GeoHotel } from "../types/geo";

const mapCountryToGeoEntity = (country: CountryAPI): Country => ({
  ...country,
  type: "country",
});

const mapCityToGeoEntity = (city: CityAPI): City => ({
  ...city,
  type: "city",
});

const mapHotelToGeoEntity = (hotel: HotelAPI): GeoHotel => ({
  id: hotel.id,
  name: hotel.name,
  image: hotel.img,
  cityId: hotel.cityId,
  cityName: hotel.cityName,
  countryId: hotel.countryId,
  countryName: hotel.countryName,
  type: "hotel",
});

export const getCountriesService = async (): Promise<Country[]> => {
  const response = await getCountries();
  const data: Record<string, CountryAPI> = await response.json();
  return Object.values(data).map(mapCountryToGeoEntity);
};

export const searchGeoService = async (query: string): Promise<GeoEntity[]> => {
  const response = await searchGeo(query);
  const data = await response.json();

  return Object.values(data).map((item: any) => {
    if ("flag" in item) return mapCountryToGeoEntity(item as CountryAPI);
    if ("img" in item) return mapHotelToGeoEntity(item as HotelAPI);
    return mapCityToGeoEntity(item as CityAPI);
  });
};
