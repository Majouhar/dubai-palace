import React from "react";
import CreateItemClient from "./createItemComponent";
import { getGroups } from "@/lib/groupAction";
import { getBrands } from "@/lib/brandActions";
import { group } from "console";

async function CreateItemAdmin() {
  const groups = await getGroups()
  const brands = await getBrands() 
  return (
    <div>
      <CreateItemClient groups ={groups} brands = {brands}/>
    </div>
  );
}

export default CreateItemAdmin;
