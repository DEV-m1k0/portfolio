import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const isAdmin = !!session;

    const education = await prisma.education.findMany({
      where: isAdmin ? {} : { visible: true },
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json(education);
  } catch (error) {
    console.error("GET /api/education error:", error);
    return NextResponse.json(
      { error: "Failed to fetch education" },
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

    const education = await prisma.education.create({
      data: {
        institutionRu: body.institutionRu,
        institutionEn: body.institutionEn,
        degreeRu: body.degreeRu,
        degreeEn: body.degreeEn,
        fieldRu: body.fieldRu ?? null,
        fieldEn: body.fieldEn ?? null,
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
        sortOrder: body.sortOrder ?? 0,
        visible: body.visible ?? true,
      },
    });

    return NextResponse.json(education, { status: 201 });
  } catch (error) {
    console.error("POST /api/education error:", error);
    return NextResponse.json(
      { error: "Failed to create education" },
      { status: 500 }
    );
  }
}
