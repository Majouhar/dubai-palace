"use client";
import React, { useEffect, useState } from "react";
import classes from "./loading.module.css";

function Loading() {
  const [colorBox, setColorBox] = useState([0, 1, 1, 0]);
  useEffect(() => {
    const intervalID = setInterval(() => {
      setColorBox((prev) => (prev[0] == 0 ? [1, 0, 0, 1] : [0, 1, 1, 0]));
    }, 500);
    return () => {
      clearInterval(intervalID);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={classes.container}>
      <div
        style={{
          backgroundColor:
            colorBox[0] === 1
              ? "var(--COLOR-PRIMARY)"
              : "var(--COLOR-TERTIARY)",
        }}
      ></div>
      <div
        style={{
          backgroundColor:
            colorBox[1] === 1
              ? "var(--COLOR-PRIMARY)"
              : "var(--COLOR-TERTIARY)",
        }}
      ></div>
      <div
        style={{
          backgroundColor:
            colorBox[2] === 1
              ? "var(--COLOR-PRIMARY)"
              : "var(--COLOR-TERTIARY)",
        }}
      ></div>
      <div
        style={{
          backgroundColor:
            colorBox[3] === 1
              ? "var(--COLOR-PRIMARY)"
              : "var(--COLOR-TERTIARY)",
        }}
      ></div>
    </div>
  );
}

export default Loading;