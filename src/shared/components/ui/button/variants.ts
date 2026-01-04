import { cva } from "class-variance-authority";

// TODO: Check hover states

export const variantClass = cva(
  "transition-colors flex items-center whitespace-nowrap  justify-center gap-2  text-white  cursor-pointer rounded-[3.125rem]",
  {
    variants: {
      variant: {
        primary: "bg-primary-100 uppercase rounded-[6.25rem] text-2xl text-dark flex justify-between hover:bg-primary-900 hover:text-white  items-center pr-4 pl-9 py-3 max-w-sm ",
        secondary: "",
        success: "",
        outline: "",
        transparent: "",
      },
      size: {
        sm: "",
        md: "",
        lg: " py-3",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  }
);
