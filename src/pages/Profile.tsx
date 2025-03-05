import axios from '../api/axios';
import { useEffect, useState } from 'react';
import { usePageHeader } from '../hooks/usePageHeader';
import { ApiError } from '../types/apiTypes';

interface ProfileData {
  fullName: string;
  email: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { setTitle } = usePageHeader();

  useEffect(() => {
    setTitle('Профиль');
    return () => setTitle('');
  }, [setTitle]);

  useEffect(() => {
    const controller = new AbortController();

    const getProfile = async () => {
      try {
        const { data } = await axios.get<ProfileData>('/auth_me', {
          signal: controller.signal,
        });

        setProfile(data);
      } catch (err) {
        if (!controller.signal.aborted) {
          const apiError = err as ApiError;
          setError(apiError.message || 'Ошибка при загрузке профиля');
        }
      } finally {
        setIsLoading(false);
      }
    };

    getProfile();
    return () => controller.abort();
  }, []);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!profile) {
    return <div>Данные профиля отсутствуют</div>;
  }

  return (
    <div className="bg-white p-5 rounded-3xl">
      <h2 className="font-semibold text-lg lg:text-2xl mb-4">
        {profile.fullName}
      </h2>

      <h3 className="mb-1">
        <span className="font-semibold">Email: </span>
        <span className="text-neutral-700">{profile.email}</span>
      </h3>
    </div>
  );
}
