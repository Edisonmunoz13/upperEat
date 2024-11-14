import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, people, date, time, status } = body;

    const formattedDate = new Date(date);

    const reservation = await prisma.reservation.create({
      data: {
        name,
        people,
        date: formattedDate,
        time,
        status,
      },
    });

    return NextResponse.json(reservation);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creating reservation" },
      { status: 500 },
    );
  }
}
