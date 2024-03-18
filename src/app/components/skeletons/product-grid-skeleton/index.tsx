const ProductGridSkeleton = () => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 justify-evenly gap-x-[80px] gap-y-24 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-40 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="flex w-card-w flex-col gap-12">
            <div className="h-card-h animate-pulse bg-grey03" />
            <div className="mt-4 h-8 w-3/4 animate-pulse bg-grey03" />
            <div className="mt-2 h-4 w-1/4 animate-pulse bg-grey03" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGridSkeleton;
