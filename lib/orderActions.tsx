import { OrderItem } from "@/app/types/commonTypes";
import prisma from "./prismaClient";
import { getFormattedDateToday } from "./utitlity";
import { getCartItemsOfUser, getUserId } from "./cartActions";
import { getProductsByIDs } from "./productActions";

export async function createOrder() {
  const userId = await getUserId();
  //@ts-expect-error
  const orderItems = await getCartItemsOfUser(userId);

  const price = orderItems.reduce(
    (sum, val) => sum + (val.price_while_order ?? 0),
    0
  );
  await prisma.orders.create({
    data: {
      date_ordered: getFormattedDateToday(),
      items: orderItems,
      price: price,
      status: "ordered",
      delivered_date: "",
      shipped_date: "",
      expected_delivery_date: "",
    },
  });
}

export async function getAllOrders() {
  //admin func
}
export async function getAllOrdersofUser() {}
