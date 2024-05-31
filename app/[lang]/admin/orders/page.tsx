import { getAllOrders } from "@/lib/orderActions";
import React from "react";
import AdminOrderPage from "./adminOrderPage";
import { Order } from "@/app/types/commonTypes";

async function AdminOrders() {
  //@ts-expect-error
  const allOrders: Order[] = await getAllOrders();
  return <AdminOrderPage orders={allOrders} />;
}

export default AdminOrders;
