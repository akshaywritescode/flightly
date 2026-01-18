export type LocationOption = {
  iataCode: string;
  airport?: string;
  city: string;
  country: string;
  type: "AIRPORT" | "CITY";
};
