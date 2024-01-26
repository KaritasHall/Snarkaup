import { useState } from "react";
import { AugmentedProduct, useProducts } from "./useProducts";
import { useRecoilState } from "recoil";
import { cartState } from "../cartAtom";

export type CartItem = {
  quantity: number;
  product: AugmentedProduct;
};

export function useCart() {
  const [cart, setCart] = useRecoilState(cartState);

  const { products } = useProducts({});

  // Add a product to the cart (or update the quantity if it's already there)
  function addToCart(productId: number, quantityChange: number) {
    setCart((currentCart) => {
      const productIndex = currentCart.findIndex(
        (item) => item.product.id === productId,
      );

      // If the product is already in the cart, update the quantity
      if (productIndex !== -1) {
        let updatedCart = [...currentCart];
        let newQuantity = updatedCart[productIndex].quantity + quantityChange;

        // Update quantity if it's more than 0
        if (newQuantity > 0) {
          updatedCart[productIndex] = {
            ...updatedCart[productIndex],
            quantity: newQuantity,
          };
          // Remove the item if the quantity would drop to 0 or below
        } else {
          updatedCart.splice(productIndex, 1);
        }
        return updatedCart;
        // Product not found in the cart and we're adding, not removing
      } else {
        if (quantityChange < 1) {
          // Can't add a non-positive quantity for a new cart item
          console.error(
            `Can't add non-positive quantity for product ID ${productId}`,
          );
          return currentCart;
        }
        // Find the product in the list to ensure it exists before adding
        const product = products?.find((p) => p.id === productId);
        if (!product) {
          // Product not found in the product list, throw an error
          throw new Error(`Product with ID ${productId} not found`);
        }
        // Add the new product with the given quantity
        return [...currentCart, { product, quantity: quantityChange }];
      }
    });
  }

  function decreaseQuantity(productId: number) {
    setCart((currentCart) => {
      const cartItemIndex = currentCart.findIndex(
        (item) => item.product.id === productId,
      );
      if (cartItemIndex === -1) {
        // Item not found in the cart, no action needed
        console.warn(`Product with ID ${productId} not found in the cart.`);
        return currentCart;
      }

      const updatedCart = [...currentCart];
      const currentQuantity = updatedCart[cartItemIndex].quantity;

      if (currentQuantity > 1) {
        // Decrease quantity by 1
        updatedCart[cartItemIndex] = {
          ...updatedCart[cartItemIndex],
          quantity: currentQuantity - 1,
        };
      } else {
        // Remove the item from the cart if the quantity is 1
        updatedCart.splice(cartItemIndex, 1);
      }

      return updatedCart;
    });
  }

  // Remove a product from the cart
  function removeFromCart(productId: number) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.product.id !== productId),
    );
    console.log("removeFromCart");
  }

  // Show item quantity in cart
  function showItemQuantity(productId: number) {
    const cartItem = cart.find((item) => item.product.id === productId);
    return cartItem ? cartItem.quantity : 0;
  }

  return {
    cart,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    showItemQuantity,
  };
}
