import React from "react";
import classes from "./cartItemCard.module.css";
import Image from "next/image";
import { Item, OrderItem } from "@/app/types/commonTypes";
import { itemData, orderItem } from "@/lib/data";

function CartItemCard({ cartItem }: Readonly<{ cartItem: OrderItem }>) {
    const item = itemData.find(val => val.id===cartItem.itemID) 
  return (
    <div className={classes.container}>
      <Image src={item?.images[0] ?? ""} alt={item?.name ?? ""} width={100} height={140} />
      <div>
        <h4>{item?.name}</h4>
        <small>In Stock</small>
        <div>
            {item?.size!=undefined && <p>{item.size}</p>}
            <p>{item?.color}</p>
            <div>
                <button>Remove</button>
                <button>WishList</button>
            </div>
        </div>

      </div>
      <div>
        <p>{item?.price}</p>
        <div>
            {/* <Counter value={cartItem.quantity}/> */}
        </div>
      </div>
    </div>
  );
}

export default CartItemCard;
