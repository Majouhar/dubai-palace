import React from "react";
import classes from "./line.module.css";

function Line({ isReverse = false }) {
  return (
    <div className={isReverse ? classes["line-rev"] : classes.line}>
      <div></div>
      <div></div>
    </div>
  );
}

export default Line;
