import type { Hotel } from "@/types";

import "./HotelInfo.scss";
import clsx from "clsx";

interface HotelInfoProps {
  hotel: Hotel;
  size?: "small" | "large";
}

const HotelInfo = ({ hotel, size = "small" }: HotelInfoProps) => {
  return (
    <div className={clsx("hotel-info", `hotel-info--${size}`)}>
      <div
        className={clsx("hotel-info__details", `hotel-info__details--${size}`)}
      >
        <h3 className="hotel-info__name">{hotel.name}</h3>
        <p className="hotel-info__location">
          {hotel.countryName}, {hotel.cityName}
        </p>
      </div>
    </div>
  );
};

export default HotelInfo;
