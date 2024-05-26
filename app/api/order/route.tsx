
import { createOrder, getAllOrdersofUser } from "@/lib/orderActions";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
  revalidateTag("cartItems");
  const order = await createOrder();
  return NextResponse.json({ status: order });
}
export async function GET() {
  const orders = await getAllOrdersofUser()
  return NextResponse.json(orders);
}
