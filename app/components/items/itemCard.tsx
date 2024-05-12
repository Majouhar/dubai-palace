import React from "react";
import classes from "./itemCard.module.css";
import Image from "next/image";
import { Item } from "@/app/types/commonTypes";
import Link from "next/link";
import AddToCartButton from "./addToCartButton";

function ItemCard({ item }: Readonly<{ item: Item }>) {
  return (
    <div className={classes["card"]}>
      <Link href={`/items/${item.id}`}>
        <Image src={item.images[0]} width={150} height={200} alt={item.name} />
      </Link>
      <h4 className={classes.itemName}>{item.name}</h4>
      <div className={classes.priceAction}>
        <div>
          {item.discount > 0 && (
            <p className={classes.discount}>₹{item.price}</p>
          )}
          <p>₹{(item.price * (100 - item.discount)) / 100}</p>
        </div>
        <AddToCartButton itemId={item.id}/>
      </div>
    </div>
  );
}

export default ItemCard;
