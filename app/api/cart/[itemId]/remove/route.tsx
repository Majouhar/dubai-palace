import {  removeItemFromCart } from "@/lib/cartActions";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params: { itemId } }: { params: { itemId: string } }
) {
  const status = await removeItemFromCart(itemId);
  revalidateTag("cartItems")
  return NextResponse.json(
    { message: `Item Removed from Cart`, isAuth: true },
    { status: status ?? 400 }
  );
}
