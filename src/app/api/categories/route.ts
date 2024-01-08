import { NextResponse } from "next/server";
import { prisma } from "@api/utils";

export async function GET() {
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

  return NextResponse.json(categories);
}
