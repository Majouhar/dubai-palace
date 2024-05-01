"use client";
import React, { useEffect } from "react";
import classes from "./pagination.module.css";
import { useRecoilState } from "recoil";
import { pageNumber, totalPages } from "@/app/recoil/atoms/atom";

function Pagination({
  totalData,
  itemsPerPage,
}: Readonly<{ totalData: number; itemsPerPage: number }>) {
  const [pageNumberValue, setPageNumber] = useRecoilState(pageNumber);
  const [__, setTotalPages] = useRecoilState(totalPages);
  const numberOfPages =
    Math.floor(totalData / itemsPerPage) +
    (totalData % itemsPerPage > 0 ? 1 : 0);
  useEffect(() => {
    setTotalPages(numberOfPages);
  }, [numberOfPages, setTotalPages]);
  return (
    <div className={classes.container}>
      { Array.from({ length: numberOfPages }).map((_, index) => {
        const visible = [index+2,index,index+1].includes(pageNumberValue)
        console.log(visible)
        return (
          <div
            onClick={() => setPageNumber(index + 1)}
            className={`${visible ? classes.paginationBtn:classes.hide} ${index+1===pageNumberValue ? classes.highlight:""}` }
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
