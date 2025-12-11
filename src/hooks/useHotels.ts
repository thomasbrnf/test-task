import { getHotelById } from "@/services";
import { useSearchStore } from "@/store";
import type { Hotel } from "@/types";
import { useCallback } from "react";

export const useHotels = () => {
  const { hotels } = useSearchStore();

  const findHotel = useCallback(
    (hotelId: string): Hotel | undefined => {
      return getHotelById(hotels, hotelId);
    },
    [hotels],
  );

  return {
    hotels,
    findHotel,
  };
};
