"use client";
import HeroSection from "@/shared/components/landing/hero";
import QuantumCloud from "@/shared/components/threeJs/QuantumCloud";

const Page = () => {
  return (
    <main className={`h-screen text-sm relative overflow-hidden `}>
      <div>
        <HeroSection />
        <QuantumCloud />
      </div>
    </main>
  );
};

export default Page;
