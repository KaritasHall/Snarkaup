import SectionContainer from "../../section-container";

export const ProductPageSkeleton = () => {
  return (
    <div className="flex w-full animate-pulse flex-col items-center gap-36 pb-36 lg:flex-row lg:items-start lg:gap-64 lg:pb-0">
      <div className="flex flex-col gap-8 lg:w-1/2">
        {/* Image carousel */}
        <div className="h-[547px] w-full rounded-md bg-gray-200"></div>
        {/* Thumbnails */}
        <div className="grid h-full w-full grid-cols-3 gap-4 lg:gap-6">
          <div className="h-[140px rounded-md bg-gray-200"></div>
          <div className="h-[140px] rounded-md bg-gray-200"></div>
          <div className="h-[140px rounded-md bg-gray-200"></div>
        </div>
      </div>
      <div className="flex h-full flex-col gap-16 lg:w-1/2">
        <div className="flex flex-col gap-16 pb-32">
          {/* Title */}
          <div className="h-40 w-3/4 rounded-md bg-gray-200"></div>
          <div className="mb-16 h-40 w-1/2 rounded-md bg-gray-200"></div>
          {/* Description */}
          <div className="h-4 w-full rounded-md bg-gray-200"></div>
          <div className="h-4 w-5/6 rounded-md bg-gray-200"></div>
          <div className="h-4 w-2/3 rounded-md bg-gray-200"></div>
          {/* Price */}
          <div className="mb-32 h-20 w-1/6 rounded-md bg-gray-200"></div>
        </div>
        {/* Variant selection and add to cart button */}
        <div className="flex flex-col gap-8 pb-32">
          {/* Variant prompt skeleton */}
          <div className="h-4 w-1/4 rounded-md bg-gray-200"></div>
          {/* Variant selection skeleton */}
          <div className="h-16 w-1/6 bg-gray-200"></div>
        </div>
        {/* Add to cart button skeleton */}
        <div className="h-36 w-full rounded-md bg-gray-300"></div>
      </div>
    </div>
  );
};
