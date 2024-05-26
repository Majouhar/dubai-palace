import OrderClient from "@/app/components/orders/orderClient";
import { Order } from "@/app/types/commonTypes";
import { getAllOrdersofUser } from "@/lib/orderActions";
import React from "react";

async function Orders() {
  //@ts-expect-error
  const orders: Order[] = await getAllOrdersofUser();
  return <OrderClient serverOrders={orders} />;
}

export default Orders;
