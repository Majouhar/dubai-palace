"use client";
import React, { useEffect, useState } from "react";
import NewItemCard from "./newItemCard";
import { tags } from "@/lib/data";
import classes from "./shufflingItem.module.css";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { Item } from "@/app/types/commonTypes";

function ShufflingCards({ newData }: Readonly<{ newData: Item[] }>) {
  const data = newData.filter((d) => d.tags.includes(tags.latest));
  const length = data.length;
  const [shuffleData, setShuffleData] = useState<number[]>([0, 1, 2, 3, 4]);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  useEffect(() => {
    const id = setInterval(() => {
      const newData = shuffleData.map((data) => {
        return (data + 1) % length;
      });
      setShuffleData(newData);
    }, 5000);
    return () => {
      clearInterval(id);
    };
  }, [length, shuffleData]);
  return (
    <div className={classes.itemContainer}>
      <Link href={`/items/${data[shuffleData[0]].id}`}>
        <NewItemCard item={data[shuffleData[0]]} />
      </Link>
      <Link href={`/items/${data[shuffleData[1]].id}`}>
        <NewItemCard item={data[shuffleData[1]]} />
      </Link>
      <Link href={`/items/${data[shuffleData[2]].id}`}>
        <NewItemCard item={data[shuffleData[2]]} />
      </Link>
      {!isMobile && (
        <Link href={`/items/${data[shuffleData[3]].id}`}>
          <NewItemCard item={data[shuffleData[3]]} />
        </Link>
      )}
      {!isMobile && (
        <Link href={`/items/${data[shuffleData[4]].id}`}>
          <NewItemCard item={data[shuffleData[4]]} />
        </Link>
      )}
    </div>
  );
}

export default ShufflingCards;
