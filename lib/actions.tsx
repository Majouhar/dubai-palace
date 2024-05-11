import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function getUser() {
  const orders = await prisma.users.findMany();
  console.log("====================================");
  console.log(orders);
  console.log("====================================");
  return orders;
}
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
