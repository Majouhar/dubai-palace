import { getFilteredOrders } from "@/lib/orderActions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  {
    params: { status },
  }: { params: { status: "ordered" | "shipped" | "delivered" } }
) {
  console.log(status)
  const orders = await getFilteredOrders(status);
  return NextResponse.json(orders);
}
