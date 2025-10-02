"use client";
import FoodCategoryCard from "@/common/FoodCategoryCard";
import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { datas } from "@/lib/data";

export default function FoodCategory() {
  const [page, setPage] = useState(0);
  const visibleCount = 3;
  const totalPages = Math.ceil(datas.length / visibleCount);

  const isPrevDisabled = totalPages <= 1 || page === 0;
  const isNextDisabled = totalPages <= 1 || page === totalPages - 1;

  const handlePrev = () => {
    if (isPrevDisabled) return;
    setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (isNextDisabled) return;
    setPage((prev) => prev + 1);
  };

  const startIndex = page * visibleCount;
  const currentDatas = datas.slice(startIndex, startIndex + visibleCount);

  return (
    <section id="recipes" className="bg-background">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-text text-[32px] md:text-[44px] lg:text-[56px] font-semibold font-sans">
            Explore <span className="text-primary">African</span> Heritage
          </h1>
          <div className="flex items-center space-x-4">
            <button
              title="prev"
              onClick={handlePrev}
              disabled={isPrevDisabled}
              className={`p-3 rounded-full border transition-all duration-200 ${
                isPrevDisabled
                  ? "opacity-30 cursor-not-allowed border-primary text-primary"
                  : "cursor-pointer border-primary text-white bg-primary hover:text-white"
              }`}>
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
                  ? "opacity-30 cursor-not-allowed border-primary text-primary"
                  : "cursor-pointer border-primary text-white bg-primary hover:text-white"
              }`}>
              <IoIosArrowForward className="size-5" />
            </button>
          </div>
        </div>
        <div className="mt-8 transition-opacity duration-300">
          <FoodCategoryCard datas={currentDatas} />
        </div>
      </div>
    </section>
  );
}
