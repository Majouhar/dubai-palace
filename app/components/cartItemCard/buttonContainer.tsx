"use client";
import { cartItemsState } from "@/app/recoil/atoms/atom";
import HttpClient from "@/utility/httpClient";
import { CheckBadgeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import React from "react";
import { useRecoilState } from "recoil";

function ButtonContainer({ itemId }: Readonly<{ itemId: string }>) {
  const lang = usePathname().split("/")[1];
  const [_, setCartItems] = useRecoilState(cartItemsState);
  const handleRemoveItem = () => [
    new HttpClient()
      .post(`/api/cart/${itemId}/remove`, { lang })
      .then((data) => {
        console.log(data);
        console.log('REMOVED')
        setCartItems((prev) => prev.filter((item) => item.itemID !== itemId));
      }),
  ];
  return (
    <>
      <button onClick={handleRemoveItem}>
        <TrashIcon className="size-4" /> <span>Remove</span>
      </button>
      <button>
        <CheckBadgeIcon className="size-4" /> <span>WishList</span>
      </button>
    </>
  );
}

export default ButtonContainer;
