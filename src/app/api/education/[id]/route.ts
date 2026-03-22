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

    const education = await prisma.education.update({
      where: { id: parseInt(id) },
      data,
    });

    return NextResponse.json(education);
  } catch (error) {
    console.error("PUT /api/education/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update education" },
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
    await prisma.education.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Education deleted" });
  } catch (error) {
    console.error("DELETE /api/education/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete education" },
      { status: 500 }
    );
  }
}
