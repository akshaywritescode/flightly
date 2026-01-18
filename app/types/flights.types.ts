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
  itineraries: {
    duration: string;
    segments: {
      departure: {
        iataCode: string;
        at: string;
      };
      arrival: {
        iataCode: string;
        at: string;
      };
      carrierCode: string;
      number: string;
      aircraft?: {
        code: string;
      };
      duration: string;
      numberOfStops: number;
    }[];
  }[];
  price: {
    currency: string;
    total: string;
  };

  travelerPricings?: TravelerPricing[];
};

export type TravelerPricing = {
  travelerId: string;
  travelerType: "ADULT" | "CHILD" | "INFANT";
  fareOption: string;
  price: {
    currency: string;
    total: string;
    base: string;
  };
  fareDetailsBySegment: FareDetailsBySegment[];
};

export type FareDetailsBySegment = {
  segmentId: string;
  cabin: string;
  class: string;
  brandedFare?: string;
  brandedFareLabel?: string;
  includedCheckedBags?: {
    weight: number;
    weightUnit: string;
  };
  includedCabinBags?: {
    weight: number;
    weightUnit: string;
  };
  amenities?: Amenity[];
};

export type Amenity = {
  description: string;
  isChargeable: boolean;
  amenityType:
    | "MEAL"
    | "PRE_RESERVED_SEAT"
    | "BRANDED_FARES"
    | "UPGRADES";
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
