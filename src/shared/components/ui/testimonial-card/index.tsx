import React from "react";
import Link from "next/link";
import Image from "next/image";
import { TestimonialCardProps } from "./types";
import QuotationIcon from "../icon/quota";

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  timeAgo = "A year ago",
  text,
  projectHref,
  projectLabel = "View Project",
  imageSrc = "/images/intenxt.png",
  imageAlt = "",
  className = "",
  avatar,
}) => {
  return (
    <div
      className={`flex justify-between ${className} border-b border-b-white/25 py-6 `}
    >
      <div className="flex gap-4 items-center">
        <div className="h-16 w-16 rounded-full">
          <Image
            src={avatar}
            alt={name}
            height={64}
            width={64}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-normal">{name}</span>
          <span className="text-xl text-white/25 font-normal">{timeAgo}</span>
        </div>
      </div>

      <div className="max-w-lg relative">        
        <div className="absolute -left-8 -top-2">
          <QuotationIcon />
        </div>

        <p className="text-lg font-normal">{text}</p>
      </div>


      <div className="flex flex-col items-end gap-4">
        {projectHref ? (
          <Link
            href={projectHref}
            className="text-xl font-normal text-white/50 underline"
          >
            {projectLabel}
          </Link>
        ) : (
          <span className="text-xl font-normal text-white/50">
            {projectLabel}
          </span>
        )}

        <Image src={imageSrc} alt={imageAlt} height={34} width={129} />
      </div>
    </div>
  );
};

export default TestimonialCard;
