"use client";
import { Column } from "@tanstack/react-table";
import classes from "./filter.module.css";
function Filter({ column }: Readonly<{ column: Column<any, unknown> }>) {
  const columnFilterValue = column.getFilterValue();
  const sortedUniqueValues = Array.from(column.getFacetedUniqueValues().keys())
    .sort()
    .slice(0, 10);
  let component;
  switch (column.columnDef.meta?.filterVariant) {
    case "range":
      component = (
        <div className={classes.flex}>
          <input
            className={classes.numInput}
            type="number"
            value={(columnFilterValue as [number, number])?.[0] ?? ""}
            onChange={(e) => {
              column.setFilterValue((old: [number, number]) => [
                e.target.value,
                old?.[1],
              ]);
            }}
            placeholder={`${
              column.getFacetedMinMaxValues()?.[0] !== undefined
                ? `(${column.getFacetedMinMaxValues()?.[0]})`
                : ""
            }`}
          ></input>
          <div className={classes.smallLine}></div>
          <input
            className={classes.numInput}
            type="number"
            value={(columnFilterValue as [number, number])?.[1] ?? ""}
            onChange={(e) =>
              column.setFilterValue((old: [number, number]) => [
                old?.[0],
                e.target.value,
              ])
            }
            placeholder={`${
              column.getFacetedMinMaxValues()?.[1]
                ? `(${column.getFacetedMinMaxValues()?.[1]})`
                : ""
            }`}
          ></input>
        </div>
      );
      break;
    case "select":
      component = (
        <select
        className={classes.select}
          onChange={(e) => column.setFilterValue(e.target.value)}
          value={columnFilterValue?.toString()}
        >
          {/* See faceted column filters example for dynamic select options */}
          <option value="">All</option>
          {sortedUniqueValues.map((value) => (
            //dynamically generated select options from faceted values feature
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </select>
      );
      break;
    default:
      component = (
        <input
          type="text"
          value={(columnFilterValue ?? "") as string}
          onChange={(e) => {
            column.setFilterValue(e.target.value);
          }}
          className={classes["input"]}
        ></input>
      );
  }

  return component;
}

export default Filter;
