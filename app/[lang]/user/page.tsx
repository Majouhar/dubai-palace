"use client";
import { useSession } from "next-auth/react";
import React from "react";

function Cart() {
  const { data, status } = useSession();
  return <div>{data?.user?.name}</div>;
}

export default Cart;
