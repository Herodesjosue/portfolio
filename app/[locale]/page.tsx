import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Philosophy from "../components/Philosophy";
import TechStack from "../components/TechStack";
import Projects from "../components/Projects";
import Footer from "../components/Footer";
import QuantumCloudLoader from "../components/QuantumCloudLoader";

export default function Home() {
  return (
    <>
      <QuantumCloudLoader />
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
