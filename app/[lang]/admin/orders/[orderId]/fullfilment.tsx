"use client";
import React, { useRef, useState } from "react";
import styles from "./adminOrderDetails.module.css";
import { getFormattedDateToday, titleFn } from "@/lib/utitlity";
import { Order } from "@/app/types/commonTypes";
const statusArray = {
  1: "ordered",
  2: "shipped",
  3: "delivered",
  4: null,
};
const revereStatusArray = {
  ordered: 1,
  shipped: 2,
  delivered: 3,
};
function OrderFullFillMent({
  order,
}: Readonly<{
  order: Order;
}>) {
  const [statusID, setStatusID] = useState<number>(
    //@ts-expect-error
    revereStatusArray[order.status ?? "ordered"]
  );
  const [expDlvy, setExpDlvy] = useState(order.expected_delivery_date);
  const submitRef = useRef<HTMLButtonElement>(null);
  const [clientDate, setClientDate] = useState(order.date_ordered);
  const handleUpdateOrder = () => {
    let requestData;
    switch (statusID) {
      case 1:
        requestData = {
          status: "shipped",
          expDlvy: expDlvy,
          dlvyDt: order.delivered_date ?? "",
          shpDt: order.shipped_date ?? "",
        };
        break;
      case 2:
        requestData = {
          status: "delivered",
          expDlvy: expDlvy,
          dlvyDt: order.delivered_date ?? "",
          shpDt: order.shipped_date ?? "",
        };
        break;
    }
    if (expDlvy.length == 0 && statusID == 1) {
      submitRef?.current?.click();
    } else {
      setClientDate(getFormattedDateToday());
      setStatusID((prev) => prev + 1);
    }
  };
  const handleUndo = () => {
    //date won't update
    setStatusID((prev) => prev - 1);
  };
  return (
    <div className={styles.section}>
      <div className={styles.status}>
        {/* @ts-expect-error */}
        <h4>{titleFn(statusArray[statusID] ?? "ordered")}</h4>
        <p>{clientDate}</p>

        {statusID == 1 && (
          <form className={styles.expDlvy}>
            <label htmlFor="expDlvy">Exp. Delivery</label>
            <input
              required
              value={expDlvy}
              onChange={(e) => {
                setExpDlvy(e.target.value);
              }}
              name="expDlvy"
              type="date"
            />
            <button ref={submitRef} style={{ display: "none" }}>
              Submit
            </button>
          </form>
        )}
        {statusID < 3 && (
          <button onClick={handleUpdateOrder} className={styles.button}>
            {/* @ts-expect-error */}
            Mark as {titleFn(statusArray[statusID + 1])}
          </button>
        )}
        {statusID != 1 && (
          <button onClick={handleUndo} className={styles.button}>
            Undo
          </button>
        )}
      </div>
    </div>
  );
}

export default OrderFullFillMent;
