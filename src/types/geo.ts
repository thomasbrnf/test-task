export interface Country {
  id: string;
  name: string;
  flag: string;
  type: "country";
}

export interface City {
  id: number;
  name: string;
  countryId: string;
  type: "city";
}

export interface Hotel {
  id: number;
  name: string;
  image: string;
  cityId: number;
  cityName: string;
  countryId: string;
  countryName: string;
  type: "hotel";
}

export type GeoEntity = Country | City | Hotel;
