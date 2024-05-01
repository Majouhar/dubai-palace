"use client";
import React, { useEffect, useState } from "react";
import NewItemCard from "./newItemCard";
import { itemData as newData, tags} from "@/lib/data";
import classes from "./shufflingItem.module.css";
import Link from "next/link";

function ShufflingCards() {
  const data = newData.filter(d => d.tags.includes(tags.latest))
  const length = data.length;
  console.log(length)
  const [shuffleData, setShuffleData] = useState<number[]>([0, 1, 2, 3, 4]);
  useEffect(() => {
    const id = setInterval(() => {
      const newData = shuffleData.map((data) => {
       return (data+1)%length
      });
      setShuffleData(newData);
    }, 5000);
    return () => {
      clearInterval(id);
    };
  }, [length, shuffleData]);
  return (
    <div className={classes.itemContainer}>
      <Link href={`/items/${data[shuffleData[0]].id}`}><NewItemCard item={data[shuffleData[0]]} /></Link>
      <Link href={`/items/${data[shuffleData[1]].id}`}><NewItemCard item={data[shuffleData[1]]} /></Link>
      <Link href={`/items/${data[shuffleData[2]].id}`}><NewItemCard item={data[shuffleData[2]]} /></Link>
      <Link href={`/items/${data[shuffleData[3]].id}`}><NewItemCard item={data[shuffleData[3]]} /></Link>
      <Link href={`/items/${data[shuffleData[4]].id}`}><NewItemCard item={data[shuffleData[4]]} /></Link>
    </div>
  );
}

export default ShufflingCards;
