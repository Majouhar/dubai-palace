import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { hashPassword } from "@/lib/auth";
import { randomUUID } from "crypto";
import { createCart, createUser, createWishList, getUser } from "@/lib/actions";
import { Cart, User, WishList } from "@/app/types/commonTypes";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const {
    mobile,
    password,
    firstName,
    lastName,
    pincode,
    district,
    addressLine1,
    addressLine2,
  } = data;
  if (!mobile || !(mobile.length < 10) || password?.trim()?.length < 7) {
    return NextResponse.json(
      { message: "Invalide Username/Password" },
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

  return NextResponse.json({ message: "User Created User" }, { status: 201 });
}
