import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  const reservation = await fetchReservationById(id);

  if (reservation) {
    return NextResponse.json(reservation);
  }

  return NextResponse.json(
    { message: "Reservation not found" },
    { status: 404 },
  );
}

async function fetchReservationById(id: string) {
  try {
    const reservation = await prisma.reservation.findUnique({
      where: { id },
    });

    return reservation;
  } catch (error) {
    return null;
  }
}
