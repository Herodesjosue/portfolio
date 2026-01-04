"use client";
import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ReactElementProps, SectionScrollerProps } from "./types";
import useSectionNavigation from "./hooks/useSectionNavigation";
import { useSectionStore } from "@/shared/store/useSectionStore";
import Header from "../header";

type MinimalSwiper = {
  isBeginning: boolean;
  isEnd: boolean;
  animating?: boolean;
  params?: { direction?: "horizontal" | "vertical" };
  slideNext: () => void;
  slidePrev: () => void;
};

const SectionScroller: React.FC<SectionScrollerProps> = ({ children }) => {
  // Active section state
  const [activeIndex, setActiveIndex] = useState(0);

  // Animation related states
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [exitingIndex, setExitingIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Refs
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  const sectionElements = React.useMemo(
    () =>
      React.Children.toArray(
        children
      ) as React.ReactElement<ReactElementProps>[],
    [children]
  );
  const sectionCount = sectionElements.length;

  const setSectionData = useSectionStore((state) => state.setSectionData);

  const { isDesktop, loadingClient } = useSectionNavigation({
    activeIndex,
    children: sectionElements,
    nextSection,
    prevSection,
  });

  useEffect(() => {
    if (!isDesktop) return;

    const handleWheel = (e: WheelEvent) => {
      if (isAnimating) return;

      const activeSectionContainer = sectionsRef.current[activeIndex];
      if (!activeSectionContainer) return;

      const scrollableChild = activeSectionContainer.querySelector<HTMLElement>('[data-scrollable="true"], [data-scrollable=true]');

      const candidate =
        scrollableChild ||
        Array.from(
          activeSectionContainer.querySelectorAll<HTMLElement>("*")
        ).find((el) => {
          const style = window.getComputedStyle(el);
          const overflowY = style.overflowY;
          const overflowX = style.overflowX;
          const hasVertical =
            (overflowY === "auto" || overflowY === "scroll") &&
            el.scrollHeight > el.clientHeight + 2;
          const hasHorizontal =
            (overflowX === "auto" || overflowX === "scroll") &&
            el.scrollWidth > el.clientWidth + 2;
          return hasVertical || hasHorizontal;
        });

      if (candidate) {
        const style = window.getComputedStyle(candidate);
        const overflowY = style.overflowY;
        const overflowX = style.overflowX;
        const axisAttr = candidate.dataset.scrollAxis;

        const canScrollY = axisAttr !== "x" && (overflowY === "auto" || overflowY === "scroll") && candidate.scrollHeight > candidate.clientHeight + 2;
        const canScrollX = axisAttr !== "y" && (overflowX === "auto" || overflowX === "scroll") && candidate.scrollWidth > candidate.clientWidth + 2;

        const axis: "x" | "y" | null = (() => {
          if (axisAttr === "x") return canScrollX ? "x" : null;
          if (axisAttr === "y") return canScrollY ? "y" : null;
          if (canScrollY) return "y";
          if (canScrollX) return "x";
          return null;
        })();

        // Fallback for "scrollable" containers that don't use native overflow (e.g., vertical Swiper)
        // Find an element with the .swiper class and use its instance to determine the boundaries
        const swiperEl = (candidate.matches(".swiper") ? candidate : candidate.querySelector<HTMLElement>(".swiper")) || null;
        const swiper = (swiperEl && (swiperEl as unknown as { swiper?: MinimalSwiper }).swiper) || null;

        if (axis === "y") {
          const { scrollTop, scrollHeight, clientHeight } = candidate;
          const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
          const isAtTop = scrollTop <= 1;

          if (e.deltaY > 0 && !isAtBottom) return;
          if (e.deltaY < 0 && !isAtTop) return;
        } else if (!axis && swiper && swiper.params?.direction === "vertical") {
          const atBeginning = !!swiper.isBeginning;
          const atEnd = !!swiper.isEnd;
          const dy = e.deltaY;

            // If the carousel can consume the scroll, block and navigate
          if (dy > 0 && !atEnd) {
            if (e.cancelable) {
              e.preventDefault();
              e.stopPropagation();
            }
            if (!swiper.animating) swiper.slideNext();
            return;
          }
          if (dy < 0 && !atBeginning) {
            if (e.cancelable) {
              e.preventDefault();
              e.stopPropagation();
            }
            if (!swiper.animating) swiper.slidePrev();
            return;
          }
        } else if (axis === "x") {
          const horizontalScrollFactor = 1.5; // < 1 = más lento, > 1 = más rápido
          const delta =
            (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) *
            horizontalScrollFactor;

          if (delta !== 0) {
            const nextScrollLeft = candidate.scrollLeft + delta;
            const maxScroll = candidate.scrollWidth - candidate.clientWidth;
            const clampedScrollLeft = Math.min(
              Math.max(nextScrollLeft, 0),
              maxScroll
            );
            const reachedEnd = clampedScrollLeft >= maxScroll - 1;
            const reachedStart = clampedScrollLeft <= 1;

            if (e.cancelable) {
              e.preventDefault();
              e.stopPropagation();
            }

            candidate.scrollLeft = clampedScrollLeft;

            if ((delta > 0 && !reachedEnd) || (delta < 0 && !reachedStart)) {
              return;
            }
          } else {
            return;
          }
        }
      }

      // Extra fallback: if no candidate was detected or returned earlier,
      // try to capture a vertical Swiper in the entire active section
      if (activeSectionContainer) {
        const anySwiperEl =
          activeSectionContainer.querySelector<HTMLElement>(".swiper");
        const anySwiper =
          (anySwiperEl &&
            (anySwiperEl as unknown as { swiper?: MinimalSwiper }).swiper) ||
          null;
        if (anySwiper && anySwiper.params?.direction === "vertical") {
          const atBeginning = !!anySwiper.isBeginning;
          const atEnd = !!anySwiper.isEnd;
          const dy = e.deltaY;
          if (dy > 0 && !atEnd) {
            if (e.cancelable) {
              e.preventDefault();
              e.stopPropagation();
            }
            if (!anySwiper.animating) anySwiper.slideNext();
            return;
          }
          if (dy < 0 && !atBeginning) {
            if (e.cancelable) {
              e.preventDefault();
              e.stopPropagation();
            }
            if (!anySwiper.animating) anySwiper.slidePrev();
            return;
          }
        }
      }

      if (e.cancelable) {
        e.preventDefault();
        e.stopPropagation();
      }

      if (e.deltaY > 0) nextSection();
      else if (e.deltaY < 0) prevSection();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating) return;
      const activeSectionContainer = sectionsRef.current[activeIndex];
      if (!activeSectionContainer) return;

      // Interceptar navegación vertical si hay un Swiper vertical dentro del contenedor scrollable
      const scrollableChild = activeSectionContainer.querySelector<HTMLElement>(
        '[data-scrollable="true"], [data-scrollable=true]'
      );
      const candidate = scrollableChild || activeSectionContainer;
      const swiperEl =
        (candidate.matches(".swiper")
          ? candidate
          : candidate.querySelector<HTMLElement>(".swiper")) || null;
      const swiper =
        (swiperEl &&
          (swiperEl as unknown as { swiper?: MinimalSwiper }).swiper) ||
        null;

      const down =
        e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ";
      const up = e.key === "ArrowUp" || e.key === "PageUp";

      if (swiper && swiper.params?.direction === "vertical" && (down || up)) {
        const canNext = !swiper.isEnd;
        const canPrev = !swiper.isBeginning;
        if (down && canNext) {
          e.preventDefault();
          e.stopPropagation();
          if (!swiper.animating) swiper.slideNext();
          return;
        }
        if (up && canPrev) {
          e.preventDefault();
          e.stopPropagation();
          if (!swiper.animating) swiper.slidePrev();
          return;
        }
        // En bordes, dejamos que SectionScroller maneje el cambio de sección
      }

      // Fallback extra con teclado: buscar otro swiper vertical en la sección
      if (down || up) {
        const anySwiperEl =
          activeSectionContainer.querySelector<HTMLElement>(".swiper");
        const anySwiper =
          (anySwiperEl &&
            (anySwiperEl as unknown as { swiper?: MinimalSwiper }).swiper) ||
          null;
        if (anySwiper && anySwiper.params?.direction === "vertical") {
          const canNext = !anySwiper.isEnd;
          const canPrev = !anySwiper.isBeginning;
          if (down && canNext) {
            e.preventDefault();
            e.stopPropagation();
            if (!anySwiper.animating) anySwiper.slideNext();
            return;
          }
          if (up && canPrev) {
            e.preventDefault();
            e.stopPropagation();
            if (!anySwiper.animating) anySwiper.slidePrev();
            return;
          }
        }
      }

      if (e.key === "ArrowDown") nextSection();
      else if (e.key === "ArrowUp") prevSection();
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };

  }, [isAnimating, activeIndex, sectionCount, isDesktop]);

  useEffect(() => {

    if (loadingClient) return;
    setSectionData(activeIndex, sectionCount);

  }, [activeIndex, sectionCount, loadingClient, setSectionData]);

  const slideAnimation = (from: number, to: number) => {
    const fromSection = sectionsRef.current[from];
    const toSection = sectionsRef.current[to];

    if (fromSection && toSection) {
      gsap.set(toSection, {
        y: to > from ? "100%" : "-100%",
        zIndex: 11,
        opacity: 1,
      });

      gsap.set(fromSection, { zIndex: 10, opacity: 1 });

      const tl = gsap.timeline({

        onComplete: () => {
          gsap.set(fromSection, { opacity: 0, zIndex: 0, y: 0 });
          setActiveIndex(to);
          setIsAnimating(false);
          setExitingIndex(null);
          setNextIndex(null);
        },
        
      });

      tl.to(
        fromSection,
        {
          y: to > from ? "-100%" : "100%",
          duration: 0.7,
          ease: "power2.inOut",
        },
        0
      ).to(
        toSection,
        {
          y: "0%",
          duration: 0.7,
          ease: "power2.inOut",
        },
        0
      );

    } else {
      setIsAnimating(false);
      setExitingIndex(null);
      setNextIndex(null);
    }
  };

  const animateSection = (from: number, to: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setNextIndex(to);
    setExitingIndex(from);
  };

  const handleExitComplete = () => {
    if (exitingIndex !== null && nextIndex !== null) {
      slideAnimation(exitingIndex, nextIndex);
    } else {
      setIsAnimating(false);
      setExitingIndex(null);
      setNextIndex(null);
    }
  };

  function nextSection() {
    if (activeIndex < sectionCount - 1) {
      animateSection(activeIndex, activeIndex + 1);
    }
  }

  function prevSection() {
    if (activeIndex > 0) {
      animateSection(activeIndex, activeIndex - 1);
    }
  }

  if (loadingClient) return <></>;

  return (
    <div className={ isDesktop ? "h-screen overflow-hidden relative" : "relative overflow-hidden"}>
      {(activeIndex === 1 || !isDesktop) && <Header />}

      {sectionElements.map((child, i) => {
        const isExiting = exitingIndex === i;
        return (
          <div
            key={child.key ?? i}
            ref={(el) => { sectionsRef.current[i] = el }}
            className={isDesktop ? "absolute w-full h-full top-0 left-0" : "w-full"}
            style={
              isDesktop
                ? {
                    opacity: i === activeIndex || isExiting ? 1 : 0,
                    zIndex: i === activeIndex ? 11 : isExiting ? 10 : 0,
                    pointerEvents: i === activeIndex ? "auto" : "none",
                    background: "inherit",
                  }
                : {
                    position: "relative",
                    height: "auto",
                    opacity: 1,
                    zIndex: 10,
                    pointerEvents: "auto",
                  }
            }
          >
            {React.cloneElement(child, {
              isActive: i === activeIndex && !isExiting,
              isExiting,
              onExitAnimationComplete: isExiting ? handleExitComplete : undefined,
            })}
          </div>
        );
      })}
    </div>
  );
};

export default SectionScroller;
