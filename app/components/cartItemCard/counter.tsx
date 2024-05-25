"use client";
import React, { useEffect, useRef, useState } from "react";
import classes from "./counter.module.css";
import { useRecoilState } from "recoil";
import { cartItemsState } from "@/app/recoil/atoms/atom";
import { OrderItem } from "@/app/types/commonTypes";
import HttpClient from "@/utility/httpClient";

function Counter({
  value,
  itemId,
}: Readonly<{ value: number; itemId: string }>) {
  const [counter, setCounter] = useState(value);
  const [_, setCartItems] = useRecoilState(cartItemsState);
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = counter;
    setCartItems((prev) => {
      const copyPrev: OrderItem[] = prev?.map((item) => ({ ...item })) ?? [];
      const item = copyPrev.find((val) => val.item_id == itemId);
      if (item) {
        item.quantity = counter;
      }

      return copyPrev;
    });
  }, [counter, itemId, setCartItems]);
  useEffect(() => {
    //send API call for cart update
    return () => {
      new HttpClient()
        .put(`/api/cart/${itemId}/quantity`, { quantity: valueRef.current })
        .then(() => {
          console.log("Quantity updated");
        });
    };
  }, [itemId]);
  const handleCounter = (value: number) => {
    if (counter !== 1 && value < 0) {
      setCounter((prev) => prev - 1);
    } else if (value > 0) {
      setCounter((prev) => prev + 1);
    }
  };
  return (
    <div className={classes.container}>
      <div
        className={counter === 1 ? classes.disableMinus : ""}
        onClick={() => handleCounter(-1)}
      >
        -
      </div>
      <div>{value}</div>
      <div onClick={() => handleCounter(1)}>+</div>
    </div>
  );
}

export default Counter;
