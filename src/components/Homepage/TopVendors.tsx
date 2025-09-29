"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  IoIosLink,
  IoMdHeartEmpty,
  IoIosArrowBack,
  IoIosArrowForward,
} from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

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
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <section className="relative h-auto overflow-hidden py-16">
      {/* Background Image */}
      <Image
        src="/images/bgvendors.png"
        alt="Top Vendors Background"
        fill
        className="object-cover object-center -z-10"
        priority
      />

      {/* Content */}
      <div className=" mx-auto max-w-6xl h-full flex flex-col justify-center items-center text-center px-6">
        {/* Title */}
        <h2 className="lg:text-[56px] md:text-[48px] text-[32px] font-sans font-bold text-white">
          <span className="text-primary">Top Rated</span> Vendors
        </h2>

        {/* Slider */}
        <Swiper
          modules={[Navigation]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          spaceBetween={20}
          slidesPerView={1}
          loop={false} // ✅ disable looping so beginning/end detection works
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
          }}
          className="mt-10 w-full">
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white p-10 rounded-2xl overflow-hidden shadow-lg">
                {/* Vendor Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="w-full h-60 object-cover"
                />

                {/* Bottom Section */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center justify-center gap-3">
                    <Image
                      src={item.logo}
                      alt="Vendor Logo"
                      width={40}
                      height={40}
                      className="w-10 h-10 flex object-contain"
                    />
                    <h5 className="text-[40px] font-sans text-text font-semibold">
                      {item.title}
                    </h5>
                  </div>

                  <div className="flex gap-2 text-xl text-white">
                    <button className="p-2 cursor-pointer rounded-full bg-text hover:bg-primary hover:text-white transition">
                      {item.icon1}
                    </button>
                    <button className="p-2 rounded-full cursor-pointer bg-primary hover:bg-text hover:text-white transition">
                      {item.icon2}
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        {/* Left Arrow */}
        {/* Left Arrow */}
        <button
          title="Previous"
          onClick={() => swiperRef.current?.slidePrev()}
          disabled={isBeginning}
          className={`group cursor-pointer absolute left-[5%] top-3/5 -translate-y-1/2 p-3 rounded-full shadow-lg transition z-10
    ${
      isBeginning
        ? "bg-transparent text-primary border border-primary cursor-not-allowed"
        : "bg-orange-500 text-white hover:bg-white hover:text-orange-500"
    }
  `}>
          <IoIosArrowBack size={20} />
        </button>

        {/* Right Arrow */}
        <button
          title="Next"
          onClick={() => swiperRef.current?.slideNext()}
          disabled={isEnd}
          className={`group cursor-pointer absolute right-[5%] top-3/5 -translate-y-1/2 p-3 rounded-full shadow-lg transition z-10
    ${
      isEnd
        ? "bg-transparent text-primary border border-primary cursor-not-allowed"
        : "bg-orange-500 text-white hover:bg-white hover:text-orange-500"
    }
  `}>
          <IoIosArrowForward size={20} />
        </button>
      </div>
    </section>
  );
}
