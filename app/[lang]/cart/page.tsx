import React from "react";
import { getAllProducts } from "@/lib/productActions";
import { getCartItemsOfUser, getUserId } from "@/lib/cartActions";
import CartClientComponent from "@/app/components/cartItemCard/cartClientComponent";
import { unstable_cache } from "next/cache";
const cachedCartItems = unstable_cache(
  async (userId) => getCartItemsOfUser(userId),
  ["cart-items"],
  { tags: ["cartItems"] }
);
async function Cart() {
  const itemData = await getAllProducts();
  const userId = await getUserId();
  const cartItems = await cachedCartItems(userId);

  return (
    <CartClientComponent itemData={itemData} cartItemsServer={cartItems} />
  );
}

export default Cart;
