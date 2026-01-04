export interface VerticalScrollCarouselProps {
  isActive?: boolean;
  children?: React.ReactNode;
  trapSectionScroll?: boolean;
  setActiveIndex?: (index: number) => void;
}