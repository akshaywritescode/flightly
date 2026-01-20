import { Card } from "@/components/ui/card";
import BookNowBtn from "../ui/FlightResultCard/BookNowBtn";
import VeiwDetailBtn from "../ui/FlightResultCard/ViewDetailBtn";
import FlyIllustration from "../ui/FlightResultCard/FlyIllustration";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Backpack, Salad, Luggage } from "lucide-react";

type FlightResultCardProps = {
  departureIataCode: string;
  arrivalIataCode: string;
  departureCity: string;
  arrivalCity: string;
  price: string;
  departureDateTime: string;
  arrivalDateTime: string;
  mealInfo: {
    hasMeal: boolean;
    isFree: boolean;
  };
  carrierCode: string;
  carrierName: string;
  flightNumber: string;
  durationH: number;
  durationM: number;
  stops: {
    count: number;
    via: string[];
  };
};

export default function FlightResultCard({
  departureIataCode,
  arrivalIataCode,
  departureCity,
  arrivalCity,
  price,
  departureDateTime,
  arrivalDateTime,
  mealInfo,
  carrierCode,
  carrierName,
  flightNumber,
  durationH,
  durationM,
  stops,
}: FlightResultCardProps) {
  return (
    <Card className="w-full flex flex-col lg:flex-row">
      {/* Left */}
      <div className="w-full lg:w-[75%] p-4 lg:p-6 flex flex-col gap-4">
        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {mealInfo.hasMeal && (
            <Badge
              variant="outline"
              className={
                mealInfo.isFree
                  ? "bg-green-100 border-green-500"
                  : "bg-yellow-100 border-yellow-500"
              }
            >
              <Salad size={13} />
              <span className="text-[0.7rem] font-medium ml-1">
                {mealInfo.isFree ? "Free Meal" : "Paid Meal"}
              </span>
            </Badge>
          )}
          <Badge variant="outline" className="bg-blue-100 border-blue-500">
            <Backpack size={13} />
            <span className="text-[0.7rem] font-medium ml-1">Cabin 7kg</span>
          </Badge>
          <Badge variant="outline" className="bg-blue-100 border-blue-500">
            <Luggage size={13} />
            <span className="text-[0.7rem] font-medium ml-1">
              Check-in 15kg
            </span>
          </Badge>
        </div>

        {/* Airline + route */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-2 items-center">
              <Image
                src={`https://images.ixigo.com/img/common-resources/airline-new/${carrierCode}.png`}
                alt={`${carrierName} logo`}
                width={40}
                height={40}
                unoptimized
              />
              <div>
                <h3 className="font-medium">{carrierName}</h3>
                <p className="text-sm">{flightNumber}</p>
              </div>
            </div>

            {/* Mobile price */}
            <span className="text-lg font-semibold lg:hidden">${price}</span>
          </div>

          <div className="flex items-center justify-between w-full lg:gap-14">
            <div className="flex flex-col">
              <span className="text-xs text-black/70">{departureCity}</span>
              <span className="text-lg lg:text-xl font-semibold">
                {departureIataCode}
              </span>
              <span className="text-xs text-black/70">{departureDateTime}</span>
            </div>

            <FlyIllustration
              durationH={durationH}
              durationM={durationM}
              stops={stops}
            />

            <div className="flex flex-col text-right">
              <span className="text-xs text-black/70">{arrivalCity}</span>
              <span className="text-lg lg:text-xl font-semibold">
                {arrivalIataCode}
              </span>
              <span className="text-xs text-black/70">{arrivalDateTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div
        className="
    w-full lg:w-[25%]
    border-t lg:border-t-0 lg:border-l
    flex flex-row lg:flex-col
    justify-between items-center lg:items-end
    gap-4 lg:gap-10
    p-4 lg:p-6
  "
      >
        <span className="hidden lg:block text-2xl font-medium">${price}</span>
        <div className="flex flex-col gap-2 w-full lg:w-auto">
          <VeiwDetailBtn />
          <BookNowBtn />
        </div>
      </div>
    </Card>
  );
}
