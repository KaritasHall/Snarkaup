"use client";
import { useProducts } from "@/app/hooks/useProducts";
import SectionContainer from "@/app/components/section-container";
import Button from "@/app/components/button";
import { useCart } from "@/app/hooks/useCart";
import { formatPrice } from "@/app/utils/format-price";
import { ProductCarousel } from "@/app/components/product-carousel";
import { ItemCounter } from "@/app/components/item-counter";
import { useState } from "react";
import { ProductWithContent } from "@/app/hooks/useProducts";

// TODO: Uppfæra cartCard til að sýna réttan variant með réttu verði

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { product } = useProducts({
    id: params.slug,
  });
  const { addToCart } = useCart();
  const productWithContent = product as ProductWithContent;
  const [selectedVariant, setSelectedVariant] = useState(
    productWithContent?.variants[0],
  );

  // Keeping track of the selected variant for price update
  const handleVariantChange = (variant: ProductWithContent["variants"][0]) => {
    setSelectedVariant(variant);
  };

  const image = product?.content;
  const price = product?.variants[0].price ?? 0;

  if (!product) {
    return null;
  }

  // console.log(product?.variants);

  return (
    <SectionContainer>
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
            <p className="font-inter text-base text-black04">
              {product?.description}
            </p>
            {/* Variant price! */}
            <h3 className="">{formatPrice(selectedVariant?.price ?? price)}</h3>
          </div>

          <div className="flex w-fit flex-col gap-8 pb-32">
            {/* TODO:Should be able to display variant type (color, size etc.) */}
            <p className="font-inter text-base text-black04">Choose variant:</p>
            <select
              className="rounded-md bg-inherit px-6 py-8 shadow-md"
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

          <div className="flex items-center gap-16">
            <div>
              <ItemCounter productId={product?.id ?? 0} />
            </div>
            <Button
              ariaLabel="Add to Cart"
              label="Add to Cart"
              stretch={true}
              onClick={() => addToCart(product?.id ?? 0, 1)}
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
