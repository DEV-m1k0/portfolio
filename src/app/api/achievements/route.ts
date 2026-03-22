import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const isAdmin = !!session;

    const achievements = await prisma.achievement.findMany({
      where: isAdmin ? {} : { visible: true },
      orderBy: { sortOrder: "asc" },
    });

    const parsed = achievements.map((a) => ({
      ...a,
      items: JSON.parse(a.items),
    }));

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("GET /api/achievements error:", error);
    return NextResponse.json(
      { error: "Failed to fetch achievements" },
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

    const achievement = await prisma.achievement.create({
      data: {
        titleRu: body.titleRu,
        titleEn: body.titleEn,
        items: JSON.stringify(body.items),
        sortOrder: body.sortOrder ?? 0,
        visible: body.visible ?? true,
      },
    });

    return NextResponse.json(
      { ...achievement, items: JSON.parse(achievement.items) },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/achievements error:", error);
    return NextResponse.json(
      { error: "Failed to create achievement" },
      { status: 500 }
    );
  }
}
