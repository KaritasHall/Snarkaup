"use client";

import { useCart } from "../hooks/useCart";
import CartCard from "../components/product-cards/cart-card";
import SectionContainer from "../components/section-container";
import cx from "classnames";
import { useState } from "react";
import { formatPrice } from "../utils/format-price";
import { calculateTotalCartPrice } from "../utils/total-cart-price";
import Button from "../components/button";
import Link from "next/link";

export default function CartPage() {
  const [checkedValue, setCheckedValue] = useState("freeShipping");
  const { cart } = useCart();

  const totalCartPrice = calculateTotalCartPrice(cart);

  // Determine shipping cost
  let shippingCost = 0;
  switch (checkedValue) {
    case "freeShipping":
      shippingCost = 0;
      break;
    case "standardShipping":
      shippingCost = 15;
      break;
    case "expressShipping":
      shippingCost = 25;
      break;
    default:
      shippingCost = 0; // Default to free shipping if no option is selected
  }

  const totalSum = totalCartPrice + shippingCost;

  return (
    <div className="w-screen">
      <SectionContainer>
        <div className="flex w-full justify-center">
          <h2 className="font-poppins text-h1">Cart</h2>
        </div>
        <div className="flex flex-col items-center lg:justify-between xl:flex-row">
          <div className="mb-20 w-fit">
            {cart.map((cartItem, index) => (
              <CartCard key={index} cartItem={cartItem} />
            ))}
          </div>
          {/* Shipping radio group */}
          <div className="h-fit rounded-md border-2 border-black07 p-24 lg:w-[50vw] xl:w-fit">
            <div className="flex min-w-[280px] flex-col gap-16 pb-12">
              <h2 className="font-poppins text-base lg:text-xl">
                Cart summary
              </h2>
              <div role="radiogroup" className="flex flex-col gap-16">
                <div
                  className={cx(
                    "flex gap-12 rounded-md border-[1px] border-black07 p-16",
                    checkedValue === "freeShipping" ? "bg-grey03" : "",
                  )}
                >
                  <input
                    onChange={() => setCheckedValue("freeShipping")}
                    type="radio"
                    checked={checkedValue === "freeShipping"}
                    aria-checked={
                      checkedValue === "freeShipping" ? "true" : "false"
                    }
                    aria-label="Free shipping"
                  />
                  <div className="flex w-full justify-between">
                    <p>Free shipping</p>
                    <p>$0.00</p>
                  </div>
                </div>
                <div
                  className={cx(
                    "flex gap-12 rounded-md border-[1px] border-black07 p-16",
                    checkedValue === "standardShipping" ? "bg-grey03" : "",
                  )}
                >
                  <input
                    onChange={() => setCheckedValue("standardShipping")}
                    type="radio"
                    checked={checkedValue === "standardShipping"}
                    aria-checked={
                      checkedValue === "standardShipping" ? "true" : "false"
                    }
                    aria-label="Standard shipping"
                  />
                  <div className="flex w-full justify-between">
                    <p>Standard shipping</p>
                    <p>$15.00</p>
                  </div>
                </div>
                <div
                  className={cx(
                    "flex gap-12 rounded-md border-[1px] border-black07 p-16",
                    checkedValue === "expressShipping" ? "bg-grey03" : "",
                  )}
                >
                  <input
                    onChange={() => setCheckedValue("expressShipping")}
                    type="radio"
                    checked={checkedValue === "expressShipping"}
                    aria-checked={
                      checkedValue === "expressShipping" ? "true" : "false"
                    }
                    aria-label="Express shipping"
                  />
                  <div className="flex w-full justify-between">
                    <p>Express shipping</p>
                    <p>$25.00</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="pb-24">
              <div className="divider flex justify-between py-12 text-base">
                <p>Subtotal</p>
                <p>{formatPrice(totalCartPrice)} </p>
              </div>
              <div className="flex justify-between py-12 text-base font-bold">
                <p>Total</p>
                <p>{formatPrice(totalSum)} </p>
              </div>
            </div>
            <Link href="/checkout">
              <Button
                ariaLabel="Proceed to checkout"
                stretch
                label="Checkout"
                color="default"
              />
            </Link>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
