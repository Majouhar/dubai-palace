"use client";
import { cartItemsState } from "@/app/recoil/atoms/atom";
import HttpClient from "@/utility/httpClient";
import { CheckBadgeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import Overlay from "../overlay";

function ButtonContainer({ itemId }: Readonly<{ itemId: string }>) {
  const lang = usePathname().split("/")[1];
  const [_, setCartItems] = useRecoilState(cartItemsState);
  const [isOverlay, setIsOverlay] = useState(false);
  const handleRemoveItem = () => {
    setIsOverlay(true);
    new HttpClient()
      .post(`/api/cart/${itemId}/remove`, { lang })
      .then((data) => {
        setIsOverlay(false);
        setCartItems((prev) => prev.filter((item) => item.itemID !== itemId));
      });
  };
  return (
    <>
      <button onClick={handleRemoveItem}>
        <TrashIcon className="size-4" /> <span>Remove</span>
      </button>
      <button>
        <CheckBadgeIcon className="size-4" /> <span>WishList</span>
      </button>
      {isOverlay && <Overlay message="Removing Item From Cart..." />}
    </>
  );
}

export default ButtonContainer;
