import React from "react";
import Image from "next/image";
import Link from "next/link";
interface CommunityProps {
  id: number;
  image: string;
  title: string;
  desc: string;
  btn: string;
}

const data: CommunityProps[] = [
  {
    id: 1,
    image: "/images/community1.png",
    title: "Join Our Platform",
    desc: "Join us to share authentic African flavors, connect with food lovers, and grow your culinary journey.",
    btn: "Sign Up Now",
  },
  {
    id: 2,
    image: "/images/community1.png",
    title: "List On Our Platform",
    desc: "Become a Merchant and share your authentic African dishes with the world.",
    btn: "List Your Items",
  },
  {
    id: 3,
    image: "/images/community1.png",
    title: "Start Delivering",
    desc: "Become a Delivery Partner and bring Africa’s flavors to more homes.",
    btn: "Start Delivering",
  },
];
export default function Community() {
  return (
    <section id="community" className="bg-[#F7F7F7] py-16">
      <div className="container mx-auto px-4">
        <h1 className="lg:text-[56px] md:text-[48px] text-[32px] font-bold text-text text-center">
          Be A Part Of <span className="text-primary">Community</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-5 mt-8">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-white px-7 py-8 lg:min-h-[510px] flex flex-col items-center text-center 
                     w-full h-full rounded-2xl border border-gray-200">
              {/* Image Wrapper */}
              <div className="bg-[#FFDBCC] rounded-full p-4 flex items-center justify-center mb-6">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={160}
                  height={160}
                  className="w-20 h-20 md:w-24 md:h-24 lg:w-40 lg:h-40 object-contain"
                />
              </div>

              {/* Content Wrapper */}
              <div className="flex flex-col flex-grow items-center w-full">
                <h2 className="md:text-[40px] sm:text-[32px] text-[24px] font-sans font-bold text-text mb-2">
                  {item.title}
                </h2>

                <p className="text-[16px] text-text font-normal font-inter mb-4 leading-relaxed">
                  {item.desc}
                </p>

                {/* Button Section */}
                <div className="mt-auto pt-4">
                  <Link href="/signup">
                    <button
                      className="px-7 py-2 text-[16px] bg-primary border-primary font-inter rounded-4xl 
                           transition-all duration-200 text-background font-semibold 
                           hover:bg-background hover:border-primary border-2 hover:text-primary cursor-pointer">
                      {item.btn}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
