import { getOrderById } from "@/lib/orderActions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { orderId } }: { params: { orderId: number } }
) {
  const order = await getOrderById(orderId);
  return NextResponse.json(order);
}
