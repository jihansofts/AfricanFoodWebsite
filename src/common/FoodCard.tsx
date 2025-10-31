"use client";
import React, { useState } from "react";
import type { Product } from "@/types";
import Image from "next/image";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface FoodCardProps {
  datas: Product[];
  titleblack: string;
  titleorange: string;
}

export default function FoodCard({
  datas,
  titleblack,
  titleorange,
}: FoodCardProps) {
  const [page, setPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<
    "left" | "right" | "none"
  >("none");
  const visibleCount = 3;
  const totalPages = Math.ceil(datas.length / visibleCount);
  const hasPagination = totalPages > 1;

  const handlePrev = () => {
    if (!hasPagination || page === 0) return;
    setSlideDirection("right");
    setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (!hasPagination || page === totalPages - 1) return;
    setSlideDirection("left");
    setPage((prev) => prev + 1);
  };

  const startIndex = page * visibleCount;
  const currentDatas = datas.slice(startIndex, startIndex + visibleCount);

  const isPrevDisabled = !hasPagination || page === 0;
  const isNextDisabled = !hasPagination || page === totalPages - 1;

  // Generate random ratings for demonstration (since API doesn't provide ratings)
  const getRandomRating = (product: Product) => {
    // Use product ID to generate consistent random rating
    const seed = product._id.charCodeAt(0);
    return 3 + (seed % 20) / 10; // Ratings between 3.0 and 5.0
  };

  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, i) => (
      <FaStar key={i} className="text-[#FFA319] size-[25px]" />
    ));
  };

  if (datas.length === 0) return null;

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-text text-[32px] md:text-[44px] lg:text-[56px] font-semibold font-sans">
          {titleblack} <span className="text-primary">{titleorange}</span>
        </h1>
        {hasPagination && (
          <div className="flex items-center space-x-4">
            <button
              title="prev"
              onClick={handlePrev}
              disabled={isPrevDisabled}
              className={`p-3 rounded-full border transition-all duration-200 ${
                isPrevDisabled
                  ? "opacity-50 cursor-not-allowed border-primary text-primary"
                  : "cursor-pointer border-primary text-white bg-primary hover:bg-primary/90"
              }`}
            >
              <IoIosArrowBack className="size-5" />
            </button>

            <span className="text-text text-base font-bold min-w-[60px] text-center">
              {page + 1} / {totalPages}
            </span>

            <button
              title="next"
              onClick={handleNext}
              disabled={isNextDisabled}
              className={`p-3 rounded-full border transition-all duration-200 ${
                isNextDisabled
                  ? "opacity-50 cursor-not-allowed border-primary text-primary"
                  : "cursor-pointer border-primary text-white bg-primary hover:bg-primary/90"
              }`}
            >
              <IoIosArrowForward className="size-5" />
            </button>
          </div>
        )}
      </div>
      <div className="relative overflow-hidden">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ease-in-out ${
            slideDirection === "left"
              ? "translate-x-4 opacity-0"
              : slideDirection === "right"
              ? "-translate-x-4 opacity-0"
              : "translate-x-0 opacity-100"
          }`}
          onTransitionEnd={() => setSlideDirection("none")}
        >
          {currentDatas.map((product) => {
            const rating = getRandomRating(product);
            return (
              <div
                key={product._id}
                className="bg-[#F7F7F7] rounded-3xl px-6 py-2 2xl:py-6 flex flex-col items-center justify-center"
              >
                <div className="w-full h-[250px] relative mb-4">
                  <Image
                    fill
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <span className="absolute top-4 right-4 bg-white text-gray-800 font-inter px-3 py-2 rounded-full text-sm font-medium shadow-md">
                    {product.category}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-1.5">{renderStars()}</div>
                  {/* <span className="text-gray-600 text-sm font-inter">
                    ({rating.toFixed(0)})
                  </span> */}
                </div>

                <h3 className="font-semibold text-[22px] md:text-[28px] text-[#222222] font-sans mt-2 line-clamp-1">
                  {product.name}
                </h3>

                <div className="w-full flex items-center justify-center gap-4 mt-4">
                  <span className="text-primary lg:text-[28px] md:text-[24px] text-[20px] font-bold font-sans">
                    ${product.price.toFixed(2)} CAD
                  </span>
                  <button className="lg:py-4 md:py-3 py-2 lg:px-5 md:px-4 px-3 border-2 border-primary font-semibold text-primary rounded-full 2xl:text-[18px] lg:text-[16px] md:text-[14px] text-[14px] font-inter cursor-pointer hover:bg-primary hover:text-white transition">
                    Add To Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
