import { Prisma } from "@prisma/client";

export function convertPrismaDecimalToNumber(obj: any): any {
  if (typeof obj !== "object" || obj === null) {
    // Base case: If the input is not an object, return it as is
    return obj;
  }

  for (const key in obj) {
    if (obj[key] instanceof Prisma.Decimal) {
      // If the value is a Prisma.Decimal, convert it to a number
      obj[key] = Number(obj[key].toString());
    } else if (typeof obj[key] === "object") {
      // If the value is an object, recursively convert Prisma.Decimals to numbers
      obj[key] = convertPrismaDecimalToNumber(obj[key]);
    }
  }

  return obj;
}
