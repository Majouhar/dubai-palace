"use client";
import { tempItemAddtoCartStorage } from "@/app/recoil/atoms/atom";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useRecoilState } from "recoil";

function AddToCartButton({ itemId }: Readonly<{ itemId: string }>) {
  const { status } = useSession();
  const router = useRouter();
  const [_,setTempItem] = useRecoilState(tempItemAddtoCartStorage)
  const handleAddToCart = () => {
    if (status === "authenticated") {
      fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify({
          itemId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((data) => {
          return data.json();
        })
        .then((jsonData) => {
          console.log(jsonData);
        })
        .catch((e) => console.log(e));
    } else {
      setTempItem(itemId)
      router.push("/login");
    
    }
  };
  return <button onClick={handleAddToCart}>Add to Cart</button>;
}

export default AddToCartButton;
