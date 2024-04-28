"use client";
import React, { useEffect, useRef, useState } from "react";
import classes from "./dropdown.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Option } from "@/app/types/commonTypes";

type DropdownProps =
  | {
      label: string;
      options: Option[];
      directLink?: string;
    }
  | {
      label: string;
      options?: Option[];
      directLink: string;
    };
function Dropdown({ label, options, directLink }: Readonly<DropdownProps>) {
  const dropDownRef = useRef<HTMLButtonElement>(null);
  const labelRef = useRef<HTMLHeadingElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const closeDropDown = (e: MouseEvent) => {
      if (
        dropDownRef.current != e.target &&
        labelRef.current != e.target &&
        dotRef.current != e.target
      ) {
        setVisible(false);
      }
    };

    document.addEventListener("click", closeDropDown);
    return () => {
      document.removeEventListener("click", closeDropDown);
    };
  }, []);
  const handleLableClick = () => {
    if (directLink) {
      router.push(directLink);
    } else {
      setVisible((prev) => !prev);
    }
  };
  return (
    <div className={classes.container}>
      <button
        ref={dropDownRef}
        onClick={handleLableClick}
        className={`${classes.label} "cursor-pointer"`}
      >
        <h4 ref={labelRef}>{label}</h4>{" "}
        {options?.length && options.length > 0 && (
          <div ref={dotRef} className={classes.dot}></div>
        )}
      </button>
      <div
        className={`${classes.animation} ${classes.hiddenOptions} ${
          visible ? classes.show : classes.hide
        }`}
      >
        {options?.map((option) => (
          <Link
            className={classes.link}
            href={option.url ?? "/"}
            key={option.name}
          >
            {option.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Dropdown;
