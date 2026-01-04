const Overlay: React.FC<{ isOpen: boolean; onClick: () => void }> = ({
  isOpen,
  onClick,
}) => (
  <div
    className={`fixed inset-0 bg-base-600/30 transition-opacity duration-300 z-40 ${
      isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
    }`}
    onClick={onClick}
    aria-hidden="true"
  />
);

export default Overlay;