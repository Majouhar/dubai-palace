import WishListCardClient from "@/app/components/wishLIst/wishListClient";
import { getWishListItems } from "@/lib/wishListActions";
import React from "react";

async function WishList() {
  const items = await getWishListItems()
  return <WishListCardClient serverItem={items}/>
}

export default WishList;
