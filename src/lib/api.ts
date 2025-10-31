import { Product, ApiResponse } from "@/types";

const API_URL = "/api/products/get";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(API_URL);
    const data: ApiResponse = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Helper function to get random products
export function getRandomProducts(
  products: Product[],
  count: number
): Product[] {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Helper function to get products by category
export function getProductsByCategory(
  products: Product[],
  category: string
): Product[] {
  return products.filter((product) => product.category === category);
}
