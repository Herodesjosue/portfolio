"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import type { IconsProps } from "./types";
import useBreakpoint from "@/shared/hooks/useBreakpoint";
import breakpoints from "@/shared/constant/breakpoints";

const Logo: React.FC<IconsProps> = ({ className = "" }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const isMobile = useBreakpoint(breakpoints.xl);

  if (loading) return <></>;

  return (
    <Image
      src={isMobile ? `/images/quantiqo-logo.png` : `/images/quantiqo-logo.png`}
      alt="Nest Logo"
      
      width={isMobile ? 39 : 76}
      height={isMobile ? 32 : 68}
      className={` ${className}`}
    />
  );
};

export default Logo;
