import { Card } from "@/components/ui/card";
import { FromLocationInput } from "../ui/FromLocationInput";
import { ToLocationInput } from "../ui/ToLocationInput";
import { ArrowLeftRight } from "lucide-react";
import SearchFlightBtn from "../ui/SearchFlightBtn";

export default function FlightSearchCard() {
  return (
    <Card className="rounded-xl p-6 flex justify-between">
        
      <div className="flex items-center gap-5">
        <FromLocationInput />
        <ArrowLeftRight size={18} className="text-black/70" />
        <ToLocationInput />
      </div>
      <SearchFlightBtn />
    </Card>
  );
}
