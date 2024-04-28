import React from "react";
import classes from "./logo.module.css";
import Link from "next/link";

function Logo() {
  return (
    <Link href={"/"}>
      <div className={classes.logo}>
        <h1>Dubai PP</h1>
      </div>
    </Link>
  );
}

export default Logo;
