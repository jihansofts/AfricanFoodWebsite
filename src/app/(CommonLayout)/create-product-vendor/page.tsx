// app/listed-product-vendor/page.tsx
import ProductCreate from "@/components/ProductCreate/ProductCreate";
import { requireRole } from "@/lib/authGuard";

export default async function VendorPage() {
  // only allows vendors
  const session = await requireRole("vendor");
  console.log("Vendor Session:", session);

  return <ProductCreate />;
}
