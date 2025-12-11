import { getHotels } from "@/lib/api";
import type { Hotel, HotelAPI, HotelsMap } from "@/types";

const mapHotelToFrontend = (hotel: HotelAPI): Hotel => ({
  id: hotel.id,
  name: hotel.name,
  image: hotel.img,
  cityId: hotel.cityId,
  cityName: hotel.cityName,
  countryId: hotel.countryId,
  countryName: hotel.countryName,
});

const hotelsCache = new Map<string, Hotel[]>();

export const fetchHotelsByCountry = async (
  countryId: string,
): Promise<Hotel[]> => {
  if (hotelsCache.has(countryId)) {
    return hotelsCache.get(countryId)!;
  }

  const response = await getHotels(countryId);

  if (!response.ok) {
    throw new Error("Failed to fetch hotels");
  }

  const data: HotelsMap = await response.json();
  const hotels: Hotel[] = Object.values(data).map(mapHotelToFrontend);

  hotelsCache.set(countryId, hotels);

  return hotels;
};

export const getHotelById = (
  hotels: Hotel[],
  hotelId: string,
): Hotel | undefined => {
  return hotels.find((hotel) => String(hotel.id) === hotelId);
};

export const clearHotelsCache = (): void => {
  hotelsCache.clear();
};
