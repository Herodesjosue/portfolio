import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Philosophy from "../components/Philosophy";
import TechStack from "../components/TechStack";
import Projects from "../components/Projects";
import Footer from "../components/Footer";
import ScrollAnimator from "../components/ScrollAnimator";
import IntroLoader from "../components/IntroLoader";

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
