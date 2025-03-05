import { useState, useEffect } from 'react';

interface DropdownControls {
  isVisible: boolean;
  toggleDropdown: () => void;
  closeDropdown: () => void;
  setDropdownRef: (ref: HTMLElement | null) => void;
}

export const useDropdown = (): DropdownControls => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [dropdownRef, setDropdownRef] = useState<HTMLElement | null>(null);

  const toggleDropdown = () => setIsVisible(!isVisible);
  const closeDropdown = () => setIsVisible(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef && !dropdownRef.contains(e.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [dropdownRef]);

  return { isVisible, toggleDropdown, closeDropdown, setDropdownRef };
};
