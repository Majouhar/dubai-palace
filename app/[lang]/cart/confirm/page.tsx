import ConfirmOrderClient from "@/app/components/cartItemCard/confirmOrder";
import { getAllProducts } from "@/lib/productActions";
import React from "react";

async function ConfirmOrder() {
  const items = await getAllProducts();
  return <ConfirmOrderClient itemData={items} />;
}

export default ConfirmOrder;
