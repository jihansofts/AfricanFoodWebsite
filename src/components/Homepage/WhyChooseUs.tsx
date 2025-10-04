import React from "react";
import Image from "next/image";

type WhyChooseUsProps = {
  id: number;
  icon: string;
  title: string;
  desc: string;
  bg: string;
  bColer: string;
};

const data: WhyChooseUsProps[] = [
  {
    id: 1,
    icon: "/images/why1.svg",
    title: "Fast Delivery",
    desc: "Get your order delivered quickly and reliably, right when you need it. We make speed and convenience our priority.",
    bg: "#FFF6F6",
    bColer: "#F6A8A8",
  },
  {
    id: 2,
    icon: "/images/why2.svg",
    title: "100% African Food",
    desc: "Enjoy authentic African flavors made with fresh, traditional ingredients. Every dish is prepared to bring you the true taste of Africa.",
    bg: "#F2FFF2",
    bColer: "#A6DEA8",
  },
  {
    id: 3,
    icon: "/images/why3.svg",
    title: "Quality Food",
    desc: "We serve only the best, with fresh ingredients and careful preparation to ensure every bite is delicious and satisfying.",
    bg: "#F7F5FF",
    bColer: "#6A48FF",
  },
  {
    id: 4,
    icon: "/images/why4.svg",
    title: "Quality Customer Support",
    desc: "Our friendly team is always ready to help, making sure your experience is smooth, simple, and stress-free.",
    bg: "#FFF7EA",
    bColer: "#FFA319",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-background py-20">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 px-4">
        {/* Left Content */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <h2 className="text-text text-start text-[32px] md:text-[44px] lg:text-[56px] font-semibold font-sans">
            Why <span className="text-primary">Choose</span> Us
          </h2>
          <p className="text-[#5E5D5D] text-[16px] font-inter mt-4">
            At our platform, we celebrate the rich and diverse culinary
            traditions of Africa by connecting food lovers with talented vendors
            and chefs from across the continent. Every dish is crafted with
            authentic recipes, fresh ingredients, and a passion for flavor.
          </p>
          <p className="text-[#5E5D5D] text-[16px] font-inter mt-4">
            By choosing us, you not only enjoy unforgettable meals, but also
            support local cooks, preserve cultural heritage, and explore a world
            of unique tastes — all from the comfort of your home.
          </p>
          <button className="mt-6 max-w-52 bg-primary text-white px-6 py-3 rounded-full font-semibold font-inter">
            Explore Recipes
          </button>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((item, index) => (
            <div
              key={item.id}
              className={`rounded-md p-6 flex flex-col items-start text-left h-full
        ${index === 1 || index === 3 ? "mt-10" : "lg:mt-0 md:mt-10 mt-10"}`} // ✅ add margin top for 2nd & 4th card
              style={{
                backgroundColor: item.bg,
                borderBottom: `12px solid ${item.bColer}`,
              }}>
              {/* Icon */}
              <div className="rounded-full p-4 flex items-center justify-center mb-4">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={60}
                  height={60}
                />
              </div>

              {/* Title + Desc */}
              <h3 className="text-[18.84px] font-inter font-bold text-text mb-2">
                {item.title}
              </h3>
              <p className="text-[#0A1600A6] text-[14px] font-inter">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
