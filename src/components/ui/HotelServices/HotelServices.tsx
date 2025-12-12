import type { Hotel } from "@/types";
import {
  WifiIcon,
  AquaparkIcon,
  LaundryIcon,
  ParkingIcon,
  TenisIcon,
} from "../Icons";
import { isServiceAvailable } from "@/utils";

import "./HotelServices.scss";

const serviceLabels: Record<keyof NonNullable<Hotel["services"]>, string> = {
  wifi: "Wi‑Fi",
  aquapark: "Аквапарк",
  tennis_court: "Тенісний корт",
  laundry: "Прання",
  parking: "Паркінг",
};

const ICONS: Record<
  keyof NonNullable<Hotel["services"]>,
  React.ComponentType<any>
> = {
  wifi: WifiIcon,
  aquapark: AquaparkIcon,
  tennis_court: TenisIcon,
  laundry: LaundryIcon,
  parking: ParkingIcon,
};
interface HotelServicesProps {
  hotel: Hotel;
}

const HotelServices = ({ hotel }: HotelServicesProps) => {
  if (!hotel.services) return null;

  type Services = NonNullable<Hotel["services"]>;
  const entries = Object.entries(hotel.services) as [keyof Services, string][];

  const present = entries.filter(([, value]) => isServiceAvailable(value));

  if (present.length === 0) return null;
  return (
    <div className="hotel-services">
      <h4 className="hotel-services__title">Сервіси</h4>
      <ul className="hotel-services__list">
        {present.map(([key]) => {
          const Icon = ICONS[key];
          return (
            <li key={key} className="hotel-services__item">
              {Icon ? (
                <Icon className="hotel-services__icon" />
              ) : (
                <span className="hotel-services__icon">✓</span>
              )}
              <span className="hotel-services__name">{serviceLabels[key]}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HotelServices;
