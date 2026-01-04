import { useEffect, useRef } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { VerticalScrollCarouselProps } from "./types";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper } from "swiper/react";
import { Pagination, Scrollbar } from "swiper/modules";

const VerticalScrollCarousel = ({ isActive = false, trapSectionScroll = false, children, setActiveIndex }: VerticalScrollCarouselProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<SwiperInstance | null>(null);
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    if (!isActive) {
      isTransitioningRef.current = false;
    }
  }, [isActive]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const blockPageScroll = (event: WheelEvent) => {
      if (event.cancelable) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const requestSlide = (action: () => void) => {
      if (isTransitioningRef.current) return;
      isTransitioningRef.current = true;
      action();
    };

    const handleWheel = (event: WheelEvent) => {
      if (!isActive) return;

      const swiper = swiperRef.current;
      if (!swiper) return;

      const delta = event.deltaY;
      if (delta === 0) return;

      const scrollingDown = delta > 0;
      const canNext = !swiper.isEnd;
      const canPrev = !swiper.isBeginning;

      if(scrollingDown && canNext) {
        blockPageScroll(event);
        requestSlide(() => swiper.slideNext());
        return;
      }      

      if(!scrollingDown && canPrev) {
        blockPageScroll(event);
        requestSlide(() => swiper.slidePrev());
        return;
      }      
    };

    const handleGlobalWheel = (event: WheelEvent) => {
      if (!trapSectionScroll) return;      
      handleWheel(event);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isActive || !trapSectionScroll) return;

      const swiper = swiperRef.current;
      if (!swiper) return;

      const key = event.key;
      const down = key === "ArrowDown" || key === "PageDown" || key === " ";
      const up = key === "ArrowUp" || key === "PageUp";
      if (!down && !up) return;

      const canNext = !swiper.isEnd;
      const canPrev = !swiper.isBeginning;

      if (isTransitioningRef.current) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      if (down && canNext) {
        event.preventDefault();
        event.stopPropagation();
        isTransitioningRef.current = true;
        swiper.slideNext();
        return;
      }

      if (up && canPrev) {
        event.preventDefault();
        event.stopPropagation();
        isTransitioningRef.current = true;
        swiper.slidePrev();
        return;
      }     
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    if (trapSectionScroll) {
      window.addEventListener("wheel", handleGlobalWheel, { passive: false });
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      container.removeEventListener("wheel", handleWheel);
      if (trapSectionScroll) {
        window.removeEventListener("wheel", handleGlobalWheel);
        window.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [isActive, trapSectionScroll]);

  return (
    <div
      ref={containerRef}
      data-scrollable="true"
      data-scroll-axis="y"
      className="h-full"
    >
      <Swiper
        direction="vertical"
        slidesPerView={1}
        allowTouchMove
        scrollbar={{ hide: true }}
        modules={[Pagination, Scrollbar]}
        className="mySwiper h-screen"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setActiveIndex?.(swiper.activeIndex);
        }}
        onSlideChange={(swiper) => {
          setActiveIndex?.(swiper.activeIndex);
        }}
        onSlideChangeTransitionStart={() => {
          isTransitioningRef.current = true;
        }}
        onSlideChangeTransitionEnd={(swiper) => {
          setActiveIndex?.(swiper.activeIndex);
          isTransitioningRef.current = false;
        }}
      >
      {children}
      </Swiper>
    </div>
  );
};

export default VerticalScrollCarousel;
