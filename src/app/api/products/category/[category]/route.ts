import { PRODUCTS } from "@/app/api/products/products";
import { NextRequest, NextResponse } from "next/server";

export function GET(
  _request: NextRequest,
  { params }: { params: { category: string } },
) {
  const category = params.category;

  const products = PRODUCTS.filter((product) => {
    return product.category === category;
  });

  return NextResponse.json(products);
}
