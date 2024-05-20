import { getUserId, updateCartItemsOfUser } from "@/lib/cartActions";
import { revalidateTag } from "next/cache";
import { NextResponse, NextRequest } from "next/server";
export async function PUT(
  request: NextRequest,
  { params: { itemId } }: { params: { itemId: string } }
) {
  const userId = await getUserId();
  const data = await request.json();
  const { quantity } = data;
  // @ts-expect-error
  await updateCartItemsOfUser(userId, itemId, quantity);
  revalidateTag("cartItems")
  return NextResponse.json({ message: "Success" });
}
