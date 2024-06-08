"use client";
import React from "react";
import styles from "./createItem.module.css";
import { Brand, Group } from "@/app/types/commonTypes";
import AdvancedDropDown from "@/app/components/advancedDropDown/advancedDropDown";

const CreateItemClient = ({
  groups,
  brands,
}: Readonly<{ groups: Group[]; brands: Brand[] }>) => {
  return (
    <div className={styles.formContainer}>
      <form className={styles.form}>
        <h1>Create Item</h1>
        <div className={styles.row}>
          <input type="text" placeholder="Name" className={styles.input} />
          <input type="text" placeholder="Brand" className={styles.input} />
        </div>
        <textarea
          placeholder="Description"
          className={styles.textarea}
        ></textarea>
        <div className={styles.row}>
          <input type="text" placeholder="Price" className={styles.input} />
          <input type="text" placeholder="Tags" className={styles.input} />
        </div>
        <div className={styles.row}>
          <AdvancedDropDown
            name="Size"
            options={[
              { id: 1, value: "XS" },
              { id: 2, value: "S" },
              { id: 3, value: "M" },
              { id: 4, value: "L" },
              { id: 5, value: "XL" },
              { id: 6, value: "XXL" },
            ]}
            handleSelect={(value) => {}}
            handleAdd={(value) => {}}
          />
          <input type="text" placeholder="Discount" className={styles.input} />
        </div>
        <div className={styles.row}>
          <input type="text" placeholder="Inventory" className={styles.input} />
          <input type="text" placeholder="Color" className={styles.input} />
        </div>
        <input type="text" placeholder="Images" className={styles.input} />
        <input type="date" placeholder="Date" className={styles.input} />
        <input type="text" placeholder="Features" className={styles.input} />
        <input
          type="text"
          placeholder="Order Multiple"
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Order Quantity"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Create Item
        </button>
      </form>
    </div>
  );
};

export default CreateItemClient;
