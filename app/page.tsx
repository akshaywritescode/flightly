import FlightSearchCard from "./components/layout/FlightSearchCard";
import FlightsResultSection from "./components/layout/FlightsResultSection";
import Header from "./components/layout/header";

export default function Home() {
  return (
    <>
      <div className="h-screen w-auto">
        <Header />
        <main className="m-auto min-h-screen max-w-[1200px] bg-[#edebeb] px-10 pt-24">
          <FlightSearchCard />
          <FlightsResultSection />
        </main>
      </div>
    </>
  );
}
