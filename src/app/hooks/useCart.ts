import { ListProductWithContent, useProducts } from "./useProducts";
import { useRecoilState, atom } from "recoil";
import { useCallback, useEffect } from "react";

export type CartItem = {
  quantity: number;
  product: ListProductWithContent;
  variantId: number;
};

const cartState = atom<CartItem[]>({
  key: "cartState",
  default: [],
});

export function useCart() {
  const [cart, setCart] = useRecoilState(cartState);

  const { products } = useProducts({});

  function addToCart(
    productId: number,
    variantId: number,
    quantityChange: number,
  ) {
    setCart((currentCart) => {
      const productIndex = currentCart.findIndex(
        (item) => item.variantId === variantId,
      );

      // Product found in the cart, update the quantity
      if (productIndex !== -1) {
        let updatedCart = [...currentCart];
        let newQuantity = updatedCart[productIndex].quantity + quantityChange;

        // Update quantity if it's more than 0
        if (newQuantity > 0) {
          updatedCart[productIndex] = {
            ...updatedCart[productIndex],
            quantity: newQuantity,
            variantId,
          };
          // Remove the item if the quantity would drop to 0 or below
        } else {
          updatedCart.splice(productIndex, 1);
        }

        updateLocalstorageCart(updatedCart);
        return updatedCart;
      } else {
        if (quantityChange < 1) {
          // Can't add a non-positive quantity for a new cart item
          console.error(
            `Can't add non-positive quantity for product ID ${productId}`,
          );

          return currentCart;
        }
        // Find the product in the list to ensure it exists before adding
        const product = products?.find((product) => product.id === productId);
        const productVariant = product?.variants.find(
          (variant) => variant.id === variantId,
        );
        if (!product || !productVariant) {
          // Product not found in the product list, throw an error
          throw new Error(`Product with ID ${productId} not found`);
        }

        const updatedCart = [
          ...currentCart,
          { product, quantity: quantityChange, variantId },
        ];
        // Add the new product with the given quantity
        updateLocalstorageCart(updatedCart);
        return updatedCart;
      }
    });
  }

  function decreaseQuantity(variantId: number) {
    setCart((currentCart) => {
      const cartItemIndex = currentCart.findIndex(
        (item) => item.variantId === variantId,
      );
      if (cartItemIndex === -1) {
        // Item not found in the cart, no action needed
        console.warn(`Product with ID ${variantId} not found in the cart.`);
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

      updateLocalstorageCart(updatedCart);
      return updatedCart;
    });
  }

  // Remove a product from the cart
  function removeFromCart(variantId: number) {
    setCart((currentCart) => {
      const updatedCart = currentCart.filter(
        (item) => item.variantId !== variantId,
      );

      updateLocalstorageCart(updatedCart);
      return updatedCart;
    });
  }

  // Show item quantity in cart
  function showItemQuantity(variantId: number) {
    const cartItem = cart.find((item) => item.variantId === variantId);
    return cartItem ? cartItem.quantity : 0;
  }

  // save cart to local storage
  const updateLocalstorageCart = useCallback((updatedCart: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }, []);

  useEffect(() => {
    const cartLS = localStorage.getItem("cart");
    if (cartLS && cartLS !== "undefined") {
      setCart((currentCart) => {
        if (currentCart.length > 0) {
          return currentCart;
        }

        return JSON.parse(cartLS);
      });
    }
  }, [setCart]);

  return {
    cart,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    showItemQuantity,
  };
}
