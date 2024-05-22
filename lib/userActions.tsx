import { User } from "@/app/types/commonTypes";
import prisma from "./prismaClient";
import { getServerSession } from "next-auth";
import { hashPassword } from "./auth";

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
export async function getUserDetails() {
  const session = await getServerSession();
  const mobile = session?.user?.email;
  return await getUser(mobile ?? "");
}

export async function updateUser(mobile: string, details: any) {
  const user = await getUser(mobile);
  let hashPwd: string | undefined;
  if (details.pasword) {
    hashPwd = await hashPassword(details.password);
  }
  console.log(["DEBUG"],hashPwd)
  await prisma.users.update({
    where: { mobile: mobile },
    data: {
      first_name: details.firstName ?? user?.first_name,
      last_name: details.lastName ?? user?.last_name,
      password: hashPwd ?? user?.password,
      pincode: details.pincode ?? user?.pincode,
      address_line1: details.addressLine1 ?? user?.address_line1,
      address_line2: details.addressLine2 ?? user?.address_line2,
      email: details.email ?? user?.email,
      district: details.district ?? user?.district,
    },
  });
  return 200;
}
