import { useEffect, useRef } from 'react';

interface Toggleer {
  button: React.ReactNode;
  toggleDropdown: () => void;
  setDropdownRef: (ref: HTMLElement | null) => void;
}

interface DropdownProps {
  isVisible: boolean;
  toggleer: Toggleer;
  children: React.ReactNode;
}

export const Dropdown = ({ isVisible, toggleer, children }: DropdownProps) => {
  const dropdownRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (dropdownRef.current) {
      toggleer.setDropdownRef(dropdownRef.current);
    }
  }, [toggleer.setDropdownRef]);

  return (
    <div className="relative" ref={toggleer.setDropdownRef}>
      <button
        type="button"
        onClick={toggleer.toggleDropdown}
        aria-expanded={isVisible}
      >
        {toggleer.button}
      </button>

      <div
        className={`origin-top-left absolute z-50 bg-white right-0 top-full border border-solid border-neutral-300 rounded-xl mt-1.5 min-w-60 p-2.5 transition-all duration-300 ${
          isVisible ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
};
