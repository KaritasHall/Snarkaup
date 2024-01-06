import { NextResponse } from "next/server";
import { prisma } from "@api/utils";

export async function GET() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      discountGroup: true,
      content: true,
      variants: true,
    },
  });

  return NextResponse.json(products);
}
