import { CartItemTypes } from "../redux/cart/types";
import { calcTotalPrice } from "./calcTotalPrice";

export default function getCartFromLocalStorage() {
  const data = localStorage.getItem("cart");
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items: items as CartItemTypes[],
    totalPrice,
  };
}
