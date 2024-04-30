"use client";
import React from "react";
import classes from "./item.module.css";
import { data } from "@/lib/data";
import ItemCard from "@/app/components/items/itemCard";
import Pagination from "@/app/components/items/pagination";
import { randomUUID } from "crypto";
import { useRecoilValue } from "recoil";
import { pageNumber, searchParams, totalPages } from "@/app/recoil/atoms/atom";
import { Item } from "@/app/types/commonTypes";

const ITEM_PER_PAGE = 5;
function AllItems() {
  const allData = [...data];
  const searchValue = useRecoilValue(searchParams);
  const pageNumberValue = useRecoilValue(pageNumber);
  const totalPagesValue = useRecoilValue(totalPages);
  console.log("[debug]", searchValue);
  const applyFilter = (val: Item) => {
    const lowerSearchValue = searchValue.trim().toLowerCase();
    return (
      val.brand.toLowerCase().match(lowerSearchValue) ||
      val.color.toLowerCase().match(lowerSearchValue) ||
      val.description.toLowerCase().match(lowerSearchValue) ||
      val.name.toLowerCase().match(lowerSearchValue) ||
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
            {pageNumberValue}/{totalPagesValue}
          </p>
        )}
      </div>
      <div className={classes.itemGrid}>
        {filteredData.length > 0 ? (
          filteredData
            .slice(
              (pageNumberValue - 1) * ITEM_PER_PAGE,
              pageNumberValue * ITEM_PER_PAGE
            )
            .map((value) => <ItemCard key={value.id} item={value} />)
        ) : (
          <p>No Item Matches with your Search</p>
        )}
      </div>
      <div className={classes.pagination}>
        <Pagination
          itemsPerPage={ITEM_PER_PAGE}
          totalData={filteredData.length}
        />
      </div>
    </main>
  );
}

export default AllItems;
