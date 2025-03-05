import Chart from '../components/Chart/Chart';
import { useEffect } from 'react';
import { usePageHeader } from '../hooks/usePageHeader';

export default function Summary() {
  const { setTitle } = usePageHeader();

  useEffect(() => {
    setTitle('Сводка');
    return () => setTitle('');
  }, [setTitle]);

  return (
    <>
      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="text-lg font-medium mb-3.5">
          Количество человек на занятиях по дням
        </h2>

        <div className="max-w-3xl">
          <Chart />
        </div>
      </div>
    </>
  );
}
