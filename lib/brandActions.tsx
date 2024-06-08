import { Brand } from "@/app/types/commonTypes";
import prisma from "./prismaClient";
import { isAdmin } from "./userActions";

export async function getBrands() {
  let brands: Brand[] = [];
  if (await isAdmin()) {
    brands = await prisma.brands.findMany();
  }
  return brands;
}

export async function createBrand(name: string) {
  if (await isAdmin()) {
    await prisma.brands.create({
      data: {
        name,
      },
    });
    return 201;
  }
  return 401;
}
