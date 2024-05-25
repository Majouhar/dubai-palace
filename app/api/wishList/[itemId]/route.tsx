import {
  addItemTOWishList,
  removeItemFromWishList,
} from "@/lib/wishListActions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { itemId: string } }
) {
  const result = await addItemTOWishList(params.itemId);

  return NextResponse.json({ status: result });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { itemId: string } }
) {
  const result = await removeItemFromWishList(params.itemId);
  return NextResponse.json({ status: result });
}
