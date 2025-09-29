"use client";
import React from "react";
import Image from "next/image";
import { IoIosLink, IoMdHeartEmpty } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface TopVendorsProps {
  id: number;
  image: string;
  logo: string;
  title: string;
  icon1: React.ReactNode;
  icon2: React.ReactNode;
}

const data: TopVendorsProps[] = [
  {
    id: 1,
    image: "/images/vendor1.png",
    logo: "/images/ven1.svg",
    title: "59 Jerk",
    icon1: <IoIosLink />,
    icon2: <IoMdHeartEmpty />,
  },
  {
    id: 2,
    image: "/images/vendor2.png",
    logo: "/images/ven2.svg",
    title: "59 Jerk",
    icon1: <IoIosLink />,
    icon2: <IoMdHeartEmpty />,
  },
  {
    id: 3,
    image: "/images/vendor1.png",
    logo: "/images/ven1.svg",
    title: "59 Jerk",
    icon1: <IoIosLink />,
    icon2: <IoMdHeartEmpty />,
  },
];

export default function TopVendors() {
  return (
    <section className="relative overflow-hidden py-16">
      {/* Background Image */}
      <Image
        src="/images/bgvendors.png"
        alt="Top Vendors Background"
        fill
        className="object-cover object-center -z-10"
        priority
      />

      {/* Content */}
      <div className="relative mx-auto max-w-6xl h-full flex flex-col justify-center items-center text-center px-6">
        {/* Title */}
        <h2 className="lg:text-[56px] md:text-[48px] text-[32px] font-sans font-bold text-white">
          <span className="text-primary">Top Rated</span> Vendors
        </h2>

        {/* Slider */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="mt-10 w-full">
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                {/* Vendor Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="w-full h-60 object-cover"
                />

                {/* Bottom Section */}
                <div className="p-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.logo}
                      alt="Vendor Logo"
                      width={40}
                      height={40}
                      className="w-10 h-10 object-contain"
                    />
                    <h5 className="text-lg font-semibold">{item.title}</h5>
                  </div>

                  <div className="flex gap-2 text-xl text-primary">
                    <button className="p-2 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition">
                      {item.icon1}
                    </button>
                    <button className="p-2 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition">
                      {item.icon2}
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows */}
        <div className="swiper-button-prev absolute left-2 top-1/2 -translate-y-1/2 text-orange-500 text-3xl cursor-pointer z-10" />
        <div className="swiper-button-next absolute right-2 top-1/2 -translate-y-1/2 text-orange-500 text-3xl cursor-pointer z-10" />
      </div>
    </section>
  );
}
