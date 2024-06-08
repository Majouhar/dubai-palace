import { OrderItem } from "@/app/types/commonTypes";
import { getOrderById } from "@/lib/orderActions";
import { getProductsByIDs } from "@/lib/productActions";
import { getUserDetailsById } from "@/lib/userActions";
import styles from "./adminOrderDetails.module.css";
import React from "react";
import { v4 } from "uuid";
import Image from "next/image";
import OrderFullFillMent from "./fullfilment";
import OrderDetailItemCard from "./orderItemCard";
import { convertPrismaDecimalToNumber } from "@/lib/utitlity";

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
    <div className={styles.orderDetails}>
      <h3 className={styles.orderTitle}>Order {orderId}</h3>
      <div className={styles.orderInfo}>
        <OrderFullFillMent
          //@ts-expect-error
          order={order}
        />
        <div className={styles.section}>
          <h4>Shipping Address</h4>
          <p>
            {user?.first_name} {user?.last_name}
          </p>
          <p>{user?.address_line1}</p>
          <p>{user?.address_line2}</p>
          <p>{user?.pincode}</p>
          <p>{user?.district}</p>
        </div>
        <div className={styles.section}>
          <h4>Contact</h4>
          <p>{user?.email}</p>
          <a href={`tel:${user?.mobile}`}>{user?.mobile}</a>
        </div>

        <div className={styles.section}>
          <h4>Items ({items?.length})</h4>
          {items?.map((item, index) => {
            const mainItem = mainItems[index];
            return (
              <OrderDetailItemCard
                key={v4()}
                item={item}
                mainItem={convertPrismaDecimalToNumber(mainItem)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AdminOrderDetails;
