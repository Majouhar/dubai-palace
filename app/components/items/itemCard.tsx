import React from "react";
import classes from "./itemCard.module.css";
import Image from "next/image";
import { Item } from "@/app/types/commonTypes";

function ItemCard({item}:Readonly<{item:Item}>) {
  return (
    <div className={classes["card"]}>
      <Image src={item.images[0]} width={150} height={200} alt={item.name} />
      <h4 className={classes.itemName}>{item.name}</h4>
      <div className={classes.priceAction}>
        <div>
          {item.discount > 0 && (
            <p className={classes.discount}>₹{item.price}</p>
          )}
          <p>₹{(item.price * (100 - item.discount)) / 100}</p>
        </div>
        <button>Add to Cart</button>
      </div>
    </div>
  );
}

export default ItemCard;
