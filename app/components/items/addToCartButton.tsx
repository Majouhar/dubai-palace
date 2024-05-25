"use client";
import {
  cartItemsState,
  tempItemAddtoCartStorage,
} from "@/app/recoil/atoms/atom";
import { getFormattedDateToday } from "@/lib/utitlity";
import HttpClient from "@/utility/httpClient";
import { CheckIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useRecoilState } from "recoil";
import Loading from "../loading";

function AddToCartButton({
  itemId,
  price,
}: Readonly<{ itemId: string; price: number }>) {
  const { status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [_, setTempItem] = useRecoilState(tempItemAddtoCartStorage);
  const [__, setCartItems] = useRecoilState(cartItemsState);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const lang = usePathname().split("/")[1];
  const [isSuccessDisplay, setIsSuccessDisplay] = useState(false);
  useEffect(() => {
    if (isSuccessDisplay) {
      setTimeout(() => {
        setIsSuccessDisplay(false);
      }, 2000);
    }
  }, [isSuccessDisplay]);
  const handleAddToCart = () => {
    if (status === "authenticated" && !isLoading) {
      setIsLoading(true);
      new HttpClient()
        .post("/api/cart", {
          itemId,
          lang,
        })
        .then((data) => {
          setIsLoading(false);
          setIsSuccessDisplay(true);
          setCartItems((cartItems) => {
            let newCartItems = [...(cartItems ?? [])];
            const existingItem = newCartItems.find(
              (item) => item.item_id === itemId
            );
            if (existingItem) {
              newCartItems = newCartItems.map((item) => {
                if (item.item_id === itemId) {
                  return { ...item, quantity: item.quantity + 1 };
                }
                return item;
              });
            } else {
              newCartItems.push({
                item_id: itemId,
                quantity: 1,
                date_added: getFormattedDateToday(),
                price_while_order: price,
              });
            }
            return newCartItems;
          });
        });
    } else if (!isLoading) {
      setTempItem(itemId);
      router.push("/login");
    }
  };
  const buttonClassName = `${
    isMobile ? "size-6" : "size-8"
  }  border-solid border-transparent rounded-full p-1`;
  const buttonContent = isSuccessDisplay ? (
    <CheckIcon className={buttonClassName} />
  ) : (
    <ShoppingCartIcon className={buttonClassName} />
  );
  return (
    <button onClick={handleAddToCart}>
      {isLoading ? (
        <Loading size={isMobile ? "24px" : "32px"} />
      ) : (
        buttonContent
      )}
    </button>
  );
}

export default AddToCartButton;
