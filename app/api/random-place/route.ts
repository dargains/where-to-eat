import { getRandomPlace } from "@/lib/database";
import { NextResponse } from "next/server";

export async function GET() {
  const randomPlace = await getRandomPlace();
  return NextResponse.json(randomPlace);
}
