"use client";
import React, { useRef, useState } from "react";
import { IoImageOutline } from "react-icons/io5";
import { IProduct } from "@/model/ProductModel";
import PackgeCard from "@/common/PackgeCard";
import { useAuth } from "@/context/AuthContext";
import ProductCard from "./ProductList";
import Swal from "sweetalert2";

export interface Form {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}
export default function ProductCreate() {
  const { user } = useAuth();
  console.log(user, "user");
  const userId = user?.id;
  const [activeTab, setActiveTab] = useState<"list" | "listed" | "upgrade">(
    "list"
  );
  const [products, setProducts] = useState<IProduct[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [base64String, setBase64String] = React.useState<string>("");
  const [loading, setLoading] = useState(false);

  const [newProduct, setNewProduct] = useState<Form>({
    id: 0,
    category: "Nigerian",
    price: 0,
    image: "",
    name: "",
  });
  const handleClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64String(reader.result as string);
      };
      reader.readAsDataURL(file); // Converts file to Base64
    }
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      Swal.fire("Error", "Please fill in all required fields", "error");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch("/api/products/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newProduct.name,
          price: newProduct.price,
          category: newProduct.category,
          imageUrl: base64String,
        }),
      });
      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        Swal.fire("Error", data.error || "Failed to add product", "error");
        return;
      }

      // update UI
      setProducts((prev) => [...prev, data.product]);

      // reset form
      setNewProduct({
        id: 0,
        name: "",
        category: "Nigerian",
        price: 0,
        image: "",
      });

      setActiveTab("listed");
      Swal.fire("Success", "Product added successfully", "success");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error adding product:", error);
      Swal.fire("Error", "Failed to add product", "error");
    }
  };

  return (
    <div className="bg-background p-4">
      <div className="container mx-auto">
        <div className="flex justify-center gap-10 mb-8 bg-[#F5F5F5] py-3">
          <button
            onClick={() => setActiveTab("list")}
            className={`pb-3 lg:text-2xl md:text-[18px] text-[16px] font-semibold ${
              activeTab === "list"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-600"
            }`}>
            Add Products
          </button>
          <button
            onClick={() => setActiveTab("listed")}
            className={`pb-3 lg:text-2xl md:text-[18px] text-[16px] font-semibold ${
              activeTab === "listed"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-600"
            }`}>
            Listed Products
          </button>
          <button
            onClick={() => setActiveTab("upgrade")}
            className={`pb-3 lg:text-2xl md:text-[18px] text-[16px] font-semibold ${
              activeTab === "upgrade"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-600"
            }`}>
            Upgrade Package
          </button>
        </div>

        {activeTab === "list" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-[24px] font-sans font-blod text-[#222222]">
                Provide Details
              </h2>
              <div className="space-y-2">
                <label className="block text-lg font-inter">
                  Select Category
                </label>
                <select
                  title="Select Category"
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                  className="w-full border py-3 px-2 rounded border-gray-200 outline-0">
                  <option value="Nigerian">Nigerian</option>
                  <option value="Ghanaian">Ghanaian</option>
                  <option value="AfricanGroceries">AfricanGroceries</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-lg font-inter">Enter Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  className="w-full border py-3 px-2 rounded border-gray-200 outline-0"
                  placeholder="Food"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-lg font-inter">Enter Price</label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      price: Number(e.target.value),
                    })
                  }
                  className="w-full border py-3 px-2 rounded border-gray-200 outline-0"
                  placeholder="5"
                />
              </div>
              <button
                onClick={handleAddProduct}
                className="bg-primary w-full text-white px-6 py-2 rounded-full font-sans font-semibold text-lg">
                {loading ? "Adding..." : "Add Product"}
              </button>
            </div>
            <div
              onClick={handleClick}
              className="border-[3px] border-spacing-6 bg-[#FFF5F0] border-dashed border-primary flex flex-col justify-center items-center p-8 rounded-4xl">
              <p className="text-text text-2xl font-bold font-inter">
                Upload Product Picture
              </p>
              <button
                type="button"
                className="text-primary w-[90%] mt-2 py-6 border-2 border-dashed px-4 flex flex-col items-center justify-center space-y-4 rounded-2xl">
                <IoImageOutline className="size-8" />
                <span>
                  Drag & drop or click to{" "}
                  <span className="underline font-inter text-lg font-semibold">
                    Upload Store’s Picture
                  </span>{" "}
                </span>
                <input
                  title="Upload Profile Picture"
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </button>
            </div>
          </div>
        )}

        {activeTab === "listed" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product: IProduct, index) => (
              <ProductCard
                key={String(product._id ?? index)} // ✅ Use product._id if available, coerced to string
                product={product}
                // onEdit={handleEdit}
                // onDelete={handleDelete}
              />
            ))}
          </div>
        )}
        {activeTab === "upgrade" && (
          <div className="text-center">
            <PackgeCard userId={userId as string} />
          </div>
        )}
      </div>
    </div>
  );
}
