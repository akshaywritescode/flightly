import Image from "next/image";
import LoadingIllustration from "@/app/assets/loading-illustration.svg"

export default function FlightLoading() {
  return (
    <div className="flex flex-col items-center gap-4 text-center mt-28">
        <Image src={LoadingIllustration} width={200} height={200} alt="loading file" unoptimized quality={100} className="animate-[float_2.5s_ease-in-out_infinite]" />
      <h1 className="text-sm font-medium text-black/70">Hold on, We are working on it...</h1>
    </div>
  );
}
