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
      name: "Brooklyn Simmons",
      text: "“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.”",
      rating: 5,
      image: "/images/clienttestimonial/client1.png",
    },
    {
      id: 2,
      name: "Leslie Alexander",
      text: "“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.”",
      rating: 5,
      image: "/images/clienttestimonial/client2.png",
    },
    {
      id: 3,
      name: "Jenny Wilson",
      text: "“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.”",
      rating: 4,
      image: "/images/clienttestimonial/client3.png",
    },
    {
      id: 4,
      name: "John Doe",
      text: "“Excellent service and amazing quality. Highly recommended!”",
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
    <div className="bg-background">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-4">
            <h1 className="text-text text-[32px] md:text-[44px] lg:text-[56px] font-semibold font-sans">
              What Our <span className="text-primary">Clients</span> Say
            </h1>
            <p className="max-w-2xl text-[19px] text-[#6D6D74]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div className="flex items-end justify-end space-x-4">
            <button
              onClick={prevTestimonial}
              title="Previous testimonial"
              className="arrow-button bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors"
            >
              <IoIosArrowBack className="size-5" />
            </button>
            <button
              onClick={nextTestimonial}
              title="Next testimonial"
              className="arrow-button bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors"
            >
              <IoIosArrowForward className="size-5" />
            </button>
          </div>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="border border-gray-200 rounded-xl p-6 shadow-md space-y-4"
              >
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
    </div>
  );
}
