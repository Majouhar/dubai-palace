import React from 'react'
import classes from "./cart.module.css"
import CartItemCard from '@/app/components/cartItemCard/cartItemCard'
import { orderItem } from '@/lib/data'

function Cart() {
  return (
    <main className={classes.container}>
      <div className={classes.cartItems}>
        <h3>Shopping Cart</h3>
        {/* {orderItem.map((item)=><CartItemCard key={item.itemID}/>)} */}
      </div>
    </main>
  )
}

export default Cart
