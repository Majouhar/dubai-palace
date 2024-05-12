import React from "react";
import classes from "./cart.module.css";
import CartItemCard from "@/app/components/cartItemCard/cartItemCard";
import { getAllProducts } from "@/lib/productActions";
import { Item } from "@/app/types/commonTypes";
import { getCartItemsOfUser } from "@/lib/cartActions";
async function Cart() {
  const itemData = await getAllProducts();
  const cartItems = await getCartItemsOfUser();
  const newItems = cartItems.map((item) => {
    const itemTemp = itemData.find((val: Item) => val.id === item.itemID);
    if (itemTemp) {
      itemTemp.orderQuantity = item.quantity;
      return itemTemp;
    }
  });
  console.log(newItems)
  const price = newItems.reduce(
    (sum, item) => sum + (item?.orderQuantity ?? 0) * (item?.price ?? 0),
    0
  );
  const discountPrice = newItems.reduce(
    (sum, item) =>
      sum +
      ((item?.orderQuantity ?? 0) *
        (item?.price ?? 0) *
        (100 - (item?.discount ?? 0))) /
        100,
    0
  );
  if (newItems.length > 0) {
    return (
      <main className={classes.container}>
        <div className={classes.cartItems}>
          <h3>Shopping Cart</h3>
          <div className={classes.itemContainer}>
            {newItems.map((item) => {
              if (item) {
                return <CartItemCard item={item} key={item.id} />;
              }
            })}
          </div>
          <div className={classes.priceContainer}>
            <p>
              <span>Sub Total</span> <span>₹{price}</span>
            </p>
            <p>
              <span>Shipping</span> <span>₹0</span>
            </p>
            <p>
              <span>Discount</span> <span>₹{price - discountPrice}</span>
            </p>
            <p>
              <span>GST</span> <span>₹10</span>
            </p>
            <p className={classes.total}>
              <span>Total</span> <span>₹{discountPrice + 10}</span>
            </p>

            <button>Checkout</button>
          </div>
        </div>
      </main>
    );
  } else {
    return <main className={classes.container}>No Items in Cart</main>;
  }
}

export default Cart;
