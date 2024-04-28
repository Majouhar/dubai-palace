import { randomUUID } from "crypto";
import React from "react";
import classes from "./pagination.module.css";

function Pagination({
  totalData,
  itemsPerPage,
}: Readonly<{ totalData: number; itemsPerPage: number }>) {
  const numberOfPages =
    totalData / itemsPerPage + (totalData % itemsPerPage > 0 ? 1 : 0);
  return (
    <div className={classes.container}>
      {Array.from({ length: numberOfPages }).map((_, index) => {
        return (
          <div className={classes.paginationBtn} key={randomUUID()}>
            {index + 1}
          </div>
        );
      })}
    </div>
  );
}

export default Pagination;
