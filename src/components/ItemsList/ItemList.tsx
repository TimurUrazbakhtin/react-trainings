import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router';
import { useDropdown } from '../../hooks/useDropdown';
import { Dropdown } from '../Dropdown';
import { TrainingData } from '../../types/training';

interface ItemListProps {
  training: TrainingData;
  onDelete: (id: number) => void;
}

export default function ItemList({ training, onDelete }: ItemListProps) {
  const { id, name, duration, location, trainer } = training;
  const trainingDropdown = useDropdown();

  return (
    <div className="md:flex bg-white p-5 rounded-3xl relative">
      <div className="md:max-w-80 w-full pr-7 md:border-r border-neutral-200 mb-6 md:mb-0">
        <div className="text-neutral-400">Тренировка</div>

        <Link to={`/trainings/${training.id}`}>
          <h2 className="font-semibold">{name}</h2>
        </Link>
      </div>

      <div className="flex 2xl:flex-nowrap flex-wrap gap-5 w-full md:px-7">
        <div className="2xl:w-1/3 w-full">
          <div className="text-neutral-400">Продолжительность</div>

          <h3 className="font-semibold">{duration}</h3>
        </div>

        <div className="2xl:w-1/3 w-full">
          <div className="text-neutral-400">Место проведения</div>

          <h3 className="font-semibold">{location}</h3>
        </div>

        <div className="2xl:w-1/3 w-full">
          <div className="text-neutral-400">Тренер</div>

          <h3 className="font-semibold">{trainer}</h3>
        </div>
      </div>
      <div className="absolute top-5 right-5 md:static">
        <Dropdown
          isVisible={trainingDropdown.isVisible}
          toggleer={{
            button: <EllipsisVerticalIcon className="w-6 min-w-6" />,
            toggleDropdown: trainingDropdown.toggleDropdown,
            setDropdownRef: trainingDropdown.setDropdownRef,
          }}
        >
          <Link
            to={`/trainings/${id}`}
            className="block mb-2.5 text-center border-b border-solid border-neutral-300 pb-2.5"
          >
            Подробнее
          </Link>
          <Link
            to={`/trainings/edit/${id}`}
            className="block mb-2.5 text-center border-b border-solid border-neutral-300 pb-2.5"
          >
            Редактировать
          </Link>
          <button
            onClick={() => onDelete(id)}
            className="block text-center text-red-700 w-full"
          >
            Удалить
          </button>
        </Dropdown>
      </div>
    </div>
  );
}
