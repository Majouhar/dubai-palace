import prisma from "./prismaClient";
import { OrderItem } from "@/app/types/commonTypes";
import { getFormattedDateToday } from "./utitlity";
import { getPriceOfProduct } from "./productActions";
import { getCartId, getUserId } from "./userActions";

export async function createCart() {
  const cart = await prisma.carts.create({
    data: {
      items: [],
    },
  });
  return cart.cart_id;
}

export async function getCartofUser() {
  const cartId = await getCartId();
  const cart = await prisma.carts.findUnique({
    where: {
      cart_id: cartId ?? 0,
    },
  });
  return cart;
}

export async function getCartItemsOfUser(cartId: number) {
  const cart = await prisma.carts.findUnique({
    where: {
      cart_id: cartId ?? 0,
    },
  });
  console.log("=d===================================");
  console.log(cartId);
  console.log("====================================");
  //@ts-expect-error
  const cartItems: OrderItem[] = await updatePriceOfItemsInCart(
    cart?.cart_id ?? -1,
    //@ts-expect-error
    cart?.items
  );
  return cartItems ?? [];
}

export async function updatePriceOfItemsInCart(
  cartID: number,
  cartItems: OrderItem[]
) {

  const priceUpdateItem = await Promise.all(
    cartItems.map(async (item) => {
      item.price_while_order = await getPriceOfProduct(item.item_id);
      return item;
    })
  );
  const updatedCart = await prisma.carts.update({
    where: {
      cart_id: cartID,
    },
    data: {
      items: priceUpdateItem,
    },
  });
  return updatedCart.items;
}

export async function addItemToCart(itemId: string) {
  const price = await getPriceOfProduct(itemId);
  const cart = await getCartofUser();
  const cartId = cart?.cart_id ?? -1;
  // @ts-expect-error
  const cartItems: OrderItem[] = cart?.items ?? [];
  const existingItem = cartItems.find((item) => item.item_id === itemId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const date = getFormattedDateToday();
    cartItems.push({
      date_added: date,
      item_id: itemId,
      quantity: 1,
      price_while_order: price,
    });
  }

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
  const cart = await getCartofUser();
  const cartId = cart?.cart_id ?? 0;
  // @ts-expect-error
  const cartItems: OrderItem[] = cart?.items ?? [];
  const newItems = cartItems.filter((val) => val.item_id !== itemId);
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

export async function updateCartItemsOfUser(
  userId: number,
  itemId: string,
  quantity: number
) {
  const cart = await getCartofUser();
  const cartId = cart?.cart_id ?? 0;
  // @ts-expect-error
  const cartItems: OrderItem[] = cart?.items ?? [];
  const updatedCartItems = cartItems.map((val) => {
    if (val.item_id === itemId) {
      val.quantity = quantity;
    }
    return val;
  });

  const status = await prisma.carts.update({
    where: {
      cart_id: cartId,
    },
    data: {
      items: updatedCartItems,
    },
  });
  return 201;
}
