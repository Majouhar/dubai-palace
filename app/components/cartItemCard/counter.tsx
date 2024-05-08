"use client";
import React, { useState } from "react";
import classes from "./counter.module.css";

function Counter({
  value,
  itemId,
}: Readonly<{ value: number; itemId: string }>) {
  const [counter, setCounter] = useState(value);
  const handleCounter = (value: number) => {
    if (counter !== 1 && value < 0) {
      setCounter((prev) => prev -1);
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
      <div>{counter}</div>
      <div onClick={() => handleCounter(1)}>+</div>
    </div>
  );
}

export default Counter;
