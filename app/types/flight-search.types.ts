export type Itinerary = {
  duration: string; // e.g. "PT2H25M"
  segments: Segment[];
};

export type AirportTime = {
  iataCode: string;
  at: string; // ISO datetime
  terminal?: string;
};

export type Segment = {
  departure: AirportTime;
  arrival: AirportTime;
  carrierCode: string;
  aircraft?: {
    code: string;
  };
  duration: string;
  numberOfStops: number;
};

export type FlightOffer = {
  id: string;
  itineraries: Itinerary[];
  price: Price;
  validatingAirlineCodes: string[];
};

export type Price = {
  currency: string;
  total: string;
  base?: string;
};

export type Dictionaries = {
  carriers?: Record<string, string>;
  aircraft?: Record<string, string>;
  locations?: Record<
    string,
    {
      cityCode: string;
      countryCode: string;
    }
  >;
};
