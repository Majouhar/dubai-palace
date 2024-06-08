"use client";
import React, { useEffect, useState } from "react";
import styles from "./advancedDropdown.module.css";
import { v4 } from "uuid";
import { Option } from "@/app/types/commonTypes";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

function AdvancedDropDown({
  handleAdd,
  options,
  handleSelect,
  name,
}: Readonly<{
  handleAdd?: (value: string) => void;
  handleSelect: (value: string) => void;
  options: { id: string | number; value: string }[];
  name: string;
}>) {
  const [masterDataOptions, setMasterDataOptions] = useState(options);
  const [selectOptions, setSelectOptions] = useState(options);
  const [search, setSearch] = useState("");
  const [isAddBox, setIsAddBox] = useState(false);
  const [addText, setAddText] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [isDropDown, setIsDropDown] = useState(false);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setSelectOptions(
      masterDataOptions.filter((opt) =>
        opt.value.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };
  const handleOptionClick = (value: string) => {
    setSelectedValue(value);
    handleSelect(value);
    setIsDropDown(false);
    setIsDropDown(false);
  };
  const handleOptionAdd = () => {
    if (handleAdd) {
      handleAdd(addText);
      const newOption = { id: v4(), value: addText };

      masterDataOptions.push(newOption);
      setMasterDataOptions([...masterDataOptions]);
      setSelectOptions([...masterDataOptions]);
      setSearch("");
      setSelectedValue(addText);
      setIsDropDown(false);
      setIsAddBox(false);
      setAddText("");
    }
  };
  return (
    <div className={styles.mainContainer}>
      <div
        onClick={() => setIsDropDown((prev) => !prev)}
        className={styles.handler}
      >
        <small>{name}</small>
        <p>{selectedValue} </p>
        {isDropDown ? (
          <ChevronUpIcon className="size-8" />
        ) : (
          <ChevronDownIcon className="size-8" />
        )}
      </div>
      {isDropDown && (
        <div className={styles.container}>
          <input
            onChange={handleFilter}
            className={styles.input}
            value={search}
            type="text"
            placeholder="Search"
          ></input>
          {selectOptions.map((option) => (
            <p
              onClick={() => handleOptionClick(option.value)}
              key={v4()}
              className={styles.option}
            >
              {option.value}
            </p>
          ))}
          {handleAdd && (
            <p
              onClick={() => setIsAddBox((prev) => !prev)}
              className={styles.optionAdd}
            >
              {isAddBox ? "Close" : "+"}
            </p>
          )}
          {isAddBox && (
            <div>
              <input
                onChange={(e) => setAddText(e.target.value)}
                className={styles.input}
                value={addText}
                type="text"
                placeholder="Add"
                required
              ></input>
              <button onClick={handleOptionAdd} className={styles.addBtn}>
                Submit
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdvancedDropDown;
