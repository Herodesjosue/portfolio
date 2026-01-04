import Image from "next/image";
import { useMemo, type CSSProperties } from "react";
import { CarouselProps } from "./types";

const Carousel = ({ data, direction = "forward", durationMs = 25000 }: CarouselProps) => {
  const shouldAnimate = data.length > 1;
  
  const slides = useMemo(() => {
    if (!shouldAnimate) {
      return data;
    }
    return Array.from({ length: 4 }, () => data).flat();
  }, [data, shouldAnimate]);

  if (data.length === 0) {
    return null;
  }

  const trackClassName = shouldAnimate
    ? `carousel-track ${direction === "backward" ? "carousel-track--reverse" : "carousel-track--forward"}`
    : "carousel-track";

  const trackStyle = shouldAnimate
    ? ({
        "--carousel-duration": `${durationMs}ms`,
      } as CSSProperties)
    : undefined;

  return (
    <div className="my-4 w-full overflow-hidden">
      <div className="flex w-full items-center justify-start">
        <div className={trackClassName} style={trackStyle}>
          {slides.map((src, index) => (
            
            <div key={`${src}-${index}`} className="!w-[23.3125rem]">
              <div className="flex h-[8.25rem] w-[22.75rem] items-center justify-center rounded-[100px] border border-white/50">
                <Image src={src} alt="" className="max-w-[11.25rem]" height={173} width={373} />
              </div>
            </div>

          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
