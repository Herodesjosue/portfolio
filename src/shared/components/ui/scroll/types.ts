export interface SectionScrollerProps {
  children: React.ReactNode[];
}

export interface ReactElementProps {
  isActive: boolean;
  isExiting: boolean;
  onExitAnimationComplete?: () => void;
}
