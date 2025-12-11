import { formatDate, formatPrice } from "@/utils";
import type { TourPrice, Hotel } from "@/types";

import "./TourCard.scss";

interface TourCardProps {
  tour: TourPrice;
  hotel: Hotel;
}

const TourCard = ({ tour, hotel }: TourCardProps) => {
  console.log({ tour }, { hotel });
  return (
    <article className="tour-card">
      <img className="tour-card__image" src={hotel.image} alt={hotel.name} />
      <div className="tour-card__content">
        <h3 className="tour-card__name">{hotel.name}</h3>
        <p className="tour-card__location">
          {hotel.countryName}, {hotel.cityName}
        </p>
        <p className="tour-card__date">{formatDate(tour.startDate)}</p>
        <p className="tour-card__price">
          {formatPrice(tour.amount, tour.currency)}
        </p>
        <a className="tour-card__link" href={`/tour/${tour.id}/${hotel.id}`}>
          Відкрити ціну
        </a>
      </div>
    </article>
  );
};

export default TourCard;
