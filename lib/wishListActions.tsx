import prisma from "./prismaClient";
import { getUserDetails } from "./userActions";

export async function createWishList() {
  const wishList = await prisma.wish_lists.create({
    data: {
      item_ids: [],
    },
  });
  return wishList.wish_list_id;
}

export async function getWishListOfUser() {
  const user = await getUserDetails();
  const wishListID = user?.wish_list_id;
  const wishList = await prisma.wish_lists.findUnique({
    where: {
      wish_list_id: wishListID ?? -1,
    },
  });
  return wishList;
}

export async function getAllItemsInWishList() {
  const wishList = await getWishListOfUser();
  return wishList?.item_ids;
}

export async function isItemExistInWishList(itemId: string) {
  const wishList = await getWishListOfUser();
  const item = wishList?.item_ids.find((val) => val == itemId);
  return !!item;
}

export async function removeItemFromWishList(itemId: string) {
  const wishList = await getWishListOfUser();
  const newWishList = wishList?.item_ids?.filter((val) => val != itemId);
  await prisma.wish_lists.update({
    where: {
      wish_list_id: wishList?.wish_list_id,
    },
    data: {
      item_ids: newWishList,
    },
  });
  return 204;
}
export async function addItemTOWishList(itemId: string) {
  const wishList = await getWishListOfUser();
  const item = wishList?.item_ids.find((val) => val == itemId);

  if (!item) {
    let wishListItems = [];
    if (wishList?.item_ids) {
      wishListItems = wishList.item_ids;
    }

    wishListItems.push(itemId);
    await prisma.wish_lists.update({
      where: {
        wish_list_id: wishList?.wish_list_id,
      },
      data: {
        item_ids: wishList?.item_ids,
      },
    });
    return 201;
  } else {
    return 409;
  }
}

export async function findItemsByItemIDs() {
  const items: string[] = (await getAllItemsInWishList()) ?? [];
  const itemDetails = await prisma.items.findMany({
    where: {
      id: {
        in: items,
      },
    },
  });
  return itemDetails;
}
