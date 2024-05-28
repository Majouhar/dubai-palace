import { Item, Order, OrderItem } from "@/app/types/commonTypes";
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
export const wishListItemsState = atom<Item[] | undefined>({
  key: "wishListItems",
  default: undefined,
});
const orderItem1: OrderItem = {
  item_id: "skinny-umberlla-pardha-blue-xl",
  date_added: "",
  quantity: 2,
  date_delivered: "",
  price_while_order: 720,
};
const orderItem2: OrderItem = {
  item_id: "check-maxi-blue-large",
  date_added: "",
  quantity: 1,
  date_delivered: "",
  price_while_order: 800,
};
const order: Order = {
  order_id: 1000,
  date_ordered: "26/12/2024",
  items: [orderItem1, orderItem2],
  price: 2440,
  status: "ordered",
  shipped_date: "",
  delivered_date: "",
  expected_delivery_date: "28/12/2024",
  user_id: 1
};
export const orderItemState = atom<Order[] | undefined>({
  key: "orderList",
  default: undefined,
});
