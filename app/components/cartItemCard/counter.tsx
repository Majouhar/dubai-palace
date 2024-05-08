import React from "react";
import classes from "./counter.module.css"

function Counter({ value }: Readonly<{ value: number }>) {
  return (
    <div className={classes.container}>
      <div>-</div>
      <div>{value}</div>
      <div>+</div>
    </div>
  );
}

export default Counter;
