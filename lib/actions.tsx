import { PrismaClient } from "@prisma/client";
import { convertPrismaDecimalToNumber } from "./utitlity";
import { User } from "@/app/types/commonTypes";
import { hashPassword } from "./auth";

const prisma = new PrismaClient();
// export async function getUser() {
//   const orders = await prisma.users.findMany();
//   console.log("====================================");
//   console.log(orders);
//   console.log("====================================");
//   return orders;
// }
export async function createDummyUser() {
  const user = await prisma.users.create({
    data: {
      first_name: "John",
      last_name: "Doe",
      mobile: "1234567890",
      pincode: "123456",
    },
  });
  console.log("Created user:", user);
}

export async function getProductByID(itemId: string) {
  const item = await prisma.items.findUnique({
    where: {
      id: itemId,
    },
  });
  return convertPrismaDecimalToNumber(item);
}

export async function getProductsofGroups(groupId?: number) {
  const items = await prisma.items.findMany({
    where: {
      group_id: groupId ?? 0, // Filter items with price less than 1000
    },
  });
  return convertPrismaDecimalToNumber(items);
}
export async function getAllProducts() {
  const items = await prisma.items.findMany();
  return convertPrismaDecimalToNumber(items);
}

export async function getUser(phone: string) {
  const user = await prisma.users.findFirst({ where: { mobile: phone } });
  return user;
}
export async function createCart() {
  const cart = await prisma.carts.create({
    data: {
      items: [],
    },
  });
  return cart.cart_id;
}
export async function createWishList() {
  const wishList = await prisma.wish_lists.create({
    data: {
      item_ids: [],
    },
  });
  return wishList.wish_list_id;
}

export async function createUser(reqUser: User) {
  const user = await prisma.users.create({
    data: {
      first_name: reqUser.firstName,
      last_name: reqUser.lastName,
      mobile: reqUser.mobile,
      password: reqUser.password,
      pincode: reqUser.pincode,
      address_line1: reqUser.addressLine1,
      address_line2: reqUser.addressLine2,
      cart_id: reqUser.cartId,
      wish_list_id: reqUser.wishListId,
      email: reqUser.email,
      orders: [],
      returns: [],
      district: reqUser.district,
    },
  });
  return user;
}
