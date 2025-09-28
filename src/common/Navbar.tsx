"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

type NavItem = {
  id: string;
  label: string;
};

export default function Navbar(): React.ReactElement {
  const [activeLink, setActiveLink] = useState<string>("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const navItems: NavItem[] = [
    { id: "home", label: "HOME" },
    { id: "recipes", label: "RECIPES" },
    { id: "vendors", label: "TOP VENDORS" },
    { id: "community", label: "COMMUNITY" },
    { id: "why-us", label: "WHY US" },
    { id: "testimonials", label: "TESTIMONIALS" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3 },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3 },
    },
  };

  const handleLinkClick = (itemId: string): void => {
    setActiveLink(itemId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-background shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}>
            <h1 className="text-primary text-[42px] font-bold font-sans">
              AfroEats
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden md:flex space-x-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible">
            {navItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="relative">
                <button
                  onClick={() => handleLinkClick(item.id)}
                  className={`px-4 py-2 text-[16px] font-inter rounded-md transition-all duration-200 ${
                    activeLink === item.id
                      ? "text-primary font-bold font-inter"
                      : "text-text font-normal hover:text-primary cursor-pointer"
                  }`}>
                  {item.label}
                  {activeLink === item.id && (
                    <motion.div
                      className="absolute left-0 bottom-4 w-[6px] h-[6px] bg-primary rounded-full"
                      layoutId="activeIndicator"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              </motion.div>
            ))}
          </motion.div>
          <div className="hidden md:flex items-center space-x-4">
            <button className="px-7 py-2 text-[16px] bg-primary border-primary  font-inter rounded-4xl transition-all duration-200 text-background font-semibold hover:bg-background hover:border-primary border-2 hover:text-primary cursor-pointer">
              Login
            </button>
            <button className="px-6 py-2 text-[16px] bg-background border-primary border-2 font-inter rounded-4xl transition-all duration-200 text-primary font-semibold hover:bg-primary  hover:text-background cursor-pointer">
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-md text-text hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}>
            {/* Hamburger / Close icon */}
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.path
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <motion.path
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </AnimatePresence>
            </svg>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden overflow-hidden"
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}>
              <div className="px-2 pt-2 pb-4 space-y-1 bg-background">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleLinkClick(item.id)}
                    className={`block w-full text-left px-3 py-3 rounded-md text-[16px] font-inter transition-all duration-200 ${
                      activeLink === item.id
                        ? "text-primary font-bold  border-l-4 border-primary"
                        : "text-text font-normal hover:text-primary"
                    }`}
                    whileHover={{ x: 8 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400 }}>
                    {item.label}
                  </motion.button>
                ))}

                {/* ✅ Mobile Auth Buttons */}
                <div className="mt-4 flex flex-col gap-3 px-3">
                  <button className="px-7 py-2 text-[16px] bg-primary border-primary font-inter rounded-4xl transition-all duration-200 text-background font-semibold hover:bg-background hover:border-primary border-2 hover:text-primary cursor-pointer">
                    Login
                  </button>
                  <button className="px-6 py-2 text-[16px] bg-background border-primary border-2 font-inter rounded-4xl transition-all duration-200 text-primary font-semibold hover:bg-primary hover:text-background cursor-pointer">
                    Sign Up
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
