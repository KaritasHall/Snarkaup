import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
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

export interface AugmentedCategory extends Category {
  children?: AugmentedCategory[];
  products?: AugmentedProduct[];
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
      return augmentProductsList(data);
    },
  });

  // Fetch the categories
  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesIsLoading,
  } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("/api/categories");
      const data = await res.json();
      const productCategories = data.map(
        (category: Category, index: number) => ({
          id: index,
          title: category.title,
          slug: encodeURI(category.title),
          parentId: category.parentId,
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
  } = useQuery<AugmentedCategory>({
    queryKey: ["productsByCategory", category],
    queryFn: async () => {
      const res = await fetch("/api/categories/" + category);
      const data = await res.json();
      return data as AugmentedCategory;
    },
    enabled: category != null && typeof category === "string",
  });

  // Extract products from categories and their children
  const extractProducts = useMemo(() => {
    const extract = (category: AugmentedCategory): AugmentedProduct[] => {
      const directProducts = category.products || [];
      const childrenProducts = category.children
        ? category.children.flatMap((child) => extract(child))
        : [];

      return augmentProductsList([...directProducts, ...childrenProducts]);
    };

    return productsByCategory ? extract(productsByCategory) : [];
  }, [productsByCategory]);

  function augmentProductsList(products: AugmentedProduct[]) {
    return products.map((product) => ({
      ...product,
      listImage: product.content[0].listUrl,
      lowestPrice: Math.min(
        ...product.variants.map((variant: ProductVariant) => variant.price),
      ),
    }));
  }

  return {
    product,
    products: extractProducts.length !== 0 ? extractProducts : products,
    categories,
    productsByCategory,
  };
}
