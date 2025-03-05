import { Outlet } from 'react-router';

export default function AuthLayout() {
  return (
    <main className="min-h-screen bg-neutral-100 flex items-center justify-center px-3">
      <div className="w-full max-w-md bg-white p-5 rounded-3xl shadow">
        <Outlet />
      </div>
    </main>
  );
}
