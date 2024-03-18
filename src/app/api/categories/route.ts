import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@api/utils";
import { kv } from "@vercel/kv";

export async function GET(request: NextRequest) {
  // Note(Andri): This ensures that next returns the latest data from kv,
  // do not remove this line
  request.nextUrl.searchParams.get("path");

  const kvCategories = await kv.hgetall("categories");

  if (kvCategories) {
    // cache hit
    return NextResponse.json(kvCategories.data);
  }

  const categories = await prisma.category.findMany({
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

  if (categories) {
    await kv.hset("categories", { data: categories });
    return NextResponse.json(categories);
  }
}
