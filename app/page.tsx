import FlightSearchCard from "./components/layout/FlightSearchCard";
import Header from "./components/layout/header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="h-screen bg-[#edebeb] px-10 py-7">
        <FlightSearchCard />
      </main>
    </>
  );
}
