import React from "react";
import classes from "./cartItemCard.module.css";
import Image from "next/image";
import { Item, OrderItem } from "@/app/types/commonTypes";
import { itemData, orderItem } from "@/lib/data";
import Counter from "./counter";
import { CheckBadgeIcon, TrashIcon } from "@heroicons/react/24/outline";

function CartItemCard({ item }: Readonly<{ item: Item }>) {
  const originalPrice = (item?.orderQuantity ?? 0) * (item?.price ?? 0);
  const discountPrice =
    ((item?.orderQuantity ?? 0) *
      (item?.price ?? 0) *
      (100 - (item?.discount ?? 0))) /
    100;
  return (
    <div className={classes.container}>
      <Image
        src={item?.images[0] ?? ""}
        alt={item?.name ?? ""}
        width={100}
        height={140}
      />
      <div className={classes.properties}>
        <h4>{item?.name}</h4>
        <small>In Stock</small>
        <div>
          <div className={classes.sizeColorContainer}>
            <p className={classes.color}>{item?.color}</p>
            {item?.size != undefined && (
              <p className={classes.size}>{item.size}</p>
            )}
          </div>
          <div className={classes.buttonContainer}>
            <button>
              <TrashIcon className="size-4" /> <span>Remove</span>
            </button>
            <button>
              <CheckBadgeIcon className="size-4" /> <span>WishList</span>
            </button>
          </div>
        </div>
      </div>
      <div className={classes.priceContainer}>
        <p>
          <span
            className={
              discountPrice !== originalPrice ? classes.linethrough : "hidden"
            }
          >
            ₹{originalPrice}
          </span>
          <span>₹{discountPrice}</span>
        </p>

        <div>
          <Counter value={item.orderQuantity ?? 1} itemId ={item.id} />
        </div>
      </div>
    </div>
  );
}

export default CartItemCard;
