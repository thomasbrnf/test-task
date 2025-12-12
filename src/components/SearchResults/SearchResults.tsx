import { useHotels, useSearch } from "@/hooks";
import Loader from "../ui/Loader";
import ErrorMessage from "../ui/ErrorMessage";
import EmptyState from "../ui/EmptyState";

import "./SearchResults.scss";
import { useMemo } from "react";
import TourCard from "../ui/TourCard";

const SearchResults = () => {
  const { isIdle, isLoading, isError, isEmpty, isSuccess, error, results } =
    useSearch();
  const { hotels, findHotel } = useHotels();

  const toursWithHotels = useMemo(() => {
    if (!results.length || !hotels.length) return [];

    return [...results]
      .sort((a, b) => a.amount - b.amount)
      .map((tour) => ({
        tour,
        hotel: findHotel(tour.hotelId),
      }))
      .filter((item) => item.hotel !== undefined);
  }, [results, hotels, findHotel]);

  if (isIdle) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="search-results">
        <Loader text="Шукаємо тури..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="search-results">
        <ErrorMessage message={error || "Помилка пошуку турів"} />
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="search-results">
        <EmptyState />
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="search-results">
        <div className="search-results__grid">
          {toursWithHotels.map(({ tour, hotel }) => (
            <TourCard key={`${tour.id}-${hotel!.id}`} tour={tour} hotel={hotel!} />
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default SearchResults;
