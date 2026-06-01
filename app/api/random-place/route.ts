import { getRandomPlace } from "@/lib/database";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  try {
    const randomPlace = await getRandomPlace();
    return NextResponse.json(randomPlace);
  } catch (error) {
    console.error("Error fetching random place:", error);
    return NextResponse.json(
      { error: "Failed to fetch random place" },
      { status: 500 }
    );
  }
}
