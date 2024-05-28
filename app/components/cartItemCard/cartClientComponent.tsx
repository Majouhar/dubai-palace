"use client";
import React, { useEffect, useState } from "react";
import classes from "./cartClientComponent.module.css";
import { Item, OrderItem } from "@/app/types/commonTypes";
import CartItemCard from "./cartItemCard";
import { useRecoilState } from "recoil";
import { cartItemsState } from "@/app/recoil/atoms/atom";
import Overlay from "../overlay";
import { ShoppingBagIcon, FaceFrownIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

function CartClientComponent({
  cartItemsServer,
  itemData,
}: Readonly<{ cartItemsServer: OrderItem[]; itemData: Item[] }>) {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  const router = useRouter();
  useEffect(() => {
    if (cartItems == undefined) {
      setCartItems(cartItemsServer);
    }
  }, [cartItems, cartItemsServer, setCartItems]);
  const handleCheckout = () => {
    router.push("/cart/confirm");
  };
  const newItems =
    cartItems?.map((item) => {
      const itemTemp = itemData.find((val: Item) => val.id === item.item_id);
      if (itemTemp) {
        itemTemp.order_quantity = item.quantity;
        return itemTemp;
      }
    }) ?? [];
  const price =
    newItems?.reduce(
      (sum, item) => sum + (item?.order_quantity ?? 0) * (item?.price ?? 0),
      0
    ) ?? 0;
  const discountPrice =
    newItems?.reduce(
      (sum, item) =>
        sum +
        ((item?.order_quantity ?? 0) *
          (item?.price ?? 0) *
          (100 - (item?.discount ?? 0))) /
          100,
      0
    ) ?? 0;
  if (cartItems && cartItems?.length > 0) {
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
            <button onClick={handleCheckout}>Checkout</button>
          </div>
        </div>
      </main>
    );
  } else if (cartItems == undefined) {
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
