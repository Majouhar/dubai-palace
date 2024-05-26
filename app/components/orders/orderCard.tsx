import { Order } from "@/app/types/commonTypes";
import React from "react";

function OrderCard({ order }: Readonly<{ order: Order }>) {
  return <div>{order.order_id}</div>;
}

export default OrderCard;
