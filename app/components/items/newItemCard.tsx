import Image from "next/image";
import React from "react";
import classes from "./newItemCard.module.css";
import { Item } from "@/app/types/commonTypes";

function NewItemCard({ item }: Readonly<{ item: Item }>) {
  return (
    <div className={classes["card"]}>
      <Image src={item.images[0]} width={150} height={200} alt={item.name} />
      <div className={classes.itemName}><h4>{item.name}</h4></div>
    </div>
  );
}

export default NewItemCard;
