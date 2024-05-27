import { getProductsByIDs } from "@/lib/productActions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { multipleIds } }: { params: { multipleIds: string[] } }
) {
  const items = await getProductsByIDs(multipleIds);

  return NextResponse.json(items);
}
