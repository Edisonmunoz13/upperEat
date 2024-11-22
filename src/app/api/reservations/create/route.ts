import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, people, date, time, status, userId, restaurantId, tableId } =
      body;

    if (
      !name ||
      !people ||
      !date ||
      !time ||
      !status ||
      !userId ||
      !restaurantId
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const formattedDate = new Date(date);

    const reservation = await prisma.reservation.create({
      data: {
        name,
        people,
        date: formattedDate,
        time,
        status,
        userId,
        restaurantId,
        tableId,
      },
    });

    return NextResponse.json(reservation, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creating reservation" },
      { status: 500 },
    );
  }
}
