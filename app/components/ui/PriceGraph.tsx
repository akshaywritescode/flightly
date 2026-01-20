"use client";

import { FlightOffer } from "@/app/types/flights.types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";

type PriceGraphProps = {
  flights: FlightOffer[];
};

type PriceBucket = {
  range: string;
  count: number;
};

export default function PriceGraph({ flights }: PriceGraphProps) {
  if (!flights.length) return null;

  // her i will extraxt prices
  const prices = flights
    .map((f) => Number(f.price?.total))
    .filter((p) => !isNaN(p));

  if (!prices.length) return null;

  // 2. will create a bucket here
  const min = Math.min(...prices);
  const max = Math.max(...prices);

  const BUCKET_SIZE = Math.ceil((max - min) / 6) || 1;

  const buckets: PriceBucket[] = [];

  for (let i = 0; i < 6; i++) {
    const start = Math.floor(min + i * BUCKET_SIZE);
    const end = Math.floor(start + BUCKET_SIZE);

    buckets.push({
      range: `$${start}–${end}`,
      count: 0,
    });
  }

  // will Fill buckets
  prices.forEach((price) => {
    const index = Math.min(
      Math.floor((price - min) / BUCKET_SIZE),
      buckets.length - 1
    );
    buckets[index].count += 1;
  });

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <h3 className="text-sm font-medium mb-3">
          Price distribution
        </h3>

        <div className="h-[160px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={buckets}>
              <XAxis
                dataKey="range"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                allowDecimals={false}
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(0,0,0,0.05)" }}
              />
              <Bar
                dataKey="count"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
