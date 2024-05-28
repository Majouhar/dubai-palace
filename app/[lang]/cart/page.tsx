import React from "react";
import { getAllProducts } from "@/lib/productActions";
import { getCartItemsOfUser } from "@/lib/cartActions";
import CartClientComponent from "@/app/components/cartItemCard/cartClientComponent";
import { unstable_cache } from "next/cache";
import { getServerSession } from "next-auth";
import { getCartId } from "@/lib/userActions";
const cachedCartItems = unstable_cache(
  async (cartId) => getCartItemsOfUser(cartId),
  ["cart-items"],
  { tags: ["cartItems"] }
);
async function Cart() {
  const itemData = await getAllProducts();
  const cartId = await getCartId();
  const cartItems = await cachedCartItems(cartId);

  return (
    <CartClientComponent itemData={itemData} cartItemsServer={cartItems} />
  );
}

export default Cart;
