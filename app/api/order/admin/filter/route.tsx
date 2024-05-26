import { getFilteredOrders } from "@/lib/orderActions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  {
    searchParams: { status },
  }: { searchParams: { status: "ordered" | "shipped" | "delivered" } }
) {
  const orders = await getFilteredOrders(status);
  return NextResponse.json(orders);
}
