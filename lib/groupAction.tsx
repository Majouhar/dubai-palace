import { Group } from "@/app/types/commonTypes";
import prisma from "./prismaClient";
import { isAdmin } from "./userActions";

export async function getGroups() {
  let groups: Group[] = [];
  if (await isAdmin()) {
    groups = await prisma.groups.findMany();
  }
  return groups;
}

export async function createGroup(name: string) {
  if (await isAdmin()) {
    await prisma.groups.create({
      data: {
        name,
      },
    });
    return 201;
  }
  return 401;
}
