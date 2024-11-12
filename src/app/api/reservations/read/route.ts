import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany();
    return NextResponse.json(reservations);
  } catch {
    return NextResponse.json(
      { error: "Error retrieving reservations" },
      { status: 500 },
    );
  }
}
