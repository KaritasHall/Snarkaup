"use client";

import { useProducts } from "@/app/hooks/useProducts";
import { Category } from "@prisma/client";
import Link from "next/link";

export default function CategoryPage() {
  const { categories } = useProducts({});
  console.log("Component:", categories);

  return (
    <div>
      <h1>Categories</h1>
      {categories?.map((category: Category) => (
        <Link href={`/categories/${category.title}`} key={category.id}>
          <li key={category.id}>{category.title}</li>
        </Link>
      ))}
    </div>
  );
}
