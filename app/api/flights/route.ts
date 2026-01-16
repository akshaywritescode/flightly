import { getAmadeusToken } from "@/lib/amadeus";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const date = searchParams.get("date");

  if (!origin || !destination || !date) {
    return NextResponse.json(
      { error: "Missing parameters" },
      { status: 400 }
    );
  }

  const token = await getAmadeusToken();

  const url =
    "https://test.api.amadeus.com/v2/shopping/flight-offers" +
    `?originLocationCode=${origin}` +
    `&destinationLocationCode=${destination}` +
    `&departureDate=${date}` +
    `&adults=1`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return NextResponse.json(data);
}