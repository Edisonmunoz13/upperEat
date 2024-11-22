// api/tables/create/route.ts

import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const { number, capacity, restaurantId } = await request.json();

    if (!number || !capacity || !restaurantId) {
      return NextResponse.json(
        { error: "Number, capacity, and restaurantId are required" },
        { status: 400 },
      );
    }

    const newTable = await prisma.table.create({
      data: {
        number,
        capacity,
        restaurantId,
      },
    });

    return NextResponse.json(newTable, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creating table" },
      { status: 500 },
    );
  }
}
