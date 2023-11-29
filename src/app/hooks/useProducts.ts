import { useQuery } from "@tanstack/react-query";

export interface Category {
  id: number;
  title: string;
  slug: string;
}

// This is the type of the data that we will get from the API
export interface Product {
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
    queryFn: async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      return data as Product[];
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
      const res = await fetch("https://fakestoreapi.com/products/categories");
      const data = await res.json();
      const productCategories = data.map((category: string, index: number) => ({
        id: index,
        title: category,
        slug: encodeURI(category),
      }));
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
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      return data as Product;
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
      const res = await fetch(
        `https://fakestoreapi.com/products/category/${category}`,
      );
      const data = await res.json();
      return data as Product[];
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
