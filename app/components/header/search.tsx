"use client";
import React, { useEffect, useRef, useState } from "react";
import classes from "./search.module.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Overlay from "../overlay";

function Search() {
  const pathnameSplit = usePathname().split("/");
  const isItemsPage = pathnameSplit[pathnameSplit.length - 1] === "items";
  //   const params = useSearchParams();
  const [isOverlay, setIsOverlay] = useState(false);
  //   const inputRef = useRef<HTMLInputElement>()
  const [value, setValue] = useState("");
  const router = useRouter();
  const handleFocus = () => {
    if (!isItemsPage) {
      setIsOverlay(true);
      router.push("/items");
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
    }
  }, [isItemsPage, value]);
  return (
    <>
      {isOverlay && <Overlay />}
      <div className={classes.container}>
        <div className={classes.icon}>
          <MagnifyingGlassIcon className="size-6 " />
        </div>
        <input
          onFocus={handleFocus}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
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
