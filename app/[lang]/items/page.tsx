import React from "react";
import ItemClientComponent from "@/app/components/items/itemsClientComponent";
import { getAllProducts } from "@/lib/productActions";
import Loading from "@/app/components/loading";
import Overlay from "@/app/components/overlay";

async function AllItems() {
  const products = await getAllProducts();

  return (
    <>
      <ItemClientComponent allData={products} /><Overlay/>
    </>
  );
}

export default AllItems;
