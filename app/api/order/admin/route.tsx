import { getAllOrders, updateOrderStatus } from "@/lib/orderActions";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const order = await getAllOrders();
  return NextResponse.json(order);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const status = await updateOrderStatus(
    data.orderId,
    data.status,
    data.expectedDelivery
  );
  return NextResponse.json({ status: status });
}
