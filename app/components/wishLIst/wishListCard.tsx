import { Item } from "@/app/types/commonTypes";
import classes from "./wishListCard.module.css";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import AddToCartButton from "../items/addToCartButton";
import RemoveFromWishLIstButton from "./removeFromWishLIstButton";

function WishListCard({ item }: Readonly<{ item: Item }>) {
  return (
    <div className={classes["card"]}>
      <Link href={`/items/${item.id}`}>
        <Image src={item.images[0]} width={150} height={200} alt={item.name} />
      </Link>
      <div>
        <h4 className={classes.itemName}>{item.name}</h4>
        <div className={classes.priceAction}>
          <div>
            {item.discount > 0 && (
              <p className={classes.discount}>₹{item.price}</p>
            )}
            <p>₹{(item.price * (100 - item.discount)) / 100}</p>
          </div>
          <section>
            <RemoveFromWishLIstButton itemId={item.id} />
            <AddToCartButton
              itemId={item.id}
              price={(item.price * (100 - item.discount)) / 100}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

export default WishListCard;
