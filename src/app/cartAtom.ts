import { atom } from "recoil";
import { CartItem } from "./hooks/useCart";

export const cartState = atom<CartItem[]>({
  key: "cartState",
  default: JSON.parse(localStorage.getItem("cart") || "[]"),
});
