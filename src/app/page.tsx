import ClientTestimonial from "@/components/Homepage/ClientTestimonial";
import Community from "@/components/Homepage/Community";
import FoodCategory from "@/components/Homepage/FoodCategory";
import Hero from "@/components/Homepage/Hero";
import TopVendors from "@/components/Homepage/TopVendors";
import WhyChooseUs from "@/components/Homepage/WhyChooseUs";

export default function Home() {
  return (
    <main>
      <Hero />
      <Community />
      <FoodCategory />
      <TopVendors />
    </main>
  );
}
