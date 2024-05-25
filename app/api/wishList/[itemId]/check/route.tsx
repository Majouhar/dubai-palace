import { isItemExistInWishList } from "@/lib/wishListActions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { itemId: string };
  }
) {
  const result = await isItemExistInWishList(params.itemId);

  return NextResponse.json({ status: result });
}
