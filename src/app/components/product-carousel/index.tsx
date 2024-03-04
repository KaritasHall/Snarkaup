import Image from "next/image";
import { ArrowRightIcon } from "../icons";
import Button from "../button";
import { useState } from "react";
import classNames from "classnames";
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

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + carouselImages.length) % carouselImages.length,
    );
  };

  const showPrevButton = currentIndex === carouselImages.length - 1;
  const showNextButton = currentIndex === 0;

  if (!carouselImages.length) return null;

  return (
    <div className="relative flex h-full w-full flex-col gap-8">
      <div className="relative h-full w-full">
        <div className="z-30 w-full">
          {currentIndex > 0 && (
            <div className="absolute left-0 top-1/2 pl-12">
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
            <div className="absolute right-0 top-1/2 pr-12">
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

        <Image
          src={carouselImages[currentIndex]}
          alt={title}
          width={728}
          height={547}
        />
      </div>
      <div className="flex w-full gap-4">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`cursor-pointer bg-gray-300 ${
              index === currentIndex ? "border-2 border-black" : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            <Image
              src={image}
              alt={title}
              width={728}
              height={547}
              layout="responsive"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
