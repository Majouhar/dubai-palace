import { getOrderById, updateOrderStatus } from "@/lib/orderActions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { orderId } }: { params: { orderId: number } }
) {
  const order = await getOrderById(orderId);
  return NextResponse.json(order);
}

export async function POST(
  request: NextRequest,
  { params: { orderId } }: { params: { orderId: number } }
) {
  const data = await request.json();
  const status = await updateOrderStatus(
    orderId,
    data["status"],
    data["expDlvy"],
    data["dlvyDt"],
    data["shpDt"]
  );
  return NextResponse.json({ status });
}
