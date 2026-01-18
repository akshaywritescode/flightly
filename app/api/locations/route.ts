import { NextResponse } from "next/server";
import { getAmadeusToken } from "@/lib/amadeus";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query || query.length < 2) {
    return NextResponse.json({ data: [] });
  }

  const token = await getAmadeusToken();

  const res = await fetch(
    `https://test.api.amadeus.com/v1/reference-data/locations?keyword=${query}&subType=AIRPORT,CITY&page[limit]=8`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  return NextResponse.json(data);
}
