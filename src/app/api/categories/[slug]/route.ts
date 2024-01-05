import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@api/utils";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } },
) {
  const category = await prisma.category.findFirst({
    where: {
      title: params.slug,
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
