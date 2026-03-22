import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const isAdmin = !!session;

    const projects = await prisma.project.findMany({
      where: isAdmin ? {} : { visible: true },
      orderBy: { sortOrder: "asc" },
    });

    const parsed = projects.map((p) => ({
      ...p,
      stack: JSON.parse(p.stack),
    }));

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
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

    const project = await prisma.project.create({
      data: {
        titleRu: body.titleRu,
        titleEn: body.titleEn,
        descRu: body.descRu,
        descEn: body.descEn,
        stack: JSON.stringify(body.stack),
        githubUrl: body.githubUrl,
        liveUrl: body.liveUrl ?? null,
        statusRu: body.statusRu,
        statusEn: body.statusEn,
        sortOrder: body.sortOrder ?? 0,
        visible: body.visible ?? true,
      },
    });

    return NextResponse.json(
      { ...project, stack: JSON.parse(project.stack) },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/projects error:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
