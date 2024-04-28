import React from "react";
import classes from "./item.module.css";
import { data } from "@/lib/data";
import ItemCard from "@/app/components/items/itemCard";
import Pagination from "@/app/components/items/pagination";
import { randomUUID } from "crypto";

function AllItems() {
  const newData = [...data, ...data, ...data, ...data];
  return (
    <main>
      <div className={classes.searchValue}>
        <p>Searched For: Test</p>
      </div>
      <div className={classes.itemGrid}>
        {newData.map((value) => (
          <ItemCard key={randomUUID()} item={value} />
        ))}
      </div>
      <div className={classes.pagination}>
        <Pagination itemsPerPage={5} totalData={newData.length} />
      </div>
    </main>
  );
}

export default AllItems;
