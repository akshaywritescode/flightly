import { Card } from "@/components/ui/card";
import BookNowBtn from "../ui/BookNowBtn";
import VeiwDetailBtn from "../ui/ViewDetailBtn";
import FlyIllustration from "../ui/FlyIllustration";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Backpack, Salad, Luggage } from "lucide-react";

type FlightResultCardProps = {
  departureIataCode: string;
  arrivalIataCode: string;
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
};

export default function FlightResultCard({
  departureIataCode,
  arrivalIataCode,
  price,
  departureDateTime,
  arrivalDateTime,
  mealInfo,
  carrierCode,
  carrierName,
  flightNumber,
}: FlightResultCardProps) {
  return (
    <Card className="flex justify-between w-[100%]">
      {/* Left Caed */}
      <div className="w-[75%] p-3 flex flex-col justify-between">
        <div className="flex gap-2">
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
          <Badge
            variant="outline"
            className="bg-blue-100 border border-blue-500"
          >
            {" "}
            <Backpack size={13} />{" "}
            <span className="text-[0.7rem] font-medium ml-1">
              Cabin Baggage 7kg / Adult
            </span>
          </Badge>
          <Badge
            variant="outline"
            className="bg-blue-100 border border-blue-500"
          >
            {" "}
            <Luggage size={13} />{" "}
            <span className="text-[0.7rem] font-medium ml-1">
              Check-in Baggage 15kg / Adult
            </span>
          </Badge>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <div>
              <Image
                src={`https://images.ixigo.com/img/common-resources/airline-new/${carrierCode}.png`}
                alt={`${carrierName} logo`}
                width={40}
                height={40}
                quality={100}
                unoptimized
              />
            </div>
            <div>
              <h3 className="font-medium">{carrierName}</h3>
              <p className="text-sm">{flightNumber}</p>
            </div>
          </div>
          <div className="flex items-center gap-10">
            {/* Departure */}
            <div className="flex flex-col">
              <span className="text-xs text-black/70">New Delhi</span>
              <span className="text-xl font-semibold">{departureIataCode}</span>
              <span className="text-xs text-black/70">{departureDateTime}</span>
            </div>

            <FlyIllustration durationH={"7"} durationM={"10"} />

            {/* Arrival */}
            <div className="flex flex-col">
              <span className="text-xs text-black/70">Mumbai</span>
              <span className="text-xl font-semibold">{arrivalIataCode}</span>
              <span className="text-xs text-black/70">{arrivalDateTime}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Right card */}
      <div className="border-l w-[25%] flex flex-col text-right gap-10 p-3">
        <span className="text-2xl font-medium">₹{price}</span>
        <div className="flex flex-col gap-2 ">
          <VeiwDetailBtn />
          <BookNowBtn />
        </div>
      </div>
    </Card>
  );
}
