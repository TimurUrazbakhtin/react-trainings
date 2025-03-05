import ItemList from './ItemList';
import { TrainingData } from '../../types/training';
interface ItemsListProps {
  items: TrainingData[];
  onDelete: (id: number) => void;
}

export default function ItemsList({ items, onDelete }: ItemsListProps) {
  return (
    <div className="flex flex-col gap-2.5">
      {items.map((item) => (
        <ItemList key={item.id} training={item} onDelete={onDelete} />
      ))}
    </div>
  );
}
