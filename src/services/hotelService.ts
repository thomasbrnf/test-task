import { getHotel, getHotels } from "@/lib/api";
import type { Hotel, HotelAPI, HotelDetailsAPI, HotelsMap } from "@/types";

const mapHotelToFrontend = (hotel: HotelAPI): Hotel => ({
  id: hotel.id,
  name: hotel.name,
  image: hotel.img,
  cityId: hotel.cityId,
  cityName: hotel.cityName,
  countryId: hotel.countryId,
  countryName: hotel.countryName,
});

export const mapHotelDetailsToFrontend = (hotel: HotelDetailsAPI): Hotel => ({
  id: hotel.id,
  name: hotel.name,
  image: hotel.img,
  cityId: hotel.cityId,
  cityName: hotel.cityName,
  countryId: hotel.countryId,
  countryName: hotel.countryName,
  description: hotel.description,
  services: hotel.services,
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

export const fetchHotelById = async (hotelId: string): Promise<Hotel> => {
  const id = Number(hotelId);
  if (Number.isNaN(id)) {
    throw new Error("Invalid hotel id");
  }

  const response = await getHotel(id);

  if (!response.ok) {
    throw new Error("Failed to fetch hotel");
  }

  const data: HotelDetailsAPI = await response.json();

  return mapHotelDetailsToFrontend(data);
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
