"use client";
import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-background">
      {/* Background Image */}
      <div className="container relative mx-auto rounded-2xl overflow-hidden">
        {/* ✅ Give the wrapper a height */}
        <div className=" mx-auto relative w-full min-h-[600px] bg-black/100 rounded-2xl  ">
          <Image
            src="/images/foodhero.png"
            alt="Hero"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute mx-auto max-w-6xl inset-0 flex flex-col justify-center items-center text-center px-6">
            <h1 className="text-5xl md:text-[80px] font-bold text-white font-sans drop-shadow-lg">
              Bringing <span className="text-primary">Africa’s Culinary</span>{" "}
              Heritage to the World
            </h1>
            <p className="mt-4 text-[14px] md:text-[16px] text-white max-w-4xl">
              Our platform connects you to talented African chefs and home cooks
              who share their authentic recipes and dishes with the world. Every
              meal is crafted with love, tradition, and unique flavors from
              across the continent. By ordering here, you’re not just tasting
              Africa — you’re supporting local vendors and celebrating the
              diversity of African cuisine.
            </p>
            <div className="mt-6 flex lg:flex-row md:flex-col flex-col gap-4">
              <button className="px-10 py-3 text-[16px] bg-primary border-primary  font-inter rounded-4xl transition-all duration-200 text-background font-medium hover:bg-transparent hover:border-background border-2 hover:text-background cursor-pointer">
                Explore Recipes
              </button>
              <button className="px-10 py-2 text-[16px] bg-transparent border-background border-2 font-inter rounded-4xl transition-all duration-200 text-background font-medium hover:bg-primary hover:border-primary  hover:text-background cursor-pointer">
                Join Community
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
