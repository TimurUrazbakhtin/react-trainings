import { Link } from 'react-router';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { MenuItem } from '../../types/menu';
import logoImage from '/logo.svg';

interface SidebarProps {
  menu: MenuItem[];
  isVisibleSidebar: boolean;
  onCLickSidebar: () => void;
}

export default function Sidebar({
  menu,
  isVisibleSidebar,
  onCLickSidebar,
}: SidebarProps) {
  return (
    <aside
      className={`${
        isVisibleSidebar ? 'left-0 no-doc-scroll' : '-left-full'
      } z-50 w-full md:w-60 fixed md:left-0 top-0 p-5 h-screen border-solid border-r border-neutral-300 overflow-y-auto bg-neutral-100 transition-all duration-300`}
    >
      <div>
        <Link to="/" className="flex items-center h-30 px-5 py-10 md:p-5">
          <img className="w-full h-full" src={logoImage} alt="" />
        </Link>

        <nav className="py-5 text-lg">
          <ul className="flex flex-col gap-1.5">
            {menu.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="flex gap-1.5 items-center p-5 rounded-xl overflow-hidden hover:bg-neutral-300"
                >
                  <item.icon className="w-5 h-5" />
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <button
        type="button"
        className="w-10 h-10 absolute top-5 right-5 md:hidden"
        onClick={onCLickSidebar}
      >
        <XMarkIcon />
      </button>
    </aside>
  );
}
