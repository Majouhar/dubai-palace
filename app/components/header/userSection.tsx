"use client";
import React, { useState } from "react";
import classes from "./userSection.module.css";
import {
  HeartIcon,
  UserIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

function UserSection() {
  const [count] = useState(2);
  const handleWishList = () => {};
  const handleProfileClick = () => {};
  const handleCartClick = () => {};
  return (
    <div className={classes.container}>
      <HeartIcon onClick={handleWishList} className="size-8  cursor-pointer" />
      <UserIcon
        onClick={handleProfileClick}
        className="size-8  cursor-pointer"
      />
      <div
        onClick={handleCartClick}
        className={`${classes.countBox} cursor-pointer`}
      >
        <div>
          <small>{count}</small>
        </div>
        <ShoppingCartIcon className="size-8  " />
      </div>
    </div>
  );
}

export default UserSection;
