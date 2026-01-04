interface NavigationButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction: "next" | "back";
  onClick: () => void;
  isDarkMode?: boolean;
}

const NavigationButton = ({
  direction,
  onClick,
  disabled = false,
  isDarkMode = false,
  ...props
}: NavigationButtonProps & { disabled?: boolean }) => (
  <button
    {...props}
    onClick={onClick}
    disabled={disabled}
    className={`size-12 rounded-full text-xs font-medium cursor-pointer duration-500 ease-out relative z-50 transition-all ${
      disabled
        ? "opacity-0 pointer-events-none" : `hover:text-black hover:blur-none ${isDarkMode ? "hover:bg-neutral-950 bg-neutral-950 !text-white"
              : "hover:bg-white bg-white text-black"
          }  animate-pulse hover:animate-none hover:scale-110`
    }`}
  >
    {direction === "next" ? "Next" : "Back"}
  </button>
);

export default NavigationButton;
