import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import trainingsApi from '../api/trainings';
import { usePageHeader } from '../hooks/usePageHeader';
import { TrainingData } from '../types/training';
import { ApiError } from '../types/apiTypes';

export default function Training() {
  const { setTitle } = usePageHeader();
  const [training, setTraining] = useState<TrainingData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { trainingId } = useParams<{ trainingId?: string }>();

  useEffect(() => {
    setTitle('Тренировка');
    return () => setTitle('');
  }, [setTitle]);

  useEffect(() => {
    if (!trainingId) {
      setError('ID тренировки не указан');
      return;
    }

    const controller = new AbortController();

    const loadTraining = async () => {
      try {
        const data = await trainingsApi.getTraining(parseInt(trainingId, 10), {
          signal: controller.signal,
        });
        setTraining(data);
      } catch (err) {
        if (!controller.signal.aborted) {
          const apiError = err as ApiError;
          setError(apiError.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadTraining();

    return () => controller.abort();
  }, [trainingId]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!training) {
    return <div>Данные тренировки отсутствуют</div>;
  }

  return (
    <div className="bg-white p-5 rounded-3xl">
      <h2 className="font-semibold text-lg lg:text-2xl mb-4">
        {training.name}
      </h2>

      <h3 className="mb-1">
        <span className="font-semibold">Продолжительность: </span>
        <span className="text-neutral-700">{training.duration}</span>
      </h3>

      <h3 className="mb-1">
        <span className="font-semibold">Место проведения: </span>
        <span className="text-neutral-700">{training.location}</span>
      </h3>

      <h3 className="mb-1">
        <span className="font-semibold">Тренер: </span>
        <span className="text-neutral-700">{training.trainer}</span>
      </h3>
    </div>
  );
}
