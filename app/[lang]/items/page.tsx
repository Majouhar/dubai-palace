import React from "react";
import ItemClientComponent from "@/app/components/items/itemsClientComponent";
import { getAllProducts } from "@/lib/actions";

async function AllItems() {
  const products = await getAllProducts();

  return <ItemClientComponent allData={products} />;
}

export default AllItems;
