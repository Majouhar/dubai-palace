import prisma from "./prismaClient";

export async function createWishList() {
    const wishList = await prisma.wish_lists.create({
      data: {
        item_ids: [],
      },
    });
    return wishList.wish_list_id;
  }
  