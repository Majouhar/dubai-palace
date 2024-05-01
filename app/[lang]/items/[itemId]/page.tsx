import React from "react";
import classes from "./itemDetails.module.css";
import { data } from "@/lib/data";
import { HeartIcon } from "@heroicons/react/24/outline";
import ProductImage from "@/app/components/itemDetails/image";
import Link from "next/link";

function ItemDetailsPage({ params }: Readonly<{ params: { itemId: number } }>) {
  const item = data.find((it) => it.id == params.itemId);
  const groupItems = data.filter((it) => it.groupId === item?.groupId);
  return (
    <main>
      <div className={classes.grid}>
        <ProductImage images={item?.images} name={item?.name} />
        <div className={classes.itemDetails}>
          <small className={classes.smallTitle}>{item?.brand}</small>
          <h2>{item?.name}</h2>
          {item?.discount!=undefined  && item?.price !== undefined && (
            <div className={classes.priceContainer}>
              {item.discount > 0 && (
                <p className={classes.discount}>₹{item.price}</p>
              )}
              <p>₹{(item.price * (100 - item.discount)) / 100}</p>
            </div>
          )}
          <p>{item?.description}</p>
          {item?.size!=undefined&& <p>Size: {item?.size}</p>}
          {item?.color!=undefined&& <p>Color: {item?.color}</p>}
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
            <HeartIcon className="size-8" />
            <button>Add to Cart</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ItemDetailsPage;
