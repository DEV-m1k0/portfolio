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
    if (body.startDate !== undefined) {
      data.startDate = new Date(body.startDate);
    }
    if (body.endDate !== undefined) {
      data.endDate = body.endDate ? new Date(body.endDate) : null;
    }

    const experience = await prisma.experience.update({
      where: { id: parseInt(id) },
      data,
    });

    return NextResponse.json(experience);
  } catch (error) {
    console.error("PUT /api/experience/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update experience" },
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
    await prisma.experience.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Experience deleted" });
  } catch (error) {
    console.error("DELETE /api/experience/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete experience" },
      { status: 500 }
    );
  }
}
