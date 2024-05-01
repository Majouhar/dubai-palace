import { atom } from "recoil";

export const searchParams = atom({
  key: "searchParams",
  default: "",
});

export const pageNumber = atom({
  key: "pageNumber",
  default: 1,
});

export const totalPages = atom({
  key: "totalPages",
  default: 1,
});