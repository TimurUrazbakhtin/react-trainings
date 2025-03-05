import { useEffect, useState } from 'react';
import trainingsApi from '../api/trainings';
import ItemsList from '../components/ItemsList/ItemsList';
import { usePageHeader } from '../hooks/usePageHeader';
import { TrainingData } from '../types/training';
import { ApiError } from '../types/apiTypes';

export default function Trainings() {
  const [trainings, setTrainings] = useState<TrainingData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { setTitle, setActionButton } = usePageHeader();

  useEffect(() => {
    setTitle('Тренировки');
    setActionButton({ label: 'Добавить тренировку', to: '/trainings/edit' });

    return () => setActionButton(null);
  }, [setTitle, setActionButton]);

  useEffect(() => {
    const controller = new AbortController();

    const getTrainings = async () => {
      try {
        const data = await trainingsApi.getAllTrainings({
          signal: controller.signal,
        });
        setTrainings(data);
      } catch (err) {
        if (!controller.signal.aborted) {
          const apiError = err as ApiError;
          setError(apiError.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getTrainings();

    return () => controller.abort();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Вы уверены, что хотите удалить тренировку?')) return;

    try {
      await trainingsApi.deleteTraining(id);
      setTrainings((prev) => prev.filter((training) => training.id !== id));
    } catch (err) {
      alert('Ошибка при удалении тренировки.');
    }
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <>
      <ItemsList items={trainings} onDelete={handleDelete} />
    </>
  );
}
