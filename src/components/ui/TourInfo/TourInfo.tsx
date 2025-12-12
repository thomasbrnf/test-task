import { formatDate, formatPrice } from "@/utils";
import type { TourPrice } from "@/types";
import "./TourInfo.scss";
import clsx from "clsx";

interface TourInfoProps {
  tour: TourPrice;
  layout?: "inline" | "block";
}

const TourInfo = ({ tour, layout = "inline" }: TourInfoProps) => {
  return (
    <div className={clsx("tour-info", `tour-info--${layout}`)}>
      <div className="tour-info__item">
        {layout === "block" && (
          <span className="tour-info__label">Дата початку:</span>
        )}
        <span className="tour-info__value">{formatDate(tour.startDate)}</span>
      </div>
      <div className="tour-info__item">
        <span
          className={clsx("tour-info__price", `tour-info__price--${layout}`)}
        >
          {formatPrice(tour.amount, tour.currency)}
        </span>
      </div>
    </div>
  );
};

export default TourInfo;
