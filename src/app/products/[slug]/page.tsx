"use client";
import { useProducts } from "@/app/hooks/useProducts";
import SectionContainer from "@/app/components/section-container";
import Button from "@/app/components/button";
import { useCart } from "@/app/hooks/useCart";
import { formatPrice } from "@/app/utils/format-price";
import { ProductCarousel } from "@/app/components/product-carousel";
import { useEffect, useState } from "react";
import { ProductWithContent } from "@/app/hooks/useProducts";
import { ToastNotification } from "@/app/components/toast-notification";
import { ProductPageSkeleton } from "@/app/components/skeletons/product-page-skeleton";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [toastVisible, setToastVisible] = useState(false);
  const [message, setMessage] = useState("");
  const { product, productIsLoading } = useProducts({
    id: params.slug,
  });
  const { addToCart } = useCart();

  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0]);

  useEffect(() => {
    if (product && product.variants.length > 0 && !selectedVariant) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  // Keeping track of the selected variant for price update
  const handleVariantChange = (variant: ProductWithContent["variants"][0]) => {
    setSelectedVariant(variant);
  };

  const image = product?.content;
  const price = product?.variants[0].price ?? 0;

  if (!product) {
    return null;
  }

  const handleAddToCart = (
    productId: number,
    variantId: number,
    quantity: number,
  ) => {
    addToCart(productId, variantId, quantity);
    setMessage("Item added to cart");
    setToastVisible(true);
  };

  return (
    <SectionContainer>
      {productIsLoading ? (
        <ProductPageSkeleton />
      ) : (
        <div className="flex w-full flex-col items-center gap-36 pb-36 lg:flex-row lg:items-start lg:gap-64 lg:pb-0">
          <div className="flex flex-col gap-8 lg:w-1/2">
            {image && (
              <ProductCarousel
                carouselImages={image?.map((img) => img.listUrl)}
                title={product.title}
              />
            )}
          </div>
          <div className="flex flex-col gap-16 lg:w-1/2">
            <div className="flex flex-col gap-16  text-black07">
              <h2 className="font-poppins text-h4 leading-10 text-black lg:pb-16 lg:text-h3 lg:leading-normal">
                {product?.title}
              </h2>
              <p className="text-base text-black04">{product?.description}</p>

              <h3 className="font-poppins text-h6">
                {formatPrice(selectedVariant?.price ?? price)}
              </h3>
            </div>

            <div className="flex w-fit flex-col gap-8 pb-32">
              {/* TODO:Should be able to display variant type (color, size etc.) */}
              <p className="text-base text-black04">Choose variant:</p>
              <select
                className="rounded-md bg-inherit px-10 py-8 shadow-md"
                onChange={(e) => {
                  const selectedVariant = product?.variants.find(
                    (variant) => variant.id === Number(e.target.value),
                  );
                  if (selectedVariant) {
                    handleVariantChange(selectedVariant);
                  }
                }}
              >
                {product?.variants.map((variant) => (
                  <option key={variant.id} value={variant.id}>
                    {variant.title}
                  </option>
                ))}
              </select>
            </div>

            <Button
              ariaLabel="Add to Cart"
              label="Add to Cart"
              stretch={true}
              onClick={() =>
                addToCart(product?.id ?? 0, selectedVariant?.id ?? 0, 1)
              }
            />
          </div>

          <div className="flex w-fit flex-col gap-8 pb-32">
            {/* TODO:Should be able to display variant type (color, size etc.) */}
            <p className="text-base text-black04">Choose variant:</p>
            <select
              className="rounded-md bg-inherit px-10 py-8 shadow-md"
              onChange={(e) => {
                const selectedVariant = product.variants.find(
                  (variant) => variant.id === Number(e.target.value),
                );
                if (selectedVariant) {
                  handleVariantChange(selectedVariant);
                }
              }}
            >
              {product?.variants.map((variant) => (
                <option key={variant.id} value={variant.id}>
                  {variant.title}
                </option>
              ))}
            </select>
          </div>

          <Button
            ariaLabel="Add to Cart"
            label="Add to Cart"
            stretch={true}
            onClick={() =>
              handleAddToCart(
                product.id,
                selectedVariant?.id ?? product.variants[0].id,
                1,
              )
            }
          />
          <ToastNotification
            message={message}
            isVisible={toastVisible}
            onClose={() => setToastVisible(false)}
          />
        </div>
      )}
    </SectionContainer>
  );
}
