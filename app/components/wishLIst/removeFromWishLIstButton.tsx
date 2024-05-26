"use client";
import HttpClient from "@/utility/httpClient";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Loading from "../loading";
import { useMediaQuery } from "react-responsive";
import { useRecoilState } from "recoil";
import { wishListItemsState } from "@/app/recoil/atoms/atom";

function RemoveFromWishLIstButton({ itemId }: Readonly<{ itemId: string }>) {
  const { status } = useSession();
  const [wishListItems, setWishLIstItems] = useRecoilState(wishListItemsState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const handleRemoveFromWishList = () => {
    if (status === "authenticated" && !isLoading) {
      setIsLoading(true);
      new HttpClient()
        .delete(`/api/wishList/${itemId}`, {})
        .then((result: any) => {
          if (result.status === 204) {
            setWishLIstItems(
              wishListItems?.filter((item) => item.id !== itemId)
            );
          } else {
            setIsLoading(false);
          }
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  };
  const buttonClassName = `${
    isMobile ? "size-6" : "size-8"
  }  border-solid border-transparent rounded-full p-1`;
  return (
    <button onClick={handleRemoveFromWishList}>
      {isLoading ? (
        <Loading size={isMobile ? "24px" : "32px"} />
      ) : (
        <XCircleIcon className={buttonClassName} />
      )}
    </button>
  );
}

export default RemoveFromWishLIstButton;
