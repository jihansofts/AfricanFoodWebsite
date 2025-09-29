"use client";
import FoodCategoryCard from "@/common/FoodCategoryCard";
import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { datas } from "@/lib/data";
export default function FoodCategory() {
  return (
    <section className="bg-background">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-text text-[32px] md:text-[44px] lg:text-[56px] font-semibold font-sans">
            Explore <span className="text-primary">African</span> Heritage
          </h1>
          <div className="flex items-center space-x-4">
            <button title="button" className="arrow-button">
              <IoIosArrowBack className="size-5" />
            </button>
            <span className="text-text text-base font-bold">1 / 2</span>
            <button title="button" className="arrow-button">
              <IoIosArrowForward className="size-5 " />
            </button>
          </div>
        </div>
        {/* category */}
        <div className="mt-8">
          <FoodCategoryCard datas={datas} />
        </div>
      </div>
    </section>
  );
}
