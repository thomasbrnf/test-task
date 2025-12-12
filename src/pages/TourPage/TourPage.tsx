import ErrorMessage from "@/components/ui/ErrorMessage";
import HotelInfo from "@/components/ui/HotelInfo/HotelInfo";
import HotelServices from "@/components/ui/HotelServices/HotelServices";
import Loader from "@/components/ui/Loader";
import TourInfo from "@/components/ui/TourInfo/TourInfo";
import { fetchHotelById, fetchPriceById } from "@/services";
import type { Hotel, TourPrice } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./TourPage.scss";
import HotelImage from "@/components/ui/HotelImage";

const TourPage = () => {
  const { tourId, hotelId } = useParams();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [tour, setTour] = useState<TourPrice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!tourId || !hotelId) return;

      setIsLoading(true);
      try {
        const [tourData, hotelData] = await Promise.all([
          fetchPriceById(tourId),
          fetchHotelById(hotelId),
        ]);

        setTour(tourData);
        setHotel(hotelData);
      } catch (err) {
        setError("Не вдалося завантажити дані туру");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [tourId, hotelId]);

  if (isLoading) {
    return (
      <div className="tour-page">
        <Loader text="Завантаження туру..." />
      </div>
    );
  }

  if (error || !tour || !hotel) {
    return (
      <div className="tour-page">
        <ErrorMessage message={error || "Тур не знайдено"} />
      </div>
    );
  }

  return (
    <div className="tour-page">
      <div className="tour-page__container">
        <HotelImage
          src={hotel.image}
          loading="lazy"
          size="large"
          alt={hotel.name}
        />
        <HotelInfo hotel={hotel} size="large" />

        {hotel.description && (
          <div className="tour-page__description">
            <h4 className="tour-page__section-title">Опис</h4>
            <p className="tour-page__text">{hotel.description}</p>
          </div>
        )}

        <HotelServices hotel={hotel} />

        <TourInfo tour={tour} layout="block" />
      </div>
    </div>
  );
};

export default TourPage;
