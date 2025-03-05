import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { PageHeaderProvider } from '../../contexts/PageHeaderContext';
import { Outlet } from 'react-router';
import { MenuItem } from '../../types/menu';

interface LayoutProps {
  menu: MenuItem[];
}

export default function Layout({ menu }: LayoutProps) {
  const [isVisibleSidebar, setIsVisibleSidebar] = useState<boolean>(false);

  const showSidebar = () => {
    setIsVisibleSidebar(!isVisibleSidebar);
  };

  return (
    <PageHeaderProvider>
      <Sidebar
        menu={menu}
        isVisibleSidebar={isVisibleSidebar}
        onCLickSidebar={showSidebar}
      />
      <div className="md:ml-60 min-h-screen md:p-5 bg-neutral-100">
        <Header onCLickSidebar={showSidebar} />
        <main className="p-5 h-full">
          <Outlet />
        </main>
      </div>
    </PageHeaderProvider>
  );
}
