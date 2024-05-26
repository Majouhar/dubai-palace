import prisma from "./prismaClient";
import { getFormattedDateToday } from "./utitlity";
import { getCartItemsOfUser } from "./cartActions";
import { getCartId, getUserId, isAdmin } from "./userActions";

export async function createOrder() {
  const cartId = await getCartId();
  const userId = await getUserId();
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
      //@ts-expect-error
      user_id: userId,
    },
  });
  return 201;
}

export async function getAllOrders() {
  const isAdminAccess = await isAdmin();
  if (isAdminAccess) {
    return await prisma.orders.findMany({
      orderBy: {
        date_ordered: "asc",
      },
    });
  } else {
    return {};
  }
}
export async function getFilteredOrders(
  status: "ordered" | "shipped" | "delivered"
) {
  const isAdminAccess = await isAdmin();
  if (isAdminAccess) {
    return await prisma.orders.findMany({
      orderBy: {
        date_ordered: "asc",
      },
      where: {
        status: status,
      },
    });
  } else {
    return {};
  }
}
export async function updateOrderStatus(
  orderId: number,
  status: "ordered" | "shipped" | "delivered",
  expectedDelivery?: string
) {
  const isAdminAccess = await isAdmin();
  if (isAdminAccess) {
    await prisma.orders.update({
      where: {
        order_id: orderId,
      },
      data: {
        status: status,
        expected_delivery_date: expectedDelivery ?? "",
      },
    });
    return 201;
  } else {
    return 401;
  }
}
export async function getOrderById(orderId: number) {
  const order = await prisma.orders.findUnique({
    where: {
      order_id: orderId,
    },
  });
  return order;
}
export async function getAllOrdersofUser() {
  //@ts-expect-error
  const userId: number = await getUserId();
  if (userId) {
    return await prisma.orders.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        date_ordered: "desc",
      },
    });
  } else {
    return {};
  }
}

