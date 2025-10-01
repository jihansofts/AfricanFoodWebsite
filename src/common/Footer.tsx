"use client";
import React from "react";

export default function Footer() {
  return (
    <div className="bg-background mt-10">
      <div className="container mx-auto bg-text px-8 py-8 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5 flex flex-col space-y-4">
            <h1 className="font-sans text-6xl font-bold text-primary">
              AfroEats
            </h1>
            <p className="text-gray-300 font-inter max-w-lg text-base md:text-xl">
              Join us now and embark on a culinary journey to explore, create,
              and savor amazing recipes!
            </p>
          </div>

          <div className="md:col-span-7">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h2 className="text-xl font-inter font-bold text-[#FFFEFD]">
                  Company
                </h2>
                <ul className="space-y-3">
                  <li className="text-[16px] text-gray-300 font-medium font-inter hover:text-gray-200 cursor-pointer transition-colors">
                    About Us
                  </li>
                  <li className="text-[16px] text-gray-300 font-medium font-inter hover:text-gray-200 cursor-pointer transition-colors">
                    Our Stories
                  </li>
                  <li className="text-[16px] text-gray-300 font-medium font-inter hover:text-gray-200 cursor-pointer transition-colors">
                    Work with Us
                  </li>
                  <li className="text-[16px] text-gray-300 font-medium font-inter hover:text-gray-200 cursor-pointer transition-colors">
                    User Testimonials
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="text-xl font-inter font-bold text-[#FFFEFD]">
                  Support
                </h2>
                <ul className="space-y-3">
                  <li className="text-[16px] text-gray-300 font-medium font-inter hover:text-gray-200 cursor-pointer transition-colors">
                    FAQ
                  </li>
                  <li className="text-[16px] text-gray-300 font-medium font-inter hover:text-gray-200 cursor-pointer transition-colors">
                    Membership
                  </li>
                  <li className="text-[16px] text-gray-300 font-medium font-inter hover:text-gray-200 cursor-pointer transition-colors">
                    User Policy
                  </li>
                  <li className="text-[16px] text-gray-300 font-medium font-inter hover:text-gray-200 cursor-pointer transition-colors">
                    Customer Support
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="text-xl font-inter font-bold text-[#FFFEFD]">
                  Contact
                </h2>
                <ul className="space-y-3">
                  <li className="text-[16px] text-gray-300 font-medium font-inter hover:text-gray-200 cursor-pointer transition-colors">
                    Phone Number
                  </li>
                  <li className="text-[16px] text-gray-300 font-medium font-inter hover:text-gray-200 cursor-pointer transition-colors">
                    Email Address
                  </li>
                  <li className="text-[16px] text-gray-300 font-medium font-inter hover:text-gray-200 cursor-pointer transition-colors">
                    Social Media
                  </li>
                  <li className="text-[16px] text-gray-300 font-medium font-inter hover:text-gray-200 cursor-pointer transition-colors">
                    Company Location
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-600" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 font-inter text-sm order-2 md:order-1">
            Copyright © 2025 SK RIFAT. All rights reserved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-[57%] order-1 md:order-2">
            <input
              type="email"
              className="border-b border-background/50 outline-none text-background py-2 px-1 placeholder:text-gray-400 bg-transparent w-full"
              placeholder="Enter your email address ..."
            />
            <button className="bg-primary px-6 py-3 text-background rounded-full text-[16px] font-inter hover:bg-primary/90 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
