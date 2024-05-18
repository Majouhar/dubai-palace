"use client";
import React, { useEffect, useState } from "react";
import classes from "./search.module.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";
import EffectOverlay from "../effectOverlay";
import { useRecoilState } from "recoil";
import { pageNumber, searchParams } from "@/app/recoil/atoms/atom";

function Search() {
  const pathnameSplit = usePathname().split("/");
  const isItemsPage = pathnameSplit[pathnameSplit.length - 1] === "items";
  const [isOverlay, setIsOverlay] = useState(false);
  const [_, setSearch] = useRecoilState(searchParams);
  const [__, setPageNumber] = useRecoilState(pageNumber);
  //   const inputRef = useRef<HTMLInputElement>()
  const [value, setValue] = useState("");
  const router = useRouter();
  const handleFocus = () => {
    if (!isItemsPage) {
      setIsOverlay(true);
      setTimeout(() => {
        router.push("/items");
      }, 300);
      setTimeout(() => {
        setIsOverlay(false);
      }, 1000);
    }
  };
  useEffect(() => {
    if (!isItemsPage && value !== "") {
      setTimeout(() => {
        setValue(value.slice(0, value.length - 1));
      }, 30);
      setSearch("");
    }
  }, [isItemsPage, value, setSearch]);
  return (
    <>
      {isOverlay && <EffectOverlay />}
      <div className={classes.container}>
        <div className={classes.icon}>
          <MagnifyingGlassIcon className="size-6 " />
        </div>
        <input
          onFocus={handleFocus}
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setSearch(e.target.value);
            setPageNumber(1);
          }}
          placeholder="Search"
          className={classes.search}
          spellCheck={false}
          data-ms-editor={false}
        ></input>
      </div>
    </>
  );
}

export default Search;
