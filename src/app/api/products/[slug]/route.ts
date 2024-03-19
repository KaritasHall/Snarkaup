import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@api/utils";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  // Note(Andri): This ensures that next returns the latest data from kv,
  // do not remove this line
  request.nextUrl.searchParams.get("path");

  const kvProduct = await kv.hgetall(`product:${params.slug}`);

  if (kvProduct) {
    // cache hit
    return NextResponse.json(kvProduct);
  }

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

  if (product) {
    const result = await kv.hset(`product:${params.slug}`, product);
    return NextResponse.json(product);
  }
}
