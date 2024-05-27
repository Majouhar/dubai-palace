"use client";
import { Item, Order, OrderItem } from "@/app/types/commonTypes";
import styles from "./orderCard.module.css";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { convertDate } from "@/lib/utitlity";
import { v4 } from "uuid";
import OrderTracking from "./orderTracking";
import HttpClient from "@/utility/httpClient";
import Loading from "../loading";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

function OrderCard({ order }: Readonly<{ order: Order }>) {
  const [mergedItems, setMergedItems] = useState<(OrderItem & Item)[] | null>(
    null
  );
  const [isDisplayItems, setIsDisplayItems] = useState(false);
  useEffect(() => {
    if (!mergedItems && isDisplayItems) {
      new HttpClient()
        .get<Item[]>(
          `/api/items/${order.items.map((item) => item.item_id).join("/")}`
        )
        .then((items) => {
          setMergedItems(
            //@ts-expect-error
            items.map((item: Item) => {
              const orderItem = order.items.find(
                (it) => it.item_id === item.id
              );
              return { ...item, ...(orderItem ?? {}) };
            })
          );
        });
    }
  }, [isDisplayItems, mergedItems, order.items]);
  const orderStatusMap = {
    ordered: 1,
    shipped: 2,
    delivered: 3,
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <span className={styles.orderIdLabel}> Order ID:</span>{" "}
          <span className={styles.orderId}>{order.order_id}</span>
        </div>
        <div className={styles.orderInfo}>
          <div>Order date: {order.date_ordered}</div>
          {order.expected_delivery_date && (
            <div className={styles.delivery}>
              <span className={styles.estimatedDelivery}>
                Estimated delivery:
              </span>
              <span>{" " + convertDate(order.expected_delivery_date)}</span>
            </div>
          )}
        </div>
      </div>
      {/* @ts-expect-error */}
      <OrderTracking currentStatus={orderStatusMap[order.status]} />
      <div
        className={styles.iconContainer}
        onClick={() => setIsDisplayItems((prev) => !prev)}
      >
        <p>{order.items.length} Items</p>
        <div>
          {isDisplayItems ? (
            <ChevronUpIcon className={styles.icon} />
          ) : (
            <ChevronDownIcon className={styles.icon} />
          )}
        </div>
        <p>₹{order.price} </p>
      </div>
      {isDisplayItems && (
        <div className={styles.items}>
          {mergedItems ? (
            mergedItems?.map((item) => {
              return (
                <div className={styles.item} key={v4()}>
                  <Image
                    src={item.images[0] ?? ""}
                    alt={item.name}
                    width={50}
                    height={50}
                    className={styles.itemImage}
                  />

                  <div>
                    <div className={styles.itemName}>{item.name}</div>
                    <div className={styles.attributes}>
                      {item.color ?? ""} {item.color && " | "} {item.size ?? ""}{" "}
                    </div>
                  </div>
                  <div className={styles.itemPrice}>
                    ₹{(item.price_while_order ?? 0) * (item.quantity ?? 0)}
                  </div>
                  <div className={styles.itemQty}>Qty: {item.quantity}</div>
                </div>
              );
            })
          ) : (
            <div className={styles.loading}>
              <Loading />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default OrderCard;
