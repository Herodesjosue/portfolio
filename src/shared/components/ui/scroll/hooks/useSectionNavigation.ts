import { useEffect, useState } from "react";

interface UseSectionNavigationProps {
  children: React.ReactNode[];
  activeIndex: number;
  nextSection: () => void;
  prevSection: () => void;
}

export default function useSectionNavigation({
  // children,
  // activeIndex,
  // nextSection,
}: UseSectionNavigationProps) {
  // View / client detection
  const [isDesktop, setIsDesktop] = useState<boolean>(true);
  const [loadingClient, setLoadingClient] = useState(true);

  useEffect(() => {
    setLoadingClient(false);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");

    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    setIsDesktop(mq.matches);
    mq.addEventListener("change", handler);

    return () => mq.removeEventListener("change", handler);
  }, []);

  // useEffect(() => {
  //   if (loadingClient) return;
  //   if (!isDesktop) return;
  //   if (isDesktop && children.length > 1) {
  //     nextSection();
  //   }
  // }, [isDesktop, children.length, loadingClient]);

  // useEffect(() => {
  //   if (loadingClient) return;
  //   if (!isDesktop) return;
  //   if (activeIndex < 1) {
  //     nextSection();
  //   }
  // }, [activeIndex]);

  return { isDesktop, loadingClient };
}
