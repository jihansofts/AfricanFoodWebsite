"use client";
import React, { useState } from "react";
import type { Category } from "@/types";
import FoodCard from "./FoodCard";
import Image from "next/image";

interface FoodCategoryCardProps {
  datas: Category[];
}

export default function FoodCategoryCard({ datas }: FoodCategoryCardProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>(datas[0]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-6">
        {datas.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedCategory(item)}
            className="relative w-full h-[600px] rounded-3xl bg-[#F7F7F7] cursor-pointer group overflow-hidden transition-all duration-300 hover:shadow-2xl">
            {/* Category Title - Shows when not selected */}
            {selectedCategory.id !== item.id && (
              <h2 className="text-[24px] md:text-[28px] lg:text-[32px] font-semibold text-text mb-2 transition-all duration-500 group-hover:opacity-0 relative z-10 mx-4 my-2 group-hover:mx-0 group-hover:my-0">
                {item.category}
              </h2>
            )}

            <div
              className={`rounded-md overflow-hidden relative transition-all duration-500 ${
                selectedCategory.id === item.id
                  ? "absolute inset-0 h-full w-full rounded-3xl"
                  : "h-[490px] group-hover:absolute group-hover:inset-0 group-hover:h-full group-hover:w-full group-hover:rounded-3xl mx-4 my-2 group-hover:mx-0 group-hover:my-0"
              }`}>
              <Image
                fill
                src={item.image}
                alt={item.category}
                className="w-full h-full object-cover transition-all duration-500 rounded-3xl group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/20 z-10 rounded-3xl transition-opacity duration-500 ${
                  selectedCategory.id === item.id
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}></div>

              {/* Content */}
              <div
                className={`absolute top-6 left-6 right-6 z-20 transition-all duration-500 delay-100 ${
                  selectedCategory.id === item.id
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0"
                }`}>
                <h3 className="text-white text-[24px] md:text-[28px] lg:text-[32px] font-semibold mb-2">
                  {item.category}
                </h3>
                <p className="text-white/90 text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed">
                  {item.subTitle}
                </p>
              </div>

              {/* Batch Label */}
              <span
                className={`absolute bottom-24 left-6 z-20 bg-white text-gray-800 text-sm font-medium px-4 py-2 rounded-full transition-all duration-500 delay-200 font-inter shadow-lg ${
                  selectedCategory.id === item.id
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0"
                }`}>
                {item.batch}
              </span>

              {/* CTA Button */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 w-11/12">
                <button className="w-full bg-primary text-white py-4 font-semibold rounded-xl transition-all duration-300 font-inter shadow-lg hover:shadow-xl">
                  See All Dishes
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Sections for Selected Category */}
      <div className="py-10">
        {selectedCategory.bestSaleing.length > 0 && (
          <FoodCard
            datas={selectedCategory.bestSaleing}
            titleblack="Best"
            titleorange=" Selling"
          />
        )}

        {selectedCategory.topRated.length > 0 && (
          <FoodCard
            datas={selectedCategory.topRated}
            titleblack="Top"
            titleorange=" Rated"
          />
        )}

        {selectedCategory.FetureProducts.length > 0 && (
          <FoodCard
            datas={selectedCategory.FetureProducts}
            titleblack="Featured"
            titleorange=" Products"
          />
        )}
        <div className="flex justify-center mt-5">
          <button className="text-[16px] font-inter text-white bg-primary text-center  py-3 px-12 mt-4 rounded-4xl">
            See All Cuisines
          </button>
        </div>
      </div>
    </>
  );
}
