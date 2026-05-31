import { addPlace } from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    if (!body.name || !body.address || !body.price || body.distance === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate price is 1-3
    if (![1, 2, 3].includes(body.price)) {
      return NextResponse.json(
        { error: "Price must be 1, 2, or 3" },
        { status: 400 }
      );
    }

    // Validate distance is positive
    if (body.distance < 0) {
      return NextResponse.json(
        { error: "Distance must be positive" },
        { status: 400 }
      );
    }

    const newPlace = await addPlace({
      name: body.name,
      address: body.address,
      price: body.price,
      distance: body.distance,
    });

    return NextResponse.json(newPlace, { status: 201 });
  } catch (error) {
    console.error("Error adding place:", error);
    return NextResponse.json(
      { error: "Failed to add place" },
      { status: 500 }
    );
  }
}
