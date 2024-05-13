"use client";
import React, { useEffect } from "react";
import classes from "./itemsClientComponent.module.css";
import ItemCard from "@/app/components/items/itemCard";
import Pagination from "@/app/components/items/pagination";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  pageNumber,
  searchParams,
  tempItemAddtoCartStorage,
  totalPages,
} from "@/app/recoil/atoms/atom";
import { Item } from "@/app/types/commonTypes";
import { FaceFrownIcon, FaceSmileIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";

const ITEM_PER_PAGE = 10;
function ItemClientComponent({ allData }: Readonly<{ allData: Item[] }>) {
  const searchValue = useRecoilValue(searchParams);
  const pageNumberValue = useRecoilValue(pageNumber);
  const totalPagesValue = useRecoilValue(totalPages);
  const [pendingAddToCart, setPendingAddtoCart] = useRecoilState(
    tempItemAddtoCartStorage
  );
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && pendingAddToCart != null) {
      console.log(pendingAddToCart)
      fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify({
          itemId:pendingAddToCart,  
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((data) => {
          return data.json();
        })
        .then((jsonData) => {
          setPendingAddtoCart(null);
          console.log(jsonData);
        })
        .catch((e) => console.log(e));
    }
  }, [pendingAddToCart, setPendingAddtoCart, status]);
  const applyFilter = (val: Item) => {
    const lowerSearchValue = searchValue.trim().toLowerCase();
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
  );
}

export default ItemClientComponent;
