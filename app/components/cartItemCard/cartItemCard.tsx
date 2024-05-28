import React from "react";
import classes from "./cartItemCard.module.css";
import Image from "next/image";
import { Item } from "@/app/types/commonTypes";
import Counter from "./counter";
import ButtonContainer from "./buttonContainer";

function CartItemCard({
  item,
  isEditable = true,
}: Readonly<{ item: Item; isEditable?: boolean }>) {
  const originalPrice = (item?.order_quantity ?? 0) * (item?.price ?? 0);

  const discountPrice =
    ((item?.order_quantity ?? 0) *
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
            {isEditable ? <ButtonContainer itemId={item.id} />:<div></div>}
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
          {isEditable ? (
            <Counter value={item.order_quantity ?? 1} itemId={item.id} />
          ) : (
            <p>{item.order_quantity} Qty</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartItemCard;
