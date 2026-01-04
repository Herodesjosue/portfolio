
export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  variant?: "primary" | "outline" | "transparent" | "success" | "secondary";
  size?: "sm" | "md" | "lg";
  iconPosition?: "left" | "right";
  iconSize?: number;
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
}
