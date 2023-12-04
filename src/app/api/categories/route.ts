import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@api/utils";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const categoryName = searchParams.get("category");

  if (!categoryName) {
    return NextResponse.json(
      { error: "No category provided" },
      { status: 400 },
    );
  }

  const category = await prisma.category.findFirst({
    where: {
      title: categoryName,
    },
    include: {
      products: true,
      parent: {
        include: {
          products: true,
        },
      },
      children: {
        include: {
          products: true,
        },
      },
    },
  });

  return NextResponse.json(category);
}
