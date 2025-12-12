export interface Hotel {
  id: number;
  name: string;
  image: string;
  cityId: number;
  cityName: string;
  countryId: string;
  countryName: string;
  description?: string;
  services?: {
    wifi: string;
    aquapark: string;
    tennis_court: string;
    laundry: string;
    parking: string;
  };
}
