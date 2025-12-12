import { getPrice } from "@/lib/api";
import type { PriceAPI, TourPrice } from "@/types";

const mapPriceToTour = (p: PriceAPI): TourPrice => ({
  id: p.id,
  hotelId: p.hotelID,
  amount: p.amount,
  currency: p.currency,
  startDate: p.startDate,
  endDate: p.endDate,
});

export const fetchPriceById = async (priceId: string): Promise<TourPrice> => {
  if (!priceId) throw new Error("priceId is required");

  const response = await getPrice(priceId);
  if (!response.ok) {
    const errData = await response.json().catch(() => null);
    throw new Error(errData?.message ?? "Failed to fetch price");
  }

  const data: PriceAPI = await response.json();
  if (!data || !data.id) throw new Error("Price not found");
  return mapPriceToTour(data);
};
