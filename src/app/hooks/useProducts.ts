import { useQuery } from "@tanstack/react-query";
import {
  Product,
  ProductContent,
  ProductVariant,
  Category,
} from "@prisma/client";

export interface AugmentedProduct extends Product {
  content: ProductContent[];
  variants: ProductVariant[];
  listImage?: string;
  lowestPrice?: number;
}
// TODO: Delete old categories after testing
export interface OldCategory {
  id: number;
  title: string;
  slug: string;
}

// This is the type of the data that we will get from the API
export interface OldProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface UseProductsProps {
  id?: number | String;
  category?: string;
}

// A hook that will fetch the products from the API
export function useProducts({ id, category }: UseProductsProps) {
  const {
    data: products,
    error: productsError,
    isLoading: productsIsLoading,
  } = useQuery({
    queryKey: ["products"],
    enabled: !(!!id || !!category),
    queryFn: async () => {
      const res = await fetch("/api/products");
      const data = await res.json();

      // Augment the data with the list image
      const augmentedData = data.map((product: Product) => ({
        ...product,
        listImage: (product as AugmentedProduct).content[0].listUrl,
        lowestPrice: Math.min(
          ...(product as AugmentedProduct).variants.map(
            (variant: ProductVariant) => variant.price,
          ),
        ),
      }));

      return augmentedData as AugmentedProduct[];
    },
  });

  // Fetch the categories
  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesIsLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("/api/categories");
      const data = await res.json();
      const productCategories = data.map(
        (category: Category, index: number) => ({
          id: index,
          title: category,
          slug: encodeURI(category.title),
        }),
      );
      return productCategories;
    },
  });
  // Fetch the product by id
  const {
    data: product,
    error: productError,
    isLoading: productIsLoading,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await fetch("/api/products/" + id);
      const data = await res.json();
      return data as AugmentedProduct;
    },
    enabled: id != null,
  });

  // Fetch the products by category
  const {
    data: productsByCategory,
    error: productsByCategoryError,
    isLoading: productsByCategoryIsLoading,
  } = useQuery({
    queryKey: ["productsByCategory", category],
    queryFn: async () => {
      const res = await fetch("/api/categories/" + category);
      const data = await res.json();
      return data as AugmentedProduct[];
    },
    enabled: category != null && typeof category === "string",
  });

  return {
    product,
    products,
    categories,
    productsByCategory,
  };
}
