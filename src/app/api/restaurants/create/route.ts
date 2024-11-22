import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function POST(request: Request) {
  const { name, location, description, imageUrl, restaurantOwnerId } =
    await request.json();

  if (!name || !location || !description) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  try {
    const newRestaurant = await prisma.restaurant.create({
      data: { name, location, description, imageUrl, restaurantOwnerId },
    });
    return NextResponse.json(newRestaurant, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Error creating restaurant" },
      { status: 500 },
    );
  }
}
