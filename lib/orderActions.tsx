import prisma from "./prismaClient";
import { getFormattedDateToday } from "./utitlity";
import { getCartItemsOfUser} from "./cartActions";
import { getCartId } from "./userActions";

export async function createOrder() {
  const cartId = await getCartId()
  const orderItems = await getCartItemsOfUser(cartId);

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
