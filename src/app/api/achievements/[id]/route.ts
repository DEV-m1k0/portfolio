import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await request.json();

    const data: Record<string, unknown> = { ...body };
    if (body.items !== undefined) {
      data.items = JSON.stringify(body.items);
    }

    const achievement = await prisma.achievement.update({
      where: { id: parseInt(id) },
      data,
    });

    return NextResponse.json({
      ...achievement,
      items: JSON.parse(achievement.items),
    });
  } catch (error) {
    console.error("PUT /api/achievements/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update achievement" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    await prisma.achievement.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Achievement deleted" });
  } catch (error) {
    console.error("DELETE /api/achievements/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete achievement" },
      { status: 500 }
    );
  }
}
