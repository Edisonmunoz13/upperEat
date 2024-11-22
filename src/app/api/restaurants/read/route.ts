import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET() {
  try {
    const restaurants = await prisma.restaurant.findMany();
    return NextResponse.json(restaurants);
  } catch {
    return NextResponse.json(
      { error: "Error fetching restaurants" },
      { status: 500 },
    );
  }
}
