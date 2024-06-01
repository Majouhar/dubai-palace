import { OrderItem } from "@/app/types/commonTypes";
import { getOrderById } from "@/lib/orderActions";
import { getProductsByIDs } from "@/lib/productActions";
import { getUserDetailsById } from "@/lib/userActions";
import React from "react";

async function AdminOrderDetails({
  params: { orderId },
}: Readonly<{ params: { orderId: string } }>) {
  const order = await getOrderById(Number(orderId));
  const user = await getUserDetailsById(order?.user_id ?? -1);
  //@ts-expect-error
  const items: OrderItem[] | undefined = order?.items;
  const mainItems = await getProductsByIDs(
    items?.map((item) => item.item_id) ?? []
  );
  return (
    <div>
      <h3>Order: {orderId}</h3>
      {items?.map((item, index) => {
        return (
          <>
            <p>Name: {mainItems[index].name}</p>
            <p>Color: {mainItems[index].color}</p>
            <p>Brand: {mainItems[index].brand}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price While Order: {item.price_while_order}</p>
            <p>Delivered Date: {item.date_delivered}</p>
          </>
        );
      })}
      <h4>Date Ordered: {order?.date_ordered}</h4>
      <h4>Expected Delivery Date: {order?.expected_delivery_date}</h4>
      <h4>Status: {order?.status}</h4>
      <h4>Shipped Date: {order?.shipped_date}</h4>
      <h4>Delivered Date{order?.delivered_date}</h4>
      <h4>{user?.first_name} {user?.last_name}</h4>
      <h4>{user?.mobile}</h4>
    </div>
  );
}

export default AdminOrderDetails;
