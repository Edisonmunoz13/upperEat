import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const restaurantId = searchParams.get("restaurantId");

  if (!restaurantId) {
    return NextResponse.json(
      { error: "Restaurant ID is required" },
      { status: 400 },
    );
  }

  try {
    const tables = await prisma.table.findMany({
      where: {
        restaurantId,
      },
      include: {
        restaurant: true,
      },
    });

    return NextResponse.json(tables);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error retrieving tables" },
      { status: 500 },
    );
  }
}
