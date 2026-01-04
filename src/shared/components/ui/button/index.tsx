"use client";
import { cn } from "@/shared/utils/cn";
import { ButtonProps } from "./types";
import { variantClass } from "./variants";
import { useEffect, useState } from "react";

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
  disabled,
  variant = "primary",
  size = "lg",
  type = "button",
  onMouseOver,
  onMouseLeave,
}) => {
  const [isClient, setIsClient] = useState(false);
  const variantClasses = variantClass({ variant, size });
  const disabledClasses = "cursor-not-allowed !bg-base-500";
  const mergeClassName = cn(variantClasses, {[disabledClasses]: disabled }, className);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <button
      type={type}
      onClick={onClick}
      className={mergeClassName}
      disabled={disabled}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      onFocus={onMouseOver}
    >
      {children}
    </button>
  );
};

export default Button;
