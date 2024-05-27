import React from "react";
import styles from "./orderTracking.module.css";

const OrderTracking = ({
  currentStatus,
}: Readonly<{ currentStatus: 1 | 2 | 3 }>) => {
  const getStatusClass = (status: number) => {
    return currentStatus >= status ? styles.completed : styles.pending;
  };

  return (
    <>
      <div className={styles.trackingContainer}>
        <div className={`${styles.status} ${getStatusClass(1)}`}>
          <div className={styles.circle}></div>
        </div>
        <div className={`${styles.bar} ${getStatusClass(2)}`}></div>
        <div className={`${styles.status} ${getStatusClass(2)}`}>
          <div className={styles.circle}></div>
        </div>
        <div className={`${styles.bar} ${getStatusClass(3)}`}></div>
        <div className={`${styles.status} ${getStatusClass(3)}`}>
          <div className={styles.circle}></div>
        </div>
      </div>
      <div className={styles.trackingLabelContainer}>
        <span className={styles.label}>Ordered</span>
        <span className={styles.label}>Shipped</span>
        <span className={styles.label}>Delivered</span>
      </div>
    </>
  );
};

export default OrderTracking;
