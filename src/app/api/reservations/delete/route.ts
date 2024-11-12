import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Reservation ID not provided" },
        { status: 400 },
      );
    }

    await prisma.reservation.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Reservation successfully deleted" });
  } catch {
    return NextResponse.json(
      { error: "Error deleting reservation" },
      { status: 500 },
    );
  }
}
