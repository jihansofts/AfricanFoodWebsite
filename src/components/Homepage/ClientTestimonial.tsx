"use client";

import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
  image: string;
}

export default function ClientTestimonial() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const clientTest: Testimonial[] = [
    {
      id: 1,
      name: "— Amara O.",
      text: "“AfricanFoodZones brought the taste of home right to my doorstep! The Egusi Soup was just like my grandmother’s, bursting with authentic flavors. The ordering process was seamless, and delivery was super fast. I’m already looking forward to my next order!”",
      rating: 5,
      image: "/images/clienttestimonial/client1.png",
    },
    {
      id: 2,
      name: "— James K.",
      text: "“As a foodie, I’m always on the hunt for unique culinary experiences. AfricanFoodZones introduced me to Ghanaian Jollof Rice, and it was a game-changer! The spices were perfectly balanced, and the platform’s community vibe makes it so special.”",
      rating: 5,
      image: "/images/clienttestimonial/client2.png",
    },
    {
      id: 3,
      name: "— Fatima A.",
      text: "“I’ve been craving authentic Nigerian cuisine since moving abroad, and AfricanFoodZones delivered beyond my expectations. The Suya was smoky and delicious, and the groceries section had all the spices I needed to recreate it at home!”",
      rating: 5,
      image: "/images/clienttestimonial/client3.png",
    },
    {
      id: 4,
      name: "— Kwame S.",
      text: "“What a fantastic platform! I ordered a variety of West African dishes for a family gathering, and everyone was blown away by the quality and authenticity. AfricanFoodZones is now my go-to for celebrating our heritage.”",
      rating: 5,
      image: "/images/clienttestimonial/client1.png",
    },
    {
      id: 5,
      name: "— Adeola E.",
      text: "“The customer service at AfricanFoodZones is top-notch! I had a question about my order, and they responded quickly and professionally. The Ayamase I ordered was fresh, flavorful, and beautifully packaged. Highly recommended!”",
      rating: 5,
      image: "/images/clienttestimonial/client1.png",
    },
    {
      id: 6,
      name: "— Tade M.",
      text: "“I love how AfricanFoodZones connects me with local African vendors. The Pounded Yam and Vegetable Soup combo was a nostalgic treat, and the platform makes it so easy to explore new dishes. It’s like a culinary adventure every time!”",
      rating: 5,
      image: "/images/clienttestimonial/client2.png",
    },
    {
      id: 7,
      name: "— Aisha B.",
      text: "“AfricanFoodZones is a gem for anyone who loves African cuisine. The community recipe section inspired me to try cooking Egusi myself, and the ingredients I ordered arrived fresh and well-packaged. This platform is a true celebration of African culture!”",
      rating: 5,
      image: "/images/clienttestimonial/client3.png",
    },
  ];

  const getVisibleTestimonials = () => {
    const testimonials = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % clientTest.length;
      testimonials.push(clientTest[index]);
    }
    return testimonials;
  };

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === clientTest.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? clientTest.length - 1 : prevIndex - 1
    );
  };

  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`size-4 ${
              index < rating ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">({rating}.0)</span>
      </div>
    );
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <section id="testimonials" className="bg-background">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-4">
            <h1 className="text-text text-[32px] md:text-[44px] lg:text-[56px] font-semibold font-sans">
              What Our <span className="text-primary">Clients</span> Say
            </h1>
            <p className="max-w-2xl text-[19px] text-[#6D6D74]">
              Read what our clients are <br className="hidden md:block" />{" "}
              talking about us
            </p>
          </div>

          <div className="flex items-end justify-end space-x-4">
            <button
              onClick={prevTestimonial}
              title="Previous testimonial"
              className="arrow-button bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors">
              <IoIosArrowBack className="size-5" />
            </button>
            <button
              onClick={nextTestimonial}
              title="Next testimonial"
              className="arrow-button bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors">
              <IoIosArrowForward className="size-5" />
            </button>
          </div>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-6 shadow-md space-y-4">
                <p className="text-[19px] font-inter text-[#6D6D74] italic">
                  {testimonial.text}
                </p>
                <div className="flex items-center space-x-4">
                  <div className="relative h-12 w-12">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-[#040404] text-[19px] font-bold font-inter">
                      {testimonial.name}
                    </h2>
                    {renderRating(testimonial.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-2 mt-6">
            {clientTest.map((_, index) => (
              <button
                title="Change testimonial"
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 w-3 rounded-full ${
                  index === currentIndex ? "bg-primary" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
