import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const about = await prisma.about.findUnique({
      where: { id: 1 },
    });

    if (!about) {
      return NextResponse.json({ error: "About not found" }, { status: 404 });
    }

    return NextResponse.json(about);
  } catch (error) {
    console.error("GET /api/about error:", error);
    return NextResponse.json(
      { error: "Failed to fetch about" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();

    const about = await prisma.about.upsert({
      where: { id: 1 },
      update: body,
      create: { id: 1, ...body },
    });

    return NextResponse.json(about);
  } catch (error) {
    console.error("PUT /api/about error:", error);
    return NextResponse.json(
      { error: "Failed to update about" },
      { status: 500 }
    );
  }
}
