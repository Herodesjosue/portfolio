import About from "@/shared/components/landing/about";
import HeroSection from "@/shared/components/landing/hero";
import Project from "@/shared/components/landing/project";
import SectionScroller from "@/shared/components/ui/scroll/SectionScroller";
import Service from "@/shared/components/landing/service";
import TestimonialsV2 from "@/shared/components/landing/testimonials-v2";
import Alliancev2 from "@/shared/components/landing/alliance-v2";
// import Alliance from "@/shared/components/landing/alliance";
// import Testimonials from "@/shared/components/landing/testimonials";

const Page = () => {
  return (
    <main className="h-screen text-sm">
      <SectionScroller>
        <HeroSection />
        <About />
        <Service />
        <Project />
        {/* <Alliance /> */}
        <Alliancev2 />
        {/* <Testimonials /> */}
        <TestimonialsV2 />
      </SectionScroller>
    </main>
  );
};

export default Page;
