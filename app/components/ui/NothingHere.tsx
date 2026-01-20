import NothingHereIllustration from "@/app/assets/nothing-here.svg";
import Image from "next/image";

export default function NothingHere() {
  return (
    <div className="flex flex-col items-center gap-4 text-center mt-8">
      <Image
        src={NothingHereIllustration}
        width={300}
        height={300}
        alt="No flights found illustration"
        unoptimized
        quality={100}
      />

      <h1 className="text-3xl font-medium">
        Sorry, Nothing Here
      </h1>

      <p className="max-w-md text-xs text-black/60 sm:texts-m">
        We couldn’t find any flights for your selected route and dates.
        Try changing the departure date, destination, or airport to see more results.
      </p>
    </div>
  );
}