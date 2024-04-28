import React from "react";
import classes from "./search.module.css";

function Search() {
  return <input type="text" placeholder="Search" className={classes.search}></input>;
}

export default Search;
