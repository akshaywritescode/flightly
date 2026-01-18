export type LocationOption = {
  iataCode: string;
  airport?: string;
  city: string;
  country: string;
  type: "AIRPORT" | "CITY";
};

export type AmadeusLocation = {
  type: "location";
  subType: "AIRPORT" | "CITY";
  name: string;
  iataCode: string;
  address?: {
    cityName?: string;
    countryName?: string;
  };
};