
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function getUser() {
  const orders = await prisma.users.findMany()
  console.log("====================================");
  console.log(orders);
  console.log("====================================");
  return orders;
}
