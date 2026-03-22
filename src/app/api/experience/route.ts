import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const isAdmin = !!session;

    const experiences = await prisma.experience.findMany({
      where: isAdmin ? {} : { visible: true },
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json(experiences);
  } catch (error) {
    console.error("GET /api/experience error:", error);
    return NextResponse.json(
      { error: "Failed to fetch experiences" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();

    const experience = await prisma.experience.create({
      data: {
        companyRu: body.companyRu,
        companyEn: body.companyEn,
        positionRu: body.positionRu,
        positionEn: body.positionEn,
        descRu: body.descRu ?? null,
        descEn: body.descEn ?? null,
        location: body.location ?? null,
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
        sortOrder: body.sortOrder ?? 0,
        visible: body.visible ?? true,
      },
    });

    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    console.error("POST /api/experience error:", error);
    return NextResponse.json(
      { error: "Failed to create experience" },
      { status: 500 }
    );
  }
}
