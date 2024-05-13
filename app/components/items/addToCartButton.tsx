"use client";
import { tempItemAddtoCartStorage } from "@/app/recoil/atoms/atom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { useRecoilState } from "recoil";

function AddToCartButton({ itemId }: Readonly<{ itemId: string }>) {
  const { status } = useSession();
  const router = useRouter();
  const [_, setTempItem] = useRecoilState(tempItemAddtoCartStorage);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
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
      setTempItem(itemId);
      router.push("/login");
    }
  };
  return (
    <button onClick={handleAddToCart}>
      {isMobile ? <ShoppingCartIcon className="size-6 border-2 border-solid border-black rounded-full p-1" /> : "Add to Cart"}
    </button>
  );
}

export default AddToCartButton;
