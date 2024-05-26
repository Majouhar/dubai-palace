"use client";
import { orderItemState, wishListItemsState } from "@/app/recoil/atoms/atom";
import { Item, Order } from "@/app/types/commonTypes";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
import Overlay from "../overlay";
import { OverlayConstants } from "@/lib/enums";
import classes from "./orderClient.module.css";
import OrderCard from "./orderCard";

function OrderClient({
  serverOrders,
}: Readonly<{ serverOrders: Order[] }>) {
  const [orders, setOrders] = useRecoilState(orderItemState);
  useEffect(() => {
    if (orders === undefined) {
      setOrders(serverOrders);
    }
  }, [orders, serverOrders, setOrders]);
  let component;
  if (orders && orders.length > 0) {
    component = (
      <div className={classes.container}>
        {orders.map((order) => (
          <OrderCard order={order} key={uuidv4()} />
        ))}
      </div>
    );
  } else if (orders && orders.length == 0) {
    component = <div>No Orders present</div>;
  } else {
    component = <Overlay action={OverlayConstants.LOADING} />;
  }
  return component;
}

export default OrderClient;
