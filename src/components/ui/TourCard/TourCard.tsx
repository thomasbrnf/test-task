import { Link } from "react-router-dom";
import type { TourPrice, Hotel } from "@/types";

import "./TourCard.scss";
import HotelInfo from "../HotelInfo";
import TourInfo from "../TourInfo";
import HotelImage from "../HotelImage";

interface TourCardProps {
  tour: TourPrice;
  hotel: Hotel;
}

const TourCard = ({ tour, hotel }: TourCardProps) => {
  return (
    <article className="tour-card">
      <HotelImage
        src={hotel.image}
        loading="lazy"
        size="small"
        alt={hotel.name}
      />

      <div className="tour-card__content">
        <HotelInfo hotel={hotel} size="small" />
        <TourInfo tour={tour} layout="inline" />

        <Link className="tour-card__link" to={`/tour/${tour.id}/${hotel.id}`}>
          Відкрити ціну
        </Link>
      </div>
    </article>
  );
};

export default TourCard;
