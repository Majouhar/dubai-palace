import { getServerSession } from "next-auth";
import prisma from "./prismaClient";
import { OrderItem } from "@/app/types/commonTypes";
import { getFormattedDateToday } from "./utitlity";

export async function createCart() {
  const cart = await prisma.carts.create({
    data: {
      items: [],
    },
  });
  return cart.cart_id;
}
export async function getUserId(){
  const userDetails = await getServerSession();
  const userId = userDetails?.user?.image ?? 0;
  return userId
}
export async function getCartofUser(userId:number) {
 

  const user = await prisma.users.findUnique({
    where: { user_id: userId },
  });
  const cart = await prisma.carts.findUnique({
    where: {
      cart_id: user?.cart_id ?? 0,
    },
  });
  return cart;
}

export async function getCartItemsOfUser(userId:number) {
  const cart = await getCartofUser(userId);
  // @ts-expect-error
  const cartItems: OrderItem[] = cart?.items;
  return cartItems ?? [];
}

export async function addItemToCart(itemId: string) {
  const userId = await getUserId()
  // @ts-expect-error
  const cart = await getCartofUser(userId);
  const cartId = cart?.cart_id ?? 0;
  // @ts-expect-error
  const cartItems: OrderItem[] = cart?.items ?? [];
  const existingItem = cartItems.find((item) => item.itemID === itemId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const date = getFormattedDateToday();
    cartItems.push({
      dateAdded: date,
      itemID: itemId,
      quantity: 1,
    });
  }
  console.log(cartItems);

  await prisma.carts.update({
    where: {
      cart_id: cartId,
    },
    data: {
      items: cartItems,
    },
  });
  return 201;
}

export async function removeItemFromCart(itemId: string) {
  const userId = await getUserId()
  // @ts-expect-error
  const cart = await getCartofUser(userId);
  const cartId = cart?.cart_id ?? 0;
  // @ts-expect-error
  const cartItems: OrderItem[] = cart?.items ?? [];
  const newItems = cartItems.filter((val) => val.itemID !== itemId);
  await prisma.carts.update({
    where: {
      cart_id: cartId,
    },
    data: {
      items: newItems,
    },
  });
  return 201;
}
