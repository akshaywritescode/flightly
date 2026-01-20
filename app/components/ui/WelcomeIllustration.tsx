import WelcomeIllustration from "@/app/assets/welcome-illustration.png";
import Image from "next/image";

export default function WelcomeState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-3 sm:py-6 text-center">
      <Image
        src={WelcomeIllustration}
        alt="Search for flights illustration"
        width={260}
        height={260}
        quality={100}
        priority
      />

      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
        Ready to plan your trip?
      </h1>

      <p className="max-w-md text-xs sm:text-sm text-muted-foreground">
        Enter your <span className="font-medium">departure</span>,{" "}
        <span className="font-medium">destination</span>, and{" "}
        <span className="font-medium">travel dates</span> above to discover the
        best flights at the best prices.
      </p>

      <p className="text-xs text-muted-foreground">
        ✈️ Fast search • Real-time prices • Smart filters
      </p>
    </div>
  );
}
