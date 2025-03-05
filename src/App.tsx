import { BrowserRouter, Routes, Route } from 'react-router';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import AuthLayout from './components/AuthLayout/AuthLayout';
import { PrivateRoute } from './components/PrivateRoute';

import Index from './pages/Index';
import Summary from './pages/Summary';
import Trainings from './pages/Trainings';
import Training from './pages/Training';
import TrainingForm from './pages/TrainingForm';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { MenuItem } from './types/menu';

import { ChartBarIcon, TrophyIcon } from '@heroicons/react/24/outline';

const menu: MenuItem[] = [
  {
    title: 'Сводка',
    to: '/summary',
    icon: ChartBarIcon,
  },
  {
    title: 'Тренировки',
    to: '/trainings',
    icon: TrophyIcon,
  },
];

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route element={<Layout menu={menu} />}>
          <Route path="/" element={<Index />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/trainings" element={<Trainings />} />
          <Route path="/trainings/:trainingId" element={<Training />} />
          <Route
            path="/trainings/edit/:trainingId?"
            element={<TrainingForm />}
          />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
