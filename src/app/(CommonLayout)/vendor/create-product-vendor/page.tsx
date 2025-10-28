// app/listed-product-vendor/page.tsx
import ProductCreate from "@/components/ProductCreate/ProductCreate";
import { requireRole } from "@/lib/authGuard";

export default async function VendorPage() {
  await requireRole("vendor");
  return <ProductCreate />;
}
