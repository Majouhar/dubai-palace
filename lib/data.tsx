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
    item_id: slugify("Skinny Umberlla Pardha Blue XL",{lower:true}),
    date_added: "02/05/2025",
    quantity: 2,
  },
  {
    item_id: slugify("Skinny Umberlla Pardha Black Large",{lower:true}),
    date_added: "02/02/2025",
    quantity: 1,
  },
];
