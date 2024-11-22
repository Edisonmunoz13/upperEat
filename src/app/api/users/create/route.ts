import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function POST(request: Request) {
  const { name, email } = await request.json();

  if (!name || !email) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  try {
    const newUser = await prisma.user.create({
      data: { name, email },
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
