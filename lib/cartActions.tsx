import { getServerSession } from "next-auth";
import prisma from "./prismaClient";
import { OrderItem } from "@/app/types/commonTypes";

export async function createCart() {
  const cart = await prisma.carts.create({
    data: {
      items: [],
    },
  });
  return cart.cart_id;
}

export async function getCartItemsOfUser() {
  const userDetails = await getServerSession();
  const userId = userDetails?.user?.image ?? 0;

  const user = await prisma.users.findUnique({
    // @ts-expect-error
    where: { user_id: userId },
  });
  const cart = await prisma.carts.findUnique({
    where: {
      cart_id: user?.cart_id ?? 0,
    },
  });
  // @ts-expect-error
  const cartItems: OrderItem[] = cart?.items;
  return cartItems ?? [];
}
