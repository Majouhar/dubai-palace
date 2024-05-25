import React from "react";
import classes from "./itemDetails.module.css";
import ProductImage from "@/app/components/itemDetails/image";
import Link from "next/link";
import { getProductByID, getProductsofGroups } from "@/lib/productActions";
import { Item } from "@/app/types/commonTypes";
import { notFound } from "next/navigation";
import IndividualItemButtonContainer from "@/app/components/items/individualAddtoCartButton";

async function ItemDetailsPage({
  params,
}: Readonly<{ params: { itemId: string; lang: string } }>) {
  const item: Item = await getProductByID(params.itemId);
  if (!item) {
    notFound();
  }
  const groupItems: Item[] = await getProductsofGroups(item?.group_id);
  return (
    <main>
      <div className={classes.grid}>
        <ProductImage images={item?.images} name={item?.name} />
        <div className={classes.itemDetails}>
          <small className={classes.smallTitle}>{item?.brand}</small>
          <h2>{item?.name}</h2>
          {item?.discount != undefined && item?.price !== undefined && (
            <div className={classes.priceContainer}>
              {item.discount > 0 && (
                <p className={classes.discount}>₹{item.price}</p>
              )}
              <p>₹{(item.price * (100 - item.discount)) / 100}</p>
            </div>
          )}
          <p>{item?.description}</p>
          {item?.size != undefined && <p>Size: {item?.size}</p>}
          {item?.color != undefined && <p>Color: {item?.color}</p>}
          {item?.features && (
            <div>
              <h6 className={classes.smallTitle}>Features</h6>
              <ul className={classes.features}>
                {item.features.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          )}
          <div className={classes.variants}>
            <h3 className={classes.smallTitle}>Select Variant</h3>
            <div className={classes.variantsGrid}>
              {groupItems.map((val) => {
                let classNameValue = "";
                switch (val.color.toLowerCase()) {
                  case "blue":
                    classNameValue = classes.blue;
                    break;
                  case "black":
                    classNameValue = classes.black;
                    break;
                  case "white":
                    classNameValue = classes.white;
                    break;
                  case "yellow":
                    classNameValue = classes.yellow;
                    break;
                }
                return (
                  <Link
                    href={`/items/${val.id}`}
                    key={val.id}
                    className={`${classNameValue} ${classes.colorBox}`}
                  >
                    <p>{val.size ?? ""}</p>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className={classes.checkout}>
            <IndividualItemButtonContainer
              itemId={item.id}
              lang={params.lang}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default ItemDetailsPage;
