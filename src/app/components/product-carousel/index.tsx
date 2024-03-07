import Image from "next/image";
import { ArrowRightIcon } from "../icons";
import Button from "../button";
import { useState } from "react";
import cx from "classnames";

interface ProductCarouselProps {
  carouselImages: string[];
  title: string;
}

export const ProductCarousel = ({
  carouselImages,
  title,
}: ProductCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Using the array index to navigate through the images
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + carouselImages.length) % carouselImages.length,
    );
  };

  if (!carouselImages.length) return null;

  return (
    <div className="flex h-full w-full flex-col gap-8">
      <div className="relative h-full w-full">
        <div className="relative flex w-full items-center justify-center">
          {carouselImages.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={title}
              width={728}
              height={547}
              className={cx("h-full w-full transition-all duration-300", {
                "absolute opacity-0": index !== currentIndex,
                "relative opacity-100": index === currentIndex,
                "-translate-x-[5%]": index < currentIndex,
                "translate-x-[5%]": index > currentIndex,
              })}
            />
          ))}
          <div className="">
            {currentIndex > 0 && (
              <div className="absolute left-0 top-1/2 pl-12 2xl:pl-64">
                <Button
                  className="rotate-180 transform"
                  shape="circular"
                  color="grey"
                  icon={ArrowRightIcon}
                  ariaLabel="Show previous image"
                  onClick={prevImage}
                />
              </div>
            )}
            {currentIndex < carouselImages.length - 1 && (
              <div className="absolute right-0 top-1/2 pr-12 2xl:pr-64">
                <Button
                  shape="circular"
                  color="grey"
                  icon={ArrowRightIcon}
                  ariaLabel="Show next image"
                  onClick={nextImage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {carouselImages.length > 1 && (
        <div className="grid w-full grid-cols-3 gap-4 lg:gap-6">
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`cursor-pointer transition-all duration-200 ${
                index === currentIndex
                  ? "border-2 border-black"
                  : "border-2 border-transparent"
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <Image
                src={image}
                alt={title}
                width={728}
                height={547}
                className="h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
