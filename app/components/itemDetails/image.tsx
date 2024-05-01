"use client";
import Image from "next/image";
import classes from "./image.module.css";

import React, { useState } from "react";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";

function ProductImage({
  images,
  name,
}: Readonly<{ images?: string[]; name?: string }>) {
  const [imageIndex, setImageIndex] = useState(0);
  const handleImageChange = (number: number) => {
    if (number < 0 && imageIndex !== 0) {
      setImageIndex(imageIndex - 1);
    } else if (number > 0 && imageIndex !== (images?.length ?? 1) - 1) {
      setImageIndex(imageIndex + 1);
    }
  };
  return (
    <div className={classes.imageContainer}>
      <Image
        src={images?.at(imageIndex) ?? ""}
        alt={name ?? ""}
        width={600}
        height={600}
      />
      <div>
        <ArrowLeftCircleIcon
          className={`size-8 cursor-pointer`}
          onClick={() => handleImageChange(-1)}
        />
        {images?.map((val, index) => {
          return (
            <div
              className={
                imageIndex === index ? classes.largeCircle : classes.smallCircle
              }
              key={val}
            ></div>
          );
        })}
        <ArrowRightCircleIcon
          className={`size-8 cursor-pointer`}
          onClick={() => handleImageChange(1)}
        />
      </div>
    </div>
  );
}

export default ProductImage;
