import prisma from "./prismaClient";
import { convertPrismaDecimalToNumber } from "./utitlity";

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

export async function getProductsByIDs(itemIDs: string[]) {
  const itemDetails = await prisma.items.findMany({
    where: {
      id: {
        in: itemIDs,
      },
    },
  });
  return itemDetails;
}
export async function getPriceOfProduct(itemID: string) {
  const itemPricing = await prisma.items.findFirst({
    where: {
      id: itemID,
    },
    select: {
      discount: true,
      price: true,
    },
  });

  return (
    ((itemPricing?.price?.toNumber() ?? 0) *
      (100 - (itemPricing?.discount?.toNumber() ?? 0))) /
    100
  );
}
