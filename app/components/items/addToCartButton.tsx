"use client";
import {
  cartItemsState,
  tempItemAddtoCartStorage,
} from "@/app/recoil/atoms/atom";
import { getFormattedDateToday } from "@/lib/utitlity";
import HttpClient from "@/utility/httpClient";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { useRecoilState, useRecoilValue } from "recoil";

function AddToCartButton({ itemId }: Readonly<{ itemId: string }>) {
  const { status } = useSession();
  const router = useRouter();
  const [_, setTempItem] = useRecoilState(tempItemAddtoCartStorage);
  const [__, setCartItems] = useRecoilState(cartItemsState);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const lang = usePathname().split("/")[1];
  const handleAddToCart = () => {
    if (status === "authenticated") {
      new HttpClient()
        .post("/api/cart", {
          itemId,
          lang,
        })
        .then((data) => {
          console.log("ADDED");

          setCartItems((cartItems) => {
            let newCartItems = [...cartItems];
            const existingItem = newCartItems.find(
              (item) => item.itemID === itemId
            );
            if (existingItem) {
              newCartItems = newCartItems.map((item) => {
                if (item.itemID === itemId) {
                  return { ...item, quantity: item.quantity + 1 };
                }
                return item;
              });
            } else {
              newCartItems.push({
                itemID: itemId,
                quantity: 1,
                dateAdded: getFormattedDateToday(),
              });
            }
            return newCartItems;
          });
        });
    } else {
      setTempItem(itemId);
      router.push("/login");
    }
  };
  return (
    <button onClick={handleAddToCart}>
      {isMobile ? (
        <ShoppingCartIcon className="size-6 border-2 border-solid border-black rounded-full p-1" />
      ) : (
        "Add to Cart"
      )}
    </button>
  );
}

export default AddToCartButton;
