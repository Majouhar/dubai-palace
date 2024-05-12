import { addItemToCart } from "@/lib/cartActions";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { itemId } = data;

  const status = await addItemToCart(itemId);
  revalidatePath("/[lang]/cart","page");
  return NextResponse.json(
    { message: `Item Added to cart`, isAuth: true },
    { status: status ?? 400 }
  );
}
