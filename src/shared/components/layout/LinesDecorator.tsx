import Ring from "@/shared/components/ui/ring";

interface CommonsProps {
  isDarkMode?: boolean;
}

const LinesDecorator = ({ isDarkMode = true }: CommonsProps) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        className={`${
          !isDarkMode ? "bg-dark/25" : "bg-white/25 "
        }  absolute h-[calc(100%-7rem)] left-0 bottom-0 w-px`}
      ></div>
      <div
        className={`${
          !isDarkMode ? "bg-dark/25" : "bg-white/25 "
        } absolute h-[37.5rem] bottom-20 w-px right-0`}
      ></div>
      <div className=" absolute -left-3 -bottom-2">
        <Ring />
      </div>
      <div
        className={`${
          !isDarkMode ? "bg-dark/25" : "bg-white/25 "
        } absolute w-full bottom-0 h-px`}
      ></div>
    </div>
  );
};


export default LinesDecorator;