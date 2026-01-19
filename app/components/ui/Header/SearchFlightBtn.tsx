import { Button } from "@/components/ui/button";

type SearchFlightBtnProps = {
  onClick: () => void;
  disabled?: boolean;
};

export default function SearchFlightBtn({
  onClick,
  disabled,
}: SearchFlightBtnProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="w-full sm:w-auto text-xs bg-blue-600 hover:bg-blue-700"
    >
      Search Flights
    </Button>
  );
}
