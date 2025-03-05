import { useDropdown } from '../../hooks/useDropdown';
import { Dropdown } from '../Dropdown';
import { BellIcon, Bars3Icon, PlusIcon } from '@heroicons/react/24/outline';
import { usePageHeader } from '../../hooks/usePageHeader';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router';
import profileImage from '/profile.jpg';

interface HeaderProps {
  onCLickSidebar: () => void;
}

interface ActionButton {
  label: string;
  to: string;
}

interface PageHeaderContext {
  title: string;
  actionButton: ActionButton | null;
}

interface AuthContext {
  logout: () => void;
}

export default function Header({ onCLickSidebar }: HeaderProps) {
  const noticeDropdown = useDropdown();
  const profileDropdown = useDropdown();
  const { title, actionButton } = usePageHeader() as PageHeaderContext;
  const { logout } = useAuth() as AuthContext;

  return (
    <header className="flex justify-between items-center px-5 h-20">
      <button
        type="button"
        className="w-10 h-10 md:hidden block"
        onClick={onCLickSidebar}
      >
        <Bars3Icon />
      </button>

      <h1 className="text-3xl font-bold hidden md:block">{title}</h1>

      {actionButton && (
        <Link
          to={actionButton.to}
          className="flex gap-1 bg-neutral-500 hover:bg-neutral-700 text-white px-2 py-1 rounded-xl text-sm font-medium transition mr-auto ml-4"
        >
          <PlusIcon className="w-5 h-5" />
          {actionButton.label}
        </Link>
      )}

      <div className="flex gap-1">
        <Dropdown
          isVisible={noticeDropdown.isVisible}
          toggleer={{
            button: (
              <div className="h-10 w-10 flex items-center justify-center border border-solid border-neutral-300 rounded-xl">
                <BellIcon className="w-5 h-5 text-neutral-700" />
              </div>
            ),
            toggleDropdown: noticeDropdown.toggleDropdown,
            setDropdownRef: noticeDropdown.setDropdownRef,
          }}
        >
          <Link
            to="/trainings"
            className="block mb-2.5 text-center border-b border-solid border-neutral-300 pb-2.5"
          >
            Добавлена тренировка!
          </Link>
          <Link
            to="/trainings"
            className="block mb-2.5 text-center border-b border-solid border-neutral-300 pb-2.5"
          >
            Добавлена тренировка!
          </Link>
          <Link to="/trainings" className="block text-center">
            Добавлена тренировка!
          </Link>
        </Dropdown>

        <Dropdown
          isVisible={profileDropdown.isVisible}
          toggleer={{
            button: (
              <div className="h-10 w-10 rounded-xl overflow-hidden">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            ),
            toggleDropdown: profileDropdown.toggleDropdown,
            setDropdownRef: profileDropdown.setDropdownRef,
          }}
        >
          <Link
            to="/profile"
            className="block mb-2.5 text-center border-b border-solid border-neutral-300 pb-2.5"
          >
            Профиль
          </Link>

          <button
            type="button"
            onClick={logout}
            className="block text-center text-red-700 w-full"
          >
            Выйти
          </button>
        </Dropdown>
      </div>
    </header>
  );
}
