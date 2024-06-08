"use client";
import Image from "next/image";
import React from "react";
import styles from "./adminOrderDetails.module.css";
import { v4 } from "uuid";
import { Item, OrderItem } from "@/app/types/commonTypes";
import { useRouter } from "next/navigation";

function OrderDetailItemCard({
  item,
  mainItem,
}: Readonly<{ item: OrderItem; mainItem: Item }>) {
  const router = useRouter();
  const handleItemClick = () => {
    router.push(`/items/${item.item_id}`);
  };
  return (
    <div className={`${styles.item} cursor-pointer`} key={v4()} onClick={handleItemClick}>
      <Image
        width={50}
        height={50}
        className={styles.itemImage}
        src={mainItem.images[0]}
        alt={mainItem.name}
      />
      <div className={styles.itemDetails}>
        <p>{mainItem.name}</p>
        <p>Qty: {item.quantity}</p>
        <p>Rs. {item.price_while_order}</p>
      </div>
    </div>
  );
}

export default OrderDetailItemCard;
