"use client";
import React from "react";
import classes from "./logo.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Logo() {
  const lang = usePathname().split("/")[1];
  return (
    <Link href={`/${lang}`}>
      <div className={classes.logo}>
        <h1>Dubai PP</h1>
      </div>
    </Link>
  );
}

export default Logo;
