import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@api/utils";
import { kv } from "@vercel/kv";

export async function GET(request: NextRequest) {
  // Note(Andri): This ensures that next returns the latest data from kv,
  // do not remove this line
  request.nextUrl.searchParams.get("path");

  const kvProducts = await kv.hgetall("products");

  if (kvProducts) {
    // cache hit
    return NextResponse.json(kvProducts.data);
  }

  const products = await prisma.product.findMany({
    include: {
      category: true,
      discountGroup: true,
      content: true,
      variants: true,
    },
  });

  if (products) {
    const result = await kv.hset("products", { data: products });
    return NextResponse.json(products);
  }
}
