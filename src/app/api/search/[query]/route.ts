import { NextResponse } from "next/server";
import { prisma } from "@api/utils";

export async function GET(
  _request: Request,
  { params }: { params: { query: string } },
) {
  const product = await prisma.product.findFirst({
    where: {
      OR: [
        {
          slug: {
            contains: params.query,
            mode: "insensitive",
          },
        },
        {
          sku: {
            contains: params.query,
            mode: "insensitive",
          },
        },
        {
          title: {
            contains: params.query,
            mode: "insensitive",
          },
        },
      ],
    },
    include: {
      category: true,
      discountGroup: true,
      content: true,
      variants: true,
    },
  });

  return NextResponse.json(product);
}
