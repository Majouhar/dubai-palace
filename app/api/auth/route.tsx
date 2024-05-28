import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";
import { createUser, getUser } from "@/lib/userActions";
import { createWishList } from "@/lib/wishListActions";
import { createCart } from "@/lib/cartActions";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { mobile, password } = data;
  if (!mobile || mobile.length != 10 || password?.trim()?.length < 7) {
    return NextResponse.json(
      { message: "Enter 10 digit Mobile & password >= 8" },
      { status: 422 }
    );
  }
  const isExistingUser = await getUser(mobile);
  if (isExistingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 409 }
    );
  }
  data.password = await hashPassword(password);

  data.wishListId = await createWishList();
  data.cartId = await createCart();

  const user = await createUser(data);

  return NextResponse.json(
    { message: `User Created User for ${user?.mobile}`, status: 200 },
    { status: 201 }
  );
}
