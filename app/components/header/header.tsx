import React from "react";
import classes from "./header.module.css";
import Logo from "../logo/logo";
import UserSection from "./userSection";
import DropdownSection from "./dropdownSection";
import { getDictionary } from "@/lib/dictionary";
import Search from "./search";

async function Header({ language }: Readonly<{ language: string }>) {
  const dictionary = await getDictionary(language);
  return (
    <div id="header" className={classes.container}>
      <div className={classes.headerContainer}>
        <Logo />
        <DropdownSection dictionary={dictionary} />
        <Search />
        <UserSection />
      </div>
      <div className={classes.headerLine}></div>
    </div>
  );
}

export default Header;
