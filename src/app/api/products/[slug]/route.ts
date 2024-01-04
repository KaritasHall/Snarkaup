import { NextResponse } from "next/server";
import { prisma } from "@api/utils";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } },
) {
  const product = await prisma.product.findFirst({
    where: {
      slug: params.slug,
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
