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
      products: {
        include: {
          category: true,
          discountGroup: true,
          content: true,
          variants: true,
        },
      },
      parent: {
        include: {
          products: {
            include: {
              category: true,
              discountGroup: true,
              content: true,
              variants: true,
            },
          },
        },
      },
      children: {
        include: {
          products: {
            include: {
              category: true,
              discountGroup: true,
              content: true,
              variants: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(category);
}
