import { getAllItemsInWishList } from "@/lib/wishListActions";
import { NextResponse } from "next/server";

export async function GET() {
  const allItems = await getAllItemsInWishList();

  return NextResponse.json(allItems);
}
