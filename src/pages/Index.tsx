import { useEffect } from 'react';
import { usePageHeader } from '../hooks/usePageHeader';

export default function Index() {
  const { setTitle } = usePageHeader();

  useEffect(() => {
    setTitle('Главная');
    return () => setTitle('');
  }, [setTitle]);

  return (
    <>
      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="text-lg font-medium mb-3.5">Руководство пользователя</h2>

        <div>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <span className="font-semibold">Просмотр списка тренировок</span>{' '}
              – отображается список всех доступных тренировок с их названием,
              продолжительностью, местом проведения и тренером.
            </li>
            <li>
              <span className="font-semibold">Добавление новой тренировки</span>{' '}
              – нажмите кнопку{' '}
              <span className="text-blue-600">"Добавить тренировку"</span>,
              заполните необходимые данные и сохраните.
            </li>
            <li>
              <span className="font-semibold">Редактирование тренировки</span> –
              выберите нужную тренировку, нажмите{' '}
              <span className="text-blue-600">"Редактировать"</span>, измените
              информацию и сохраните изменения.
            </li>
            <li>
              <span className="font-semibold">Удаление тренировки</span> –
              нажмите <span className="text-red-600">"Удалить"</span>, чтобы
              удалить тренировку из списка.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
