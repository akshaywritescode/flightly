import { Button } from "@/components/ui/button";

type SearchFlightBtnProps = {
  onClick: () => void;
  disabled?: boolean;
};

export default function SearchFlightBtn({
  onClick,
  disabled,
}: SearchFlightBtnProps){
    return <Button onClick={onClick}
      disabled={disabled} className="text-xs bg-blue-600 cursor-pointer hover:bg-blue-700">
        Search Flights
    </Button>
}