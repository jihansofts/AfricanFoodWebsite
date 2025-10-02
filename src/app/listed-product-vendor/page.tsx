"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: number;
  jerkImage?: string;
  jerkTitle?: string;
}

interface Form {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}
export default function ProductPage() {
  const [activeTab, setActiveTab] = useState<"list" | "listed">("list");
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      title: "Garri",
      jerkImage: "/images/foodcategory/pandg.png",
      jerkTitle: "59 Jerk",
      image: "/images/foodcategory/bestsale/c3best1.png",
      rating: 5,
      price: 5.0,
    },
    {
      id: 2,
      title: "Yams",
      jerkImage: "/images/foodcategory/pandg.png",
      jerkTitle: "59 Jerk",
      image: "/images/foodcategory/bestsale/c3best2.jpg",
      rating: 5,
      price: 5.0,
    },
    {
      id: 3,
      title: "Banku & Palm Soup",
      jerkImage: "/images/foodcategory/pandg.png",
      jerkTitle: "59 Jerk",
      image: "/images/foodcategory/bestsale/c3best3.jpg",
      rating: 5,
      price: 5.0,
    },
  ]);

  const [newProduct, setNewProduct] = useState<Form>({
    id: 0,
    category: "Nigerian",
    price: 0,
    image: "",
    name: "",
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) return;

    const productToAdd: Product = {
      id: Date.now(),
      title: newProduct.name,
      price: newProduct.price,
      image: "/placeholder.jpg",
      rating: 0,
    };

    setProducts([...products, productToAdd]);

    setNewProduct({
      id: 0,
      name: "",
      category: "Nigerian",
      price: 0,
      image: "",
    });
    setActiveTab("listed");
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar key={`full-${i}`} className="text-[#FFA319] size-[20px]" />
      );
    }
    if (halfStar) {
      stars.push(
        <FaStarHalfAlt key="half" className="text-[#FFA319] size-[20px]" />
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaRegStar key={`empty-${i}`} className="text-[#FFA319] size-[20px]" />
      );
    }
    return stars;
  };

  return (
    <div className="bg-background p-4">
      <div className="container mx-auto">
        <div className="flex justify-center gap-10 mb-8 bg-[#F5F5F5] py-3">
          <button
            onClick={() => setActiveTab("list")}
            className={`pb-3 text-2xl font-semibold ${
              activeTab === "list"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-600"
            }`}>
            Add Products
          </button>
          <button
            onClick={() => setActiveTab("listed")}
            className={`pb-3 text-2xl font-semibold ${
              activeTab === "listed"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-600"
            }`}>
            Listed Products
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
                  <option value="Others">Others</option>
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
                Add Product
              </button>
            </div>
            <div className="border-[3px] border-spacing-6 bg-[#FFF5F0] border-dashed border-primary flex flex-col justify-center items-center p-8 rounded-4xl">
              <p className="text-text text-2xl font-bold font-inter">
                Upload Product Picture
              </p>
              <button className="text-primary w-[90%] mt-2 py-6 border-2 border-dashed px-4 flex flex-col items-center justify-center space-y-4 rounded-2xl">
                <IoImageOutline className="size-8" />
                <span>
                  Drag & drop or click to{" "}
                  <span className="underline font-inter text-lg font-semibold">
                    Upload Store’s Picture
                  </span>{" "}
                </span>
              </button>
            </div>
          </div>
        )}

        {activeTab === "listed" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-[#F7F7F7] rounded-2xl px-6 py-8 flex flex-col items-center justify-center">
                <div className="w-[350px] h-[230px] relative">
                  <Image
                    width={350}
                    height={230}
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover rounded-2xl mb-3"
                  />
                  <span className="absolute top-4 right-4 bg-white text-gray-950 font-inter px-3 py-2 rounded-full text-sm">
                    100+ Dishes
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <div className="flex">{renderStars(product.rating)}</div>
                </div>

                <h3 className="font-semibold text-[22px] md:text-[28px] text-[#222222] font-sans mt-2">
                  {product.title}
                </h3>

                <div className="w-full flex items-center justify-center gap-4 mt-4">
                  <span className="text-primary text-[28px] font-bold font-sans">
                    {product.price.toFixed(2)} CAD
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="py-3 px-6 border-2 border-primary font-semibold text-primary rounded-full text-[16px] font-inter cursor-pointer hover:bg-primary hover:text-white transition">
                      Edit
                    </button>
                    <button className="py-3 px-6 border-2 border-primary font-semibold text-primary rounded-full text-[16px] font-inter cursor-pointer hover:bg-primary hover:text-white transition">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
