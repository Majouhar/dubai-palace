"use client";
import React, { useState } from "react";
import classes from "./userSection.module.css";
import {
  HeartIcon,
  UserIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

function UserSection() {
  const [count] = useState(2);
  const router = useRouter()
  const handleWishList = () => {
    router.push("/wishlist")
  };
  const handleProfileClick = () => {
    router.push("/user")
  };
  const handleCartClick = () => {
    router.push("/cart")
  };
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
