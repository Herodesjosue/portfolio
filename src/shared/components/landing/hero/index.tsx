import React from "react";
import { Brain, Code, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";

interface FeatureCardProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

interface PillProps {
  title: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, desc, icon }) => (
  <div className="bg-neutral-900/80 border border-neutral-800 transition-colors duration-500 hover:border-white rounded-lg py-4 px-6 flex flex-col items-center gap-4">
    {icon}
    <h4 className="text-white text-xl">{title}</h4>
    <p className="text-white/60 text-sm text-center">{desc}</p>
  </div>
);

const Pill: React.FC<PillProps> = ({ title, icon }) => (
  <div className="flex  items-center justify-center w-full gap-3 bg-neutral-900/80 border border-neutral-800 transition-colors duration-500 hover:border-white rounded-lg px-4 py-2 text-sm text-neutral-200">
    <div className="w-5 h-5 flex items-center justify-center">{icon}</div>
    <div className="text-white text-lg">{title}</div>
  </div>
);

const HeroSection = () => {
  return (
    <div className="h-screen relative sm:overflow-hidden p-10">
      <div className="h-full w-full flex items-center justify-center  sm:border-2 border-white/40">
        <div className="max-w-6xl sm:overflow-hidden w-full px-6 py-12 z-10 text-center">
          <div className="flex  flex-col text-2xl gap-2 my-12">
            <h1>{`Hi i'm Herodes`} 👋</h1>
            <h3 className=""> Full Stack Developer 🚀</h3>
            <p className="text-sm">
              I build scalable web applications with modern technologies and
              clean architecture.
            </p>
          </div>

          {/* Feature cards row */}
          <div className="grid grid-cols-1 md:grid-cols-3  gap-6 mb-12">
            <FeatureCard
              title="Performance First"
              desc="Optimized frontends with Nextjs and modern rendering strategies."
              icon={<Code height={48} width={48} />}
            />
            <FeatureCard
              title="Clean Architecture"
              desc="Scalable, maintainable code with best practices."
              icon={<Brain height={48} width={48} />}
            />
            <FeatureCard
              title="Secure & Reliable"
              desc="Auth, roles, 2FA and production-ready backends."
              icon={<ShieldCheck height={48} width={48} />}
            />
          </div>

          {/* My Tech Stack title */}
          <h3 className="text-center text-xl text-neutral-200 mb-6">
            My Tech Stack
          </h3>

          {/* Tech cards */}

          {/* Pills / small tech list */}
          <div className="max-w-xl mx-auto">
            <Marquee gradient gradientColor="#131414" speed={50}>
              <div className="inline-block mx-3 shrink-0">
                <Pill
                  title="React"
                  icon={
                    <Image
                      src="/images/assets/react.png"
                      alt="React"
                      width={48}
                      className="mix-blend-lighten"
                      height={48}
                    />
                  }
                />
              </div>
              <div className="inline-block mx-3 shrink-0">
                <Pill
                  title="Next.js"
                  icon={
                    <Image
                      src="/images/assets/nextjs.png"
                      alt="nextjs"
                      className="invert"
                      width={80}
                      height={80}
                    />
                  }
                />
              </div>
              <div className="inline-block mx-3 shrink-0">
                <Pill
                  title="TypeScript"
                  icon={
                    <Image
                      src="/images/assets/typescript.png"
                      alt="typescript"
                      width={48}
                      height={48}
                    />
                  }
                />
              </div>

              <div className="inline-block mx-3 shrink-0">
                <Pill
                  title="Tailwind"
                  icon={
                    <Image
                      src="/images/assets/tailwind.png"
                      alt="tailwind"
                      className="invert"
                      width={48}
                      height={48}
                    />
                  }
                />
              </div>
              <div className="inline-block mx-3 shrink-0">
                <Pill
                  title="Prisma"
                  icon={
                    <Image
                      src="/images/assets/prisma.svg"
                      alt="prisma"
                      className="invert"
                      width={48}
                      height={48}
                    />
                  }
                />
              </div>
              <div className="inline-block mx-3 shrink-0">
                <Pill
                  title="PostgreSQL"
                  icon={
                    <Image
                      src="/images/assets/postgresql.svg"
                      alt="postgresql"
                      className="invert"
                      width={48}
                      height={48}
                    />
                  }
                />
              </div>
              <div className="inline-block mx-3 shrink-0">
              <Pill
                title="NestJS"
                icon={
                  <Image
                    src="/images/assets/nestjs.svg"
                    alt="nestjs"
                    className="invert"
                    width={48}
                    height={48}
                  />
                }
              />
              </div>
            </Marquee>
          </div>
          {/* <div className="flex justify-center p-10 gap-20 items-center">
            <div className="flex flex-col items-center">
              <h2 className="flex gap-2 items-center text-2xl">
                <span className="text-5xl">+3</span>
                Years
              </h2>
              <span className="text-xl text-white/60 font-light">
                Experience
              </span>
            </div>

          </div> */}

          <div className="flex justify-center  items-center gap-2.5 text-3xl p-10">
            <Link
              href="https://www.linkedin.com/in/herodeslugo/"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-white size-10"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
