import { lunchPlaces } from "@/lib/database";
import { NextResponse } from "next/server";

export async function GET() {
  const randomIndex = Math.floor(Math.random() * lunchPlaces.length);
  const randomPlace = lunchPlaces[randomIndex];

  return NextResponse.json(randomPlace);
}
