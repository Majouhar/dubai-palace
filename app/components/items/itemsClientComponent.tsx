"use client";
import React, { useEffect, useState } from "react";
import classes from "./itemsClientComponent.module.css";
import ItemCard from "@/app/components/items/itemCard";
import Pagination from "@/app/components/items/pagination";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  cartItemsState,
  pageNumber,
  searchParams,
  tempItemAddtoCartStorage,
  totalPages,
} from "@/app/recoil/atoms/atom";
import { Item } from "@/app/types/commonTypes";
import { FaceFrownIcon, FaceSmileIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Overlay from "../overlay";
import { OverlayConstants } from "@/lib/enums";
import HttpClient from "@/utility/httpClient";
import { getFormattedDateToday } from "@/lib/utitlity";

const ITEM_PER_PAGE = 10;
function ItemClientComponent({ allData }: Readonly<{ allData: Item[] }>) {
  const searchValue = useRecoilValue(searchParams);
  const pageNumberValue = useRecoilValue(pageNumber);
  const totalPagesValue = useRecoilValue(totalPages);
  const [pendingAddToCart, setPendingAddtoCart] = useRecoilState(
    tempItemAddtoCartStorage
  );
  const { status } = useSession();
  const [isOverlay, setIsOverlay] = useState(false);
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);

  useEffect(() => {
    if (status === "authenticated" && pendingAddToCart != null) {
      console.log(pendingAddToCart);
      new HttpClient()
        .post("/api/cart", {
          itemId: pendingAddToCart,
        })
        .then((jsonData) => {
          setPendingAddtoCart(null);
          cartItems?.push({
            item_id: pendingAddToCart,
            date_added: getFormattedDateToday(),
            quantity: 1,
          });
          setCartItems([...(cartItems ?? [])]);
        })
        .catch((e) => {
          setIsOverlay(true);
        });
    }
  }, [cartItems, pendingAddToCart, setCartItems, setPendingAddtoCart, status]);
  const applyFilter = (val: Item) => {
    const lowerSearchValue = searchValue
      .trim()
      .toLowerCase()
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return (
      RegExp(lowerSearchValue).exec(val.brand.toLowerCase()) ||
      RegExp(lowerSearchValue).exec(val.color.toLowerCase()) ||
      RegExp(lowerSearchValue).exec(val.description.toLowerCase()) ||
      RegExp(lowerSearchValue).exec(val.name.toLowerCase()) ||
      val.tags.includes(lowerSearchValue)
    );
  };
  const filteredData = allData.filter((val) => applyFilter(val));

  return (
    <>
      <main>
        <div className={classes.searchValue}>
          {searchValue.trim().length > 0 && <p>Searched For: {searchValue}</p>}
          {totalPagesValue > 0 && (
            <p>
              Page {pageNumberValue} of {totalPagesValue}
            </p>
          )}
        </div>
        {filteredData.length > 0 ? (
          <div className={classes.itemGrid}>
            {filteredData
              .slice(
                (pageNumberValue - 1) * ITEM_PER_PAGE,
                pageNumberValue * ITEM_PER_PAGE
              )
              .map((value) => (
                <ItemCard key={value.id} item={value} />
              ))}
          </div>
        ) : (
          <div className={classes.notFound}>
            <FaceSmileIcon className={`${classes.hideAnimation} size-10 `} />
            <FaceFrownIcon className={`${classes.displayAnimation} size-10 `} />
            <p>No Item Matches with your Search</p>
          </div>
        )}
        <div className={classes.pagination}>
          <Pagination
            itemsPerPage={ITEM_PER_PAGE}
            totalData={filteredData.length}
          />
        </div>
      </main>
      {isOverlay && (
        <Overlay
          message="Add to Cart Failed, Please Try again Later"
          cancelAction={() => setIsOverlay((prev) => !prev)}
          action={OverlayConstants.ERROR}
        />
      )}
    </>
  );
}

export default ItemClientComponent;
