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

export function getFormattedDateToday(): string {
  const today = new Date();
  const day = today.getDate().toString().padStart(2, "0");
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
}

export function convertDate(date: string): string {
  const monthMap = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec",
  };
  const [day, month, year] = date.split("/");
  //@ts-expect-error
  return `${monthMap[month]} ${day}, ${year}`;
}

export function titleFn(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
