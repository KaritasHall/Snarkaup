import { useQuery } from "@tanstack/react-query";

interface Product {
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
  id?: number;
  category?: string;
}

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

  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesIsLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("https://fakestoreapi.com/products/categories");
      const data = await res.json();
      return data as string[];
    },
  });

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
    enabled: id != null && typeof id === "number",
  });

  const {
    data: productsByCategory,
    error: productsByCategoryError,
    isLoading: productsByCategoryIsLoading,
  } = useQuery({
    queryKey: ["productsByCategory", category],
    queryFn: async () => {
      const res = await fetch(
        `https://fakestoreapi.com/products/category/${category}`
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
