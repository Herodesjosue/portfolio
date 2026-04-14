import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Philosophy from "../components/Philosophy";
import TechStack from "../components/TechStack";
import Projects from "../components/Projects";
import Footer from "../components/Footer";
import QuantumCloudLoader from "../components/QuantumCloudLoader";
import ScrollAnimator from "../components/ScrollAnimator";

export default function Home() {
  return (
    <>
      <QuantumCloudLoader />
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
