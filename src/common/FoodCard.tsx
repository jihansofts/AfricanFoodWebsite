"use client";
import React from "react";
import type { Product } from "@/lib/data";
import Image from "next/image";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

interface FoodCardProps {
  datas: Product[];
}

export default function FoodCard({ datas }: FoodCardProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar key={`full-${i}`} className="text-[#FFA319] size-[25px]" />
      );
    }
    if (halfStar) {
      stars.push(
        <FaStarHalfAlt key="half" className="text-[#FFA319] size-[25px]" />
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaRegStar key={`empty-${i}`} className="text-[#FFA319] size-[25px]" />
      );
    }

    return stars;
  };
  return (
    <div className="grid grid-cols-3 gap-4 mt-6">
      {datas.map((item) => (
        <div
          key={item.id}
          className="bg-[#F7F7F7] rounded-2xl px-6 py-3 transition-all duration-300 flex flex-col items-center justify-center"
        >
          <div className="w-[383px] h-[256px] relative">
            <Image
              width={383}
              height={256}
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover rounded-md mb-3"
            />
            <span className="absolute top-4 right-4 bg-white text-gray-950 font-inter px-3 py-2 rounded-full text-base">
              100+ Dishes
            </span>
            <span className="absolute bottom-4 left-4 bg-white text-gray-950 font-inter px-3 py-2 rounded-full text-base">
              <div className="flex items-center gap-2">
                <img src={item.jerkImage} alt="" className="h-6 w-6" />
                <span>{item.jerkTitle}</span>
              </div>
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex">{renderStars(item.rating)}</div>
          </div>
          <h3 className="font-semibold text-[22px] md:text-[32px] lg:text-[36px] text-[#222222] font-sans">
            {item.title}
          </h3>
          <div className="w-full flex items-center justify-around mt-4">
            <div className="flex items-center gap-2">
              <span className="text-primary text-[32px] font-bold font-sans">
                {item.price.toFixed(2)}
              </span>
              <span className="text-primary text-[32px] font-bold font-sans">
                CAD
              </span>
            </div>
            <button className="py-4 px-6 border-2 border-primary font-semibold text-primary rounded-full text-[18px] font-inter cursor-pointer">
              Add To Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
