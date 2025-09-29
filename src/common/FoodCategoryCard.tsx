"use client";
import React, { useState } from "react";
import type { Category } from "@/lib/data";
import FoodCard from "./FoodCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Image from "next/image";

interface FoodCategoryCardProps {
  datas: Category[];
}

export default function FoodCategoryCard({ datas }: FoodCategoryCardProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>(datas[0]);

  return (
    <>
      <div className="flex items-center justify-center gap-6">
        {datas.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedCategory(item)}
            className="relative w-full h-[600px] rounded-3xl bg-[#F7F7F7] cursor-pointer group overflow-hidden"
          >
            {selectedCategory.id !== item.id && (
              <h2 className="text-[24px] md:text-[28px] lg:text-[32px] font-semibold text-text mb-2 transition-all duration-500 group-hover:opacity-0 relative z-10 mx-4 my-2 group-hover:mx-0 group-hover:my-0">
                {item.title}
              </h2>
            )}

            <div
              className={`rounded-md overflow-hidden relative transition-all duration-500 ${
                selectedCategory.id === item.id
                  ? "absolute inset-0 h-full w-full rounded-3xl"
                  : "h-[490px] group-hover:absolute group-hover:inset-0 group-hover:h-full group-hover:w-full group-hover:rounded-lg mx-4 my-2 group-hover:mx-0 group-hover:my-0"
              }`}
            >
              <Image
                fill
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-all duration-500 rounded-3xl"
              />

              <div
                className={`absolute inset-0 bg-gradient-to-b from-primary to-primary/0 z-10 rounded-lg transition-opacity duration-500 ${
                  selectedCategory.id === item.id
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              ></div>

              <div
                className={`absolute top-6 left-6 right-6 z-20 transition-all duration-500 delay-100 ${
                  selectedCategory.id === item.id
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0"
                }`}
              >
                <h3 className="text-white text-[24px] md:text-[28px] lg:text-[32px] font-semibold">
                  {item.title}
                </h3>
                <p className="text-white text-[16px] md:text-[18px] lg:text-[20px]">
                  {item.subTitle}
                </p>
              </div>

              <span
                className={`absolute bottom-24 left-6 z-20 bg-[#FFFEFD] text-[#222222] text-sm font-normal px-3 py-1 rounded-full transition-all duration-500 delay-200 font-inter ${
                  selectedCategory.id === item.id
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0"
                }`}
              >
                {item.batch}
              </span>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 w-11/12">
                <button className="w-full bg-primary text-white py-3 font-medium rounded-lg hover:bg-primary/90 transition-colors duration-300 font-inter">
                  See All Dishes
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-text text-[32px] md:text-[44px] lg:text-[56px] font-semibold font-sans">
              <span className="text-primary">Best</span> Selling
            </h1>
            <button className="view-all-button">View All</button>
          </div>
          <div className="flex items-center space-x-4">
            <button title="button" className="arrow-button">
              <IoIosArrowBack className="size-5" />
            </button>
            <span className="text-text text-base font-bold">1 / 2</span>
            <button title="button" className="arrow-button">
              <IoIosArrowForward className="size-5" />
            </button>
          </div>
        </div>
        <FoodCard datas={selectedCategory.bestSaleing} />
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-text text-[32px] md:text-[44px] lg:text-[56px] font-semibold font-sans">
              <span className="text-primary">Top</span> Rated
            </h1>
            <button className="view-all-button">View All</button>
          </div>
          <div className="flex items-center space-x-4">
            <button title="button" className="arrow-button">
              <IoIosArrowBack className="size-5" />
            </button>
            <span className="text-text text-base font-bold">1 / 2</span>
            <button title="button" className="arrow-button">
              <IoIosArrowForward className="size-5" />
            </button>
          </div>
        </div>
        <FoodCard datas={selectedCategory.topRated} />
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-text text-[32px] md:text-[44px] lg:text-[56px] font-semibold font-sans">
              <span className="text-primary">Featured</span> Products
            </h1>
            <button className="view-all-button">View All</button>
          </div>
          <div className="flex items-center space-x-4">
            <button title="button" className="arrow-button">
              <IoIosArrowBack className="size-5" />
            </button>
            <span className="text-text text-base font-bold">1 / 2</span>
            <button title="button" className="arrow-button">
              <IoIosArrowForward className="size-5" />
            </button>
          </div>
        </div>
        <FoodCard datas={selectedCategory.FetureProducts} />
      </div>
    </>
  );
}
