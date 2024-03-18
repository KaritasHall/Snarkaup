import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@api/utils";
import { kv } from "@vercel/kv";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  // Note(Andri): This ensures that next returns the latest data from kv,
  // do not remove this line
  request.nextUrl.searchParams.get("path");

  const kvCategories = await kv.hgetall(`category:${params.slug}`);

  if (kvCategories) {
    // cache hit
    return NextResponse.json(kvCategories.data);
  }

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

  if (category) {
    await kv.hset(`category:${params.slug}`, { data: category });
    return NextResponse.json(category);
  }

  return NextResponse.json(category);
}
