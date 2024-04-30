"use client";
import React, { useEffect } from "react";
import classes from "./pagination.module.css";
import { useRecoilState } from "recoil";
import { pageNumber, totalPages } from "@/app/recoil/atoms/atom";

function Pagination({
  totalData,
  itemsPerPage,
}: Readonly<{ totalData: number; itemsPerPage: number }>) {
  const [_, setPageNumber] = useRecoilState(pageNumber);
  const [__, setTotalPages] = useRecoilState(totalPages);
  const numberOfPages =
    Math.round(totalData / itemsPerPage) +
    (totalData % itemsPerPage > 0 ? 1 : 0);
  useEffect(() => {
    setTotalPages(numberOfPages);
  }, [numberOfPages, setTotalPages]);
  return (
    <div className={classes.container}>
      {Array.from({ length: numberOfPages }).map((_, index) => {
        return (
          <div
            onClick={() => setPageNumber(index + 1)}
            className={classes.paginationBtn}
            key={index}
          >
            {index + 1}
          </div>
        );
      })}
    </div>
  );
}

export default Pagination;
