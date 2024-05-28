"use client";
import React, { useState } from "react";
import classes from "./cartClientComponent.module.css";
import { Item } from "@/app/types/commonTypes";
import CartItemCard from "./cartItemCard";
import { useRecoilState } from "recoil";
import { cartItemsState } from "@/app/recoil/atoms/atom";
import Overlay from "../overlay";
import HttpClient from "@/utility/httpClient";
import { OverlayConstants } from "@/lib/enums";
import { FaceFrownIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

function ConfirmOrderClient({ itemData }: Readonly<{ itemData: Item[] }>) {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  const [overlayMessage, setOverlayMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  console.log(overlayMessage, overlayMessage.length);
  const launchOrders = () =>{
    router.push("/orders")
  }
  const handleCheckout = () => {
    setIsLoading(true);
    new HttpClient()
      .post("/api/order", {})
      .then((response: any) => {
        setIsLoading(false);
        setCartItems([]);
        setOverlayMessage(
          `Order placed Successfully With Order ID: ${response?.orderId}`
        );
      })
      .catch((e) => {
        setIsLoading(false);
        setOverlayMessage(e);
        console.log("New Test");
      });
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
      <>
        <main className={classes.container}>
          <div className={classes.cartItems}>
            <h3>Confirm Order</h3>
            <div className={classes.itemContainer}>
              {newItems.map((item) => {
                if (item) {
                  return (
                    <CartItemCard
                      isEditable={false}
                      item={item}
                      key={item.id}
                    />
                  );
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
              <span className="mb-1">
                <b>Payment: Cash on Delivery</b>
              </span>
              <button onClick={handleCheckout}>Place Order</button>
            </div>
          </div>
        </main>
        {overlayMessage.length > 0 && (
          <Overlay
            action={OverlayConstants.ERROR}
            cancelAction={() => setOverlayMessage("")}
            message={overlayMessage}
          />
        )}
        {isLoading && <Overlay action={OverlayConstants.LOADING} />}
      </>
    );
  } else {
    return (
      <>
        <main className={classes.noItemsCart}>
          <div className={classes.iconContainer}>
            <ShoppingBagIcon className="size-8 bg" />
            <FaceFrownIcon className="size-8 " />
          </div>
          <p className={classes.text}>Empty Cart</p>
        </main>
        {overlayMessage.length > 0 && (
          <Overlay
            action={OverlayConstants.ERROR}
            cancelAction={() => setOverlayMessage("")} okAction={launchOrders}
            message={overlayMessage}
          />
        )}
        {isLoading && <Overlay action={OverlayConstants.LOADING} />}
      </>
    );
  }
}

export default ConfirmOrderClient;
