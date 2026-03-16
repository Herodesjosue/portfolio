"use client";

import dynamic from "next/dynamic";

const QuantumCloud = dynamic(() => import("./QuantumCloud"), { ssr: false });

export default function QuantumCloudLoader() {
  return <QuantumCloud />;
}
