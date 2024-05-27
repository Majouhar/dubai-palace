import { getAllProducts } from "@/lib/productActions";
import { NextResponse } from "next/server";

export async function GET() {
  const allItems = await getAllProducts();

  return NextResponse.json(allItems);
}
