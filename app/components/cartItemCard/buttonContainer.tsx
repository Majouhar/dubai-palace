"use client";
import { cartItemsState } from "@/app/recoil/atoms/atom";
import HttpClient from "@/utility/httpClient";
import { CheckBadgeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import Overlay from "../overlay";
import Modal from "../modal";
import { OverlayConstants } from "@/lib/enums";

function ButtonContainer({ itemId }: Readonly<{ itemId: string }>) {
  const lang = usePathname().split("/")[1];
  const [_, setCartItems] = useRecoilState(cartItemsState);
  const [isOverlay, setIsOverlay] = useState(false);
  const [isErrorOverlay, setIsErrorOverlay] = useState(false);
  const handleRemoveItem = () => {
    setIsOverlay(true);
    new HttpClient()
      .post(`/api/cart/${itemId}/remove`, { lang })
      .then((data) => {
        setIsOverlay(false);
        setCartItems(
          (prev) => prev?.filter((item) => item.item_id !== itemId) ?? []
        );
      })
      .catch((error) => {});
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
      {isErrorOverlay && (
        <Overlay
          message="Error Removing Item"
          action={OverlayConstants.ERROR}
          cancelAction={() => setIsErrorOverlay(false)}
        />
      )}
    </>
  );
}

export default ButtonContainer;
