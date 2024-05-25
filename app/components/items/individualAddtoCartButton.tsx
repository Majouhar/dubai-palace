"use client";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/16/solid";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import HttpClient from "@/utility/httpClient";
import { useRecoilState } from "recoil";
import classes from "./individualAddtoCartButton.module.css";
import {
  cartItemsState,
  tempItemAddtoCartStorage,
} from "@/app/recoil/atoms/atom";
import { getFormattedDateToday } from "@/lib/utitlity";

function IndividualItemButtonContainer({
  itemId,
  price,
  lang,
}: Readonly<{ itemId: string; lang: string; price: number }>) {
  const [isLoading, setIsLoading] = useState(false);
  const [wishListStatus, setWishListStatus] = useState<
    | "loading"
    | "addedLoading"
    | "success"
    | "normalAdded"
    | "normalNotAdded"
    | "wishListRemoveSuccess"
  >("loading");
  const { status } = useSession();
  const router = useRouter();
  const [_, setTempItem] = useRecoilState(tempItemAddtoCartStorage);
  const [__, setCartItems] = useRecoilState(cartItemsState);
  const [isSuccessDisplay, setIsSuccessDisplay] = useState(false);
  useEffect(() => {
    if (isSuccessDisplay) {
      setTimeout(() => {
        setIsSuccessDisplay(false);
      }, 2000);
    }
  }, [isSuccessDisplay]);

  useEffect(() => {
    if (status == "authenticated") {
      new HttpClient()
        .get(`/api/wishList/${itemId}/check`)
        .then((result: any) => {
          if (result.status) {
            setWishListStatus("success");
          } else {
            setWishListStatus("normalNotAdded");
          }
        })
        .catch(() => {
          setWishListStatus("normalNotAdded");
        });
    } else {
      setWishListStatus("normalNotAdded");
    }
  }, [itemId, status]);
  useEffect(() => {
    if (wishListStatus == "success") {
      setTimeout(() => {
        setWishListStatus("normalAdded");
      }, 2000);
    } else if (wishListStatus == "wishListRemoveSuccess") {
      setTimeout(() => {
        setWishListStatus("normalNotAdded");
      }, 2000);
    }
  }, [wishListStatus]);
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
            let newCartItems = [...cartItems];
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
  const handleAddToWishList = () => {
    if (status === "authenticated" && wishListStatus != "loading") {
      setWishListStatus("loading");
      new HttpClient()
        .post(`/api/wishList/${itemId}`, {})
        .then((result: any) => {
          if (result.status === 201) {
            setWishListStatus("success");
          } else {
            setWishListStatus("normalNotAdded");
          }
        })
        .catch(() => {
          setWishListStatus("normalNotAdded");
        });
    }
  };
  const handleRemoveFromWishList = () => {
    if (status === "authenticated" && wishListStatus != "addedLoading") {
      setWishListStatus("addedLoading");
      new HttpClient()
        .delete(`/api/wishList/${itemId}`, {})
        .then((result: any) => {
          if (result.status === 204) {
            setWishListStatus("wishListRemoveSuccess");
          } else {
            setWishListStatus("normalAdded");
          }
        })
        .catch(() => {
          setWishListStatus("normalNotAdded");
        });
    }
  };
  const buttonContent = isSuccessDisplay ? "Added to Cart" : "Add to Cart";
  const normalClass = isSuccessDisplay ? classes.success : classes.normal;
  let wishListIcon;
  switch (wishListStatus) {
    case "loading":
      wishListIcon = (
        <HeartIcon
          onClick={() => {}}
          className={`size-8 ${classes.wishListLoading}`}
        />
      );
      break;
    case "addedLoading":
      wishListIcon = (
        <HeartIconSolid
          onClick={() => {}}
          className={`size-8 ${classes.wishListLoadingAdded} `}
        />
      );
      break;
    case "success":
      wishListIcon = (
        <HeartIconSolid
          onClick={handleAddToWishList}
          className={`size-8 ${classes.wishListSuccess}`}
        />
      );
      break;
    case "normalAdded":
      wishListIcon = (
        <HeartIconSolid
          onClick={handleRemoveFromWishList}
          className={`size-8 cursor-pointer ${classes.wishListNormal}`}
        />
      );
      break;
    case "normalNotAdded":
      wishListIcon = (
        <HeartIcon
          onClick={handleAddToWishList}
          className="size-8 cursor-pointer"
        />
      );
      break;
    case "wishListRemoveSuccess":
      wishListIcon = (
        <HeartIcon
          onClick={() => {}}
          className={`size-8 ${classes.wishListRemoveSuccess}`}
        />
      );
      break;
  }
  return (
    <>
      {wishListIcon}
      <button
        className={isLoading ? classes.loading : normalClass}
        onClick={handleAddToCart}
      >
        {isLoading ? "Adding to Cart" : buttonContent}
      </button>
    </>
  );
}

export default IndividualItemButtonContainer;
