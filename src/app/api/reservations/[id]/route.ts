import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET(request: Request) {
  // Obtener el id de los parámetros de la URL
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json(
      { message: "Reservation ID is required" },
      { status: 400 },
    );
  }

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
  } catch {
    return null;
  }
}
