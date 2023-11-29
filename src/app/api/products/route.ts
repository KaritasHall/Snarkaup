import { NextResponse } from "next/server";
import { PRODUCTS } from "./products";

export function GET() {
  return NextResponse.json(PRODUCTS);
}
