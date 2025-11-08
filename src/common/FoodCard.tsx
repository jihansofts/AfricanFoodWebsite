"use client";
import React, { useState } from "react";
import type { Product } from "@/types";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "./LoginModel";
import EmailModal from "./EmailModel";

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
  const { user } = useAuth();
  const [page, setPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [slideDirection, setSlideDirection] = useState<
    "left" | "right" | "none"
  >("none");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
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
                  ? "opacity-50 cursor-not-allowed border-primary text-primary"
                  : "cursor-pointer border-primary text-white bg-primary hover:bg-primary/90"
              }`}>
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
          onTransitionEnd={() => setSlideDirection("none")}>
          {currentDatas.map((product) => {
            return (
              <div
                key={product._id}
                className="bg-[#F7F7F7] rounded-3xl px-6 py-6 flex flex-col items-center justify-center">
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

                <div className="w-full flex items-center justify-between gap-5 mt-4">
                  <span className="text-primary lg:text-[28px] md:text-[24px] text-[20px] font-bold font-sans">
                    ${product.price.toFixed(2)} CAD
                  </span>
                  {user ? (
                    <>
                      {product.vendor?.contactType === "whatsapp" &&
                      product.vendor?.contactInfo ? (
                        <Link
                          href={`https://wa.me/${product.vendor.contactInfo.replace(
                            /\D/g,
                            ""
                          )}?text=${encodeURIComponent(
                            `Hi, I'm interested in your product "${product.name}"! 👋`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="lg:py-4 md:py-3 py-2 lg:px-8 md:px-4 px-4 border-2 border-primary font-semibold text-primary rounded-full 2xl:text-[18px] lg:text-[16px] md:text-[14px] text-[14px] font-inter cursor-pointer hover:bg-primary hover:text-white transition">
                          Contact WhatsApp
                        </Link>
                      ) : product.vendor?.contactType === "email" &&
                        product.vendor?.contactInfo ? (
                        <button
                          onClick={() => {
                            setSelectedProduct(product);
                            setShowEmailModal(true);
                          }}
                          className="lg:py-4 md:py-3 py-2 lg:px-8 md:px-4 px-4 border-2 border-primary font-semibold text-primary rounded-full 2xl:text-[18px] lg:text-[16px] md:text-[14px] text-[14px] font-inter cursor-pointer hover:bg-primary hover:text-white transition">
                          Contact via Email
                        </button>
                      ) : product.vendor?.contactType === "phone" &&
                        product.vendor?.contactInfo ? (
                        <Link
                          href={`tel:${product.vendor.contactInfo.replace(
                            /\D/g,
                            ""
                          )}`}
                          className="lg:py-4 md:py-3 py-2 lg:px-8 md:px-4 px-4 border-2 border-primary font-semibold text-primary rounded-full 2xl:text-[18px] lg:text-[16px] md:text-[14px] text-[14px] font-inter cursor-pointer hover:bg-primary hover:text-white transition">
                          Call Vendor
                        </Link>
                      ) : (
                        <button
                          disabled
                          className="lg:py-4 md:py-3 py-2 lg:px-8 md:px-4 px-4 border-2 border-gray-400 text-gray-400 rounded-full cursor-not-allowed font-semibold 2xl:text-[18px]">
                          No Contact Info
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => setShowModal(true)}
                      className="lg:py-4 md:py-3 py-2 lg:px-8 md:px-4 px-4 border-2 border-primary font-semibold text-primary rounded-full 2xl:text-[18px] lg:text-[16px] md:text-[14px] text-[14px] font-inter cursor-pointer hover:bg-primary hover:text-white transition">
                      Vendor Contact
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <LoginModal showModal={showModal} setShowModal={setShowModal} />
      {selectedProduct && (
        <EmailModal
          show={showEmailModal}
          onClose={() => setShowEmailModal(false)}
          product={selectedProduct}
          user={user}
        />
      )}
    </div>
  );
}
