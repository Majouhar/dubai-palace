"use client";
import React, { useEffect, useState } from "react";
import NewItemCard from "./newItemCard";
import { data } from "@/lib/data";
import classes from "./shufflingItem.module.css";

function ShufflingCards() {
  const length = data.length;
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
      <NewItemCard item={data[shuffleData[0]]} />
      <NewItemCard item={data[shuffleData[1]]} />
      <NewItemCard item={data[shuffleData[2]]} />
      <NewItemCard item={data[shuffleData[3]]} />
      <NewItemCard item={data[shuffleData[4]]} />
    </div>
  );
}

export default ShufflingCards;
