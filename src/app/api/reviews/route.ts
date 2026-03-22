import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const isAdmin = !!session;

    const reviews = await prisma.review.findMany({
      where: isAdmin ? {} : { status: "approved" },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("GET /api/reviews error:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const review = await prisma.review.create({
      data: {
        authorName: body.authorName,
        authorRole: body.authorRole ?? null,
        textRu: body.textRu,
        textEn: body.textEn ?? null,
        rating: body.rating ?? 5,
        status: "pending",
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("POST /api/reviews error:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}
