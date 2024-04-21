import { products, users } from "@prisma/client";
import { atom } from "jotai";

export const UserAtom = atom<any | null>({});
export const CartAtom = atom<any[]>([]);
