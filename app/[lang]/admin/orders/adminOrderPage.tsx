"use client";
import { Order } from "@/app/types/commonTypes";
import React from "react";
import Filter from "@/app/components/filter";
import styles from "./adminOrderPage.module.css";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  ColumnFiltersState,
  getFilteredRowModel,
  RowData,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
} from "@tanstack/react-table";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";

declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select" | "none";
  }
}

function AdminOrderPage({ orders }: Readonly<{ orders: Order[] }>) {
  const [data] = React.useState<(Order & { count: number })[]>([
    ...orders.map((order) => ({ ...order, count: order.items.length })),
  ]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const columnHelper = createColumnHelper<Order & { count: number }>();

  const columns = React.useMemo(
    () => [
      columnHelper.accessor((row) => row.order_id.toString(), {
        cell: (info) => (
          <Link
            className={styles.linkName}
            href={`/admin/orders/${info.getValue()}`}
          >
            {info.getValue()}
          </Link>
        ),
        header: "Order",
        meta: {
          filterVariant: "text",
        },

        filterFn: (
          row,
          columnId,
          filterValue,
          addMeta: (meta: any) => void
        ) => {
          const rowValue = row.getValue(columnId);
          return rowValue !== undefined
            ? String(rowValue).includes(String(filterValue))
            : true;
        },
        size: 100,
      }),

      columnHelper.accessor("expected_delivery_date", {
        cell: (info) => info.getValue(),
        header: "Exp.Dlvy",
        size: 150,
      }),
      columnHelper.group({
        header: "Details",
        columns: [
          columnHelper.accessor("count", {
            cell: (info) => info.getValue(),
            header: "Items",
            meta: {
              filterVariant: "range",
            },
          }),
          columnHelper.accessor("price", {
            cell: (info) => info.getValue(),
            header: "Price",
            meta: {
              filterVariant: "range",
            },
          }),
        ],
        size: 100,
      }),
      columnHelper.accessor("status", {
        cell: (info) => info.getValue(),
        header: "Status",
        meta: {
          filterVariant: "select",
        },
      }),
      // columnHelper.accessor((row) => row.user_id.toString(), {
      //   cell: (info) => info.getValue(),
      //   header: "User ID",
      //   meta: {
      //     filterVariant: "text",
      //   },
      //   size: 100,
      // }),
    ],
    [columnHelper]
  );

  const table = useReactTable({
    columns,
    data,
    state: {
      columnFilters,
    },
    filterFns: {},
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(), // generate unique values for select filter/autocomplete
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  });

  return (
    <div className="p-2 overflow-x-auto">
      <table
        {...{
          style: {
            width: table.getCenterTotalSize(),
          },
        }}
        className={styles.table}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "flex justify-between items-center cursor-pointer select-none"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                            style: {
                              width: header.getSize(),
                            },
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: (
                              <ChevronUpIcon className="cursor-pointer size-6" />
                            ),
                            desc: (
                              <ChevronDownIcon className="cursor-pointer size-6" />
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} />
                          </div>
                        ) : null}
                      </>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-4" />
      <div className={styles.paginationMain}>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronDoubleLeftIcon className="size-8 p-1 border-2 border-black rounded-full" />
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeftIcon className="size-8 p-1 border-2 border-black rounded-full" />
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRightIcon className="size-8 p-1 border-2 border-black rounded-full" />
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <ChevronDoubleRightIcon className="size-8 p-1 border-2 border-black rounded-full" />
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        {/* <span className="flex items-center gap-1">
          {"| Go to page:"}
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span> */}
        <select
          className={styles.paginationSelect}
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.paginationRows}>
        {table.getPrePaginationRowModel().rows.length} Rows
      </div>
      {/* <pre>
        {JSON.stringify(
          { columnFilters: table.getState().columnFilters },
          null,
          2
        )}
      </pre> */}
    </div>
  );
}

export default AdminOrderPage;
