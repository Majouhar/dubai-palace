import { Item, OrderItem } from "@/app/types/commonTypes";
import { atom } from "recoil";

export const searchParams = atom({
  key: "searchParams",
  default: "",
});

export const pageNumber = atom({
  key: "pageNumber",
  default: 1,
});

export const totalPages = atom({
  key: "totalPages",
  default: 1,
});

export const tempItemAddtoCartStorage = atom<string | null>({
  key: "tempItemIdforCartAdd",
  default: null,
});

export const cartItemsState = atom<OrderItem[] | undefined>({
  key: "cartItems",
  default: undefined,
});

export const isCartCheckedState = atom<boolean>({
  key: "isCartChecked",
  default: false,
});
export const wishListItems = atom<Item[] | undefined>({
  key: "wishListItems",
  default: undefined,
});
