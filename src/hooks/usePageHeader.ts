import { useContext } from 'react';
import { PageHeaderContext } from '../contexts/PageHeaderContext';

interface ActionButton {
  label: string;
  to: string;
}

interface PageHeaderContextType {
  title: string;
  setTitle: (title: string) => void;
  actionButton: ActionButton | null;
  setActionButton: (actionButton: ActionButton | null) => void;
}

export const usePageHeader = (): PageHeaderContextType => {
  const context = useContext(PageHeaderContext);

  if (!context) {
    throw new Error('usePageHeader must be used within a PageHeaderProvider');
  }

  return context;
};
