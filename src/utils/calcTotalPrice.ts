import { CartItemTypes } from "../redux/cart/types";

export const calcTotalPrice = (items: CartItemTypes[]) => {
  return items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
};
