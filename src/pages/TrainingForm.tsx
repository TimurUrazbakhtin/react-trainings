import { useParams, useNavigate } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import trainingsApi from '../api/trainings';
import { usePageHeader } from '../hooks/usePageHeader';
import { TrainingData } from '../types/training';
import { ApiError } from '../types/apiTypes';

export default function TrainingForm() {
  const { setTitle } = usePageHeader();
  const { trainingId } = useParams<{ trainingId?: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const nameRef = useRef<HTMLInputElement>(null);
  const durationRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const trainerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTitle(`${trainingId ? 'Редактирование' : 'Добавление'} тренировки`);
    return () => setTitle('');
  }, [setTitle, trainingId]);

  useEffect(() => {
    if (!trainingId) return;

    const controller = new AbortController();

    const loadTraining = async () => {
      try {
        const data = await trainingsApi.getTraining(parseInt(trainingId, 10), {
          signal: controller.signal,
        });

        if (nameRef.current) nameRef.current.value = data.name;
        if (durationRef.current)
          durationRef.current.value = data.duration.toString();
        if (locationRef.current) locationRef.current.value = data.location;
        if (trainerRef.current) trainerRef.current.value = data.trainer;
      } catch (err) {
        if (!controller.signal.aborted) {
          setError('Ошибка загрузки данных тренировки');
        }
      }
    };

    loadTraining();
    return () => controller.abort();
  }, [trainingId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const formData: Omit<TrainingData, 'id'> = {
        name: nameRef.current?.value || '',
        duration: parseInt(durationRef.current?.value || '0'),
        location: locationRef.current?.value || '',
        trainer: trainerRef.current?.value || '',
      };

      if (!formData.name || !formData.location || !formData.trainer) {
        throw new Error('Заполните все обязательные поля');
      }

      if (trainingId) {
        await trainingsApi.updateTraining(parseInt(trainingId, 10), formData);
      } else {
        await trainingsApi.createTraining(formData);
      }
      navigate('/trainings');
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Ошибка сохранения тренировки');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 rounded-3xl">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl">
          {error}
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="name" className="block mb-1 font-bold">
          Название
        </label>
        <input
          type="text"
          id="name"
          ref={nameRef}
          className="block mb-4 border border-solid focus-visible:border-neutral-500 outline-none px-4 py-2 w-full rounded-xl"
          placeholder="Название"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="duration" className="block mb-1 font-bold">
          Продолжительность (минут)
        </label>
        <input
          type="number"
          id="duration"
          ref={durationRef}
          className="block mb-4 border border-solid focus-visible:border-neutral-500 outline-none px-4 py-2 w-full rounded-xl"
          placeholder="Продолжительность"
          min="1"
          defaultValue="60"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="location" className="block mb-1 font-bold">
          Место проведения
        </label>
        <input
          type="text"
          id="location"
          ref={locationRef}
          className="block mb-4 border border-solid focus-visible:border-neutral-500 outline-none px-4 py-2 w-full rounded-xl"
          placeholder="Место проведения"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="trainer" className="block mb-1 font-bold">
          Тренер
        </label>
        <input
          type="text"
          id="trainer"
          ref={trainerRef}
          className="block mb-4 border border-solid focus-visible:border-neutral-500 outline-none px-4 py-2 w-full rounded-xl"
          placeholder="Тренер"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-neutral-500 hover:bg-neutral-700 text-white px-4 py-2 w-full rounded-xl transition disabled:opacity-50"
      >
        {isLoading ? 'Сохранение...' : trainingId ? 'Сохранить' : 'Добавить'}
      </button>
    </form>
  );
}
