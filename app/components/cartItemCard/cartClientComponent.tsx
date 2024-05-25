"use client";
import React, { useEffect} from "react";
import classes from "./cartClientComponent.module.css";
import { Item, OrderItem } from "@/app/types/commonTypes";
import CartItemCard from "./cartItemCard";
import { useRecoilState } from "recoil";
import { cartItemsState, isCartCheckedState } from "@/app/recoil/atoms/atom";
import Overlay from "../overlay";
import { ShoppingBagIcon,FaceFrownIcon  } from "@heroicons/react/24/outline";

function CartClientComponent({
  cartItemsServer,
  itemData,
}: Readonly<{ cartItemsServer: OrderItem[]; itemData: Item[] }>) {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  const [isCartChecked, setIsCartChecked] = useRecoilState(isCartCheckedState);
  useEffect(() => {
    if (!cartItems.length && !isCartChecked) {
      setCartItems(cartItemsServer);
      setIsCartChecked(true);
    }
  }, [
    cartItems.length,
    cartItemsServer,
    isCartChecked,
    setCartItems,
    setIsCartChecked,
  ]);
  const newItems = cartItems.map((item) => {
    const itemTemp = itemData.find((val: Item) => val.id === item.itemID);
    if (itemTemp) {
      itemTemp.orderQuantity = item.quantity;
      return itemTemp;
    }
  });
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
  if (cartItems.length > 0) {
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
  } else if (!isCartChecked && cartItems.length === 0) {
    return (
      <main className={classes.container}>
        <Overlay />
      </main>
    );
  } else {
    return (
      <main className={classes.noItemsCart}>
        <div className={classes.iconContainer}>
          <ShoppingBagIcon className="size-8 bg" />
          <FaceFrownIcon className="size-8 " />
        </div>
        <p className={classes.text}>Empty Cart</p>
      </main>
    );
  }
}

export default CartClientComponent;
