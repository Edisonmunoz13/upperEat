import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name, people, date, time, status } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Reservation ID is required" },
        { status: 400 },
      );
    }

    const reservationExists = await prisma.reservation.findUnique({
      where: { id },
    });

    if (!reservationExists) {
      return NextResponse.json(
        { error: "Reservation not found" },
        { status: 404 },
      );
    }

    const reservation = await prisma.reservation.update({
      where: { id },
      data: {
        name,
        people,
        date: new Date(date),
        time,
        status,
      },
    });

    return NextResponse.json(reservation);
  } catch {
    return NextResponse.json(
      { error: "Error updating reservation" },
      { status: 500 },
    );
  }
}
