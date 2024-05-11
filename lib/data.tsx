import { OrderItem } from "@/app/types/commonTypes";
import slugify from "slugify";
export const tags = {
  pardha: "Pardha",
  blue: "Blue",
  black: "Black",
  maxi: "Maxi",
  fullSleeveMaxi: "Full Sleeve",
  latest: "Latest",
};


export const orderItem: OrderItem[] = [
  {
    itemID: slugify("Skinny Umberlla Pardha Blue XL",{lower:true}),
    dateAdded: "02/05/2025",
    quantity: 2,
  },
  {
    itemID: slugify("Skinny Umberlla Pardha Black Large",{lower:true}),
    dateAdded: "02/02/2025",
    quantity: 1,
  },
];
