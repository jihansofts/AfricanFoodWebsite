"use client";
import React, { useState } from "react";
import type { Product } from "@/lib/data";
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
    <div className="mt-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-text text-[32px] md:text-[44px] lg:text-[56px] font-semibold font-sans">
          {titleblack} <span className="text-primary">{titleorange}</span>
        </h1>
        <div className="flex items-center space-x-4">
          <button
            title="prev"
            onClick={handlePrev}
            disabled={isPrevDisabled}
            className={`p-3 rounded-full border transition-all duration-200 ${
              isPrevDisabled
                ? "opacity-50 cursor-not-allowed border-primary text-primary"
                : "cursor-pointer border-primary text-white bg-primary hover:text-white"
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
                : "cursor-pointer border-primary text-white bg-primary hover:text-white"
            }`}
          >
            <IoIosArrowForward className="size-5" />
          </button>
        </div>
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
          {currentDatas.map((item) => (
            <div
              key={item.id}
              className="bg-[#F7F7F7] rounded-2xl px-6 py-8 flex flex-col items-center justify-center"
            >
              <div className="w-[350px] h-[230px] relative">
                <Image
                  width={350}
                  height={230}
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-2xl mb-3"
                />
                <span className="absolute top-4 right-4 bg-white text-gray-950 font-inter px-3 py-2 rounded-full text-sm">
                  100+ Dishes
                </span>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <div className="flex">{renderStars(item.rating)}</div>
              </div>

              <h3 className="font-semibold text-[22px] md:text-[28px] text-[#222222] font-sans mt-2">
                {item.title}
              </h3>

              <div className="w-full flex items-center justify-between mt-4">
                <span className="text-primary text-[28px] font-bold font-sans">
                  {item.price.toFixed(2)} CAD
                </span>
                <button className="py-2 px-4 border-2 border-primary font-semibold text-primary rounded-full text-[16px] font-inter cursor-pointer hover:bg-primary hover:text-white transition">
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
