"use client";
import { wishListItemsState } from "@/app/recoil/atoms/atom";
import { Item } from "@/app/types/commonTypes";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
import WishListCard from "./wishListCard";
import Overlay from "../overlay";
import { OverlayConstants } from "@/lib/enums";
import classes from "./wishListClient.module.css";

function WishListCardClient({ serverItem }: Readonly<{ serverItem: Item[] }>) {
  const [items, setItems] = useRecoilState(wishListItemsState);
  useEffect(() => {
    if (items === undefined) {
      setItems(serverItem);
    }
  }, [items, serverItem, setItems]);
  let component;
  if (items && items.length > 0) {
    component = (
      <div className={classes.container}>
        {items.map((item) => (
          <WishListCard item={item} key={uuidv4()} />
        ))}
      </div>
    );
  } else if (items && items.length == 0) {
    component = <div>No Items present</div>;
  } else {
    component = <Overlay action={OverlayConstants.LOADING} />;
  }
  return component;
}

export default WishListCardClient;
