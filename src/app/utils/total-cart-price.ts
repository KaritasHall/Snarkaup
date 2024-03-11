// utils/cartUtils.js

export const calculateTotalCartPrice = (cart: any[]) => {
  return cart.reduce(
    (acc, item) => acc + (item?.product?.lowestPrice ?? 0) * item.quantity,
    0,
  );
};
