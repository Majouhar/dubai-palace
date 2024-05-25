"use client";
import { wishListItems } from "@/app/recoil/atoms/atom";
import { Item } from "@/app/types/commonTypes";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
import WishListCard from "./wishListCard";
import Overlay from "../overlay";
import { OverlayConstants } from "@/lib/enums";

function WishListCardClient({ serverItem }: Readonly<{ serverItem: Item[] }>) {
  const [items, setItems] = useRecoilState(wishListItems);
  useEffect(() => {
    if (items===undefined) {
        setItems(serverItem);
      }
  }, [items, serverItem, setItems]);
  let component;
  if (items && items.length > 0) {
    component = items.map((item) => <WishListCard key={uuidv4()} />);
  } else if (items && items.length == 0) {
    component = <div>No Items present</div>;
  } else {
    component = <Overlay action={OverlayConstants.LOADING} />;
  }
  return component;
}

export default WishListCardClient;
