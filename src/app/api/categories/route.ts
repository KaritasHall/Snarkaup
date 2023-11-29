import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json([
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ]);
}
