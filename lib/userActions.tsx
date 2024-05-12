import { User } from "@/app/types/commonTypes";
import prisma from "./prismaClient";

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

export async function getUser(phone: string) {
  const user = await prisma.users.findFirst({ where: { mobile: phone } });
  return user;
}
