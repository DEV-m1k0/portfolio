import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const isAdmin = !!session;

    const skills = await prisma.skill.findMany({
      where: isAdmin ? {} : { visible: true },
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json(skills);
  } catch (error) {
    console.error("GET /api/skills error:", error);
    return NextResponse.json(
      { error: "Failed to fetch skills" },
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

    const skill = await prisma.skill.create({
      data: {
        name: body.name,
        category: body.category ?? null,
        sortOrder: body.sortOrder ?? 0,
        visible: body.visible ?? true,
      },
    });

    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    console.error("POST /api/skills error:", error);
    return NextResponse.json(
      { error: "Failed to create skill" },
      { status: 500 }
    );
  }
}
