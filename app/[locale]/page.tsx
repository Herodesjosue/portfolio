import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import Philosophy from "@/components/landing/philosophy";
import TechStack from "@/components/landing/tech-stack";
import Projects from "@/components/landing/projects";
import Footer from "@/components/landing/footer";
import ScrollAnimator from "@/components/landing/scroll-animator";
import IntroLoader from "@/components/landing/intro-loader";

export default function Home() {
  return (
    <>
      <IntroLoader />
      <ScrollAnimator />
      <Navbar />
      <main>
        <Hero />
        <Philosophy />
        <TechStack />
        <Projects />
      </main>
      <Footer />
    </>
  );
}
