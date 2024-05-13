"use server";
import { addItemToCart, getCartItemsOfUser, getUserId } from "@/lib/cartActions";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { itemId, lang } = data;

  const status = await addItemToCart(itemId);
  
  revalidateTag("cartItems")

  return NextResponse.json(
    { message: `Item Added to cart`, isAuth: true },
    { status: status ?? 400 }
  );
}
export async function GET() {
  const userId = await getUserId()
  // @ts-expect-error
  const cartItems = await getCartItemsOfUser(userId);

  return NextResponse.json( cartItems );
}
