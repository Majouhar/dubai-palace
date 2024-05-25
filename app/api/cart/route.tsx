"use server";
import {
  addItemToCart,
  getCartItemsOfUser,
} from "@/lib/cartActions";
import { getCartId } from "@/lib/userActions";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { itemId } = data;

  const status = await addItemToCart(itemId);

  revalidateTag("cartItems");

  return NextResponse.json(
    { message: `Item Added to cart`, isAuth: true },
    { status: status ?? 400 }
  );
}
export async function GET() {
  const cartId = await getCartId();
  const cartItems = await getCartItemsOfUser(cartId);
  return NextResponse.json(cartItems);
}
