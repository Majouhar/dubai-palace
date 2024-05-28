"use client";
import { orderItemState } from "@/app/recoil/atoms/atom";
import { Order } from "@/app/types/commonTypes";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
import Overlay from "../overlay";
import { OverlayConstants } from "@/lib/enums";
import classes from "./orderClient.module.css";
import OrderCard from "./orderCard";
import { FaceFrownIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

function OrderClient({ serverOrders }: Readonly<{ serverOrders: Order[] }>) {
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
    component = (
      <main className={classes.noItemsCart}>
        <div className={classes.iconContainer}>
          <ShoppingBagIcon className="size-8 bg" />
          <FaceFrownIcon className="size-8 " />
        </div>
        <p className={classes.text}>No Orders Present</p>
      </main>
    );
  } else {
    component = <Overlay action={OverlayConstants.LOADING} />;
  }
  return component;
}

export default OrderClient;
