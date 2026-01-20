import { FlightOffer } from "@/app/types/flights.types";
import {
  StopsFilterType,
  DepartureTimeFilter,
  ArrivalTimeFilter,
} from "@/app/types/filters.types";
import { getDepartureHour } from "@/lib/getDepartureHour";
import { getArrivalHour } from "@/lib/getArrivalHour";

/* ---------------- Stops ---------------- */
export function applyStopsFilter(
  flights: FlightOffer[],
  filter: StopsFilterType,
) {
  if (!filter || filter === "all") return flights;

  return flights.filter((flight) => {
    const segments = flight.itineraries?.[0]?.segments ?? [];
    const stops = Math.max(segments.length - 1, 0);

    switch (filter) {
      case "nonstop":
        return stops === 0;
      case "1stop":
        return stops === 1;
      case "2plus":
        return stops >= 2;
      default:
        return true;
    }
  });
}

/* ---------------- Departure Time ---------------- */
export function applyDepartureTimeFilter(
  flights: FlightOffer[],
  filter: DepartureTimeFilter,
) {
  if (filter === "all") return flights;

  return flights.filter((flight) => {
    const hour = getDepartureHour(flight);
    if (hour === null) return false;

    switch (filter) {
      case "before6am":
        return hour < 6;
      case "6to12":
        return hour >= 6 && hour < 12;
      case "12to6":
        return hour >= 12 && hour < 18;
      case "after6pm":
        return hour >= 18;
      default:
        return true;
    }
  });
}

/* ---------------- Arrival Time ---------------- */
export function applyArrivalTimeFilter(
  flights: FlightOffer[],
  filter: ArrivalTimeFilter,
) {
  if (filter === "all") return flights;

  return flights.filter((flight) => {
    const hour = getArrivalHour(flight);
    if (hour === null) return false;

    switch (filter) {
      case "before6am":
        return hour < 6;
      case "6to12":
        return hour >= 6 && hour < 12;
      case "12to6":
        return hour >= 12 && hour < 18;
      case "after6pm":
        return hour >= 18;
      default:
        return true;
    }
  });
}

/* ---------------- Airlines ---------------- */
export function applyAirlineFilter(
  flights: FlightOffer[],
  airlines: string[],
) {
  if (!airlines.length) return flights;

  return flights.filter((flight) => {
    const carrierCode =
      flight.itineraries?.[0]?.segments?.[0]?.carrierCode;
    return carrierCode ? airlines.includes(carrierCode) : false;
  });
}

/* ---------------- Price ---------------- */
export function applyPriceFilter(
  flights: FlightOffer[],
  range: [number, number],
) {
  return flights.filter((flight) => {
    const price = Number(flight.price?.total);
    if (Number.isNaN(price)) return false;

    return price >= range[0] && price <= range[1];
  });
}

/* ---------------- Master Filter ---------------- */
type AllFilters = {
  stops: StopsFilterType;
  departureTime: DepartureTimeFilter;
  arrivalTime: ArrivalTimeFilter;
  airlines: string[];
  priceRange: [number, number];
};

export function applyAllFilters(
  flights: FlightOffer[],
  filters: AllFilters,
) {
  let result = flights;

  result = applyStopsFilter(result, filters.stops);
  result = applyDepartureTimeFilter(result, filters.departureTime);
  result = applyArrivalTimeFilter(result, filters.arrivalTime);
  result = applyAirlineFilter(result, filters.airlines);
  result = applyPriceFilter(result, filters.priceRange);

  return result;
}
