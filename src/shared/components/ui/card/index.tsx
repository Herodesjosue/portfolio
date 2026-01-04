import { CardProps } from "./types";

const Card = ({
  title = "Branding & Concept",
  subtitle = "Designed for",
  imageClassName = "flex flex-col h-96 rounded-[.9375rem] bg-secondary-200",
  leftLabel = "Carbon",
  rightLabel = "2025",
  className = "h-full flex flex-col w-lg gap-5",
}: CardProps) => {
    
  return (
    <div className={className}>
      <h1 className="text-5xl font-extralight">{title}</h1>
      <h2 className="text-3xl text-secondary-100 font-light">{subtitle}</h2>

      <div className="flex flex-col gap-6">
        <div className={imageClassName}></div>
        <div className="font-light flex justify-between items-center">
          <span>{leftLabel}</span>
          <span>{rightLabel}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
