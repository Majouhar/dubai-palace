"use client";
import React from "react";
import classes from "./userSection.module.css";
import {
  UserIcon,
  ShoppingCartIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { cartItemsState } from "@/app/recoil/atoms/atom";

function UserSection() {
  const cartItems = useRecoilValue(cartItemsState);
  const router = useRouter();
  const handleOrders = () => {
    router.push("/orders");
  };
  const handleProfileClick = () => {
    router.push("/user");
  };
  const handleCartClick = () => {
    router.push("/cart");
  };
  return (
    <div className={classes.container}>
      <ListBulletIcon
        onClick={handleOrders}
        className="size-8  cursor-pointer"
      />
      <UserIcon
        onClick={handleProfileClick}
        className="size-8  cursor-pointer"
      />
      <div
        onClick={handleCartClick}
        className={`${classes.countBox} cursor-pointer`}
      >
        {cartItems && cartItems.length > 0 && (
          <div onClick={handleCartClick}>
            <small>{cartItems.length}</small>
          </div>
        )}
        <ShoppingCartIcon className="size-8  " />
      </div>
    </div>
  );
}

export default UserSection;
