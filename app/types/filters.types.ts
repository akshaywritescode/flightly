export type StopsFilterType = "all" | "nonstop" | "1stop" | "2plus";

export type DepartureTimeFilter =
  | "all"
  | "before6am"
  | "6to12"
  | "12to6"
  | "after6pm";

export type ArrivalTimeFilter =
  | "all"
  | "before6am"
  | "6to12"
  | "12to6"
  | "after6pm";

export type AirlineFilterType = string[];
// example: ["AI", "6E"]
