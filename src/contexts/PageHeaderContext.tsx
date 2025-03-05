import { ReactNode, createContext, useState } from 'react';

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

export const PageHeaderContext = createContext<PageHeaderContextType | null>(
  null,
);

interface PageHeaderProviderProps {
  children: ReactNode;
}

export const PageHeaderProvider = ({ children }: PageHeaderProviderProps) => {
  const [title, setTitle] = useState<string>('');
  const [actionButton, setActionButton] = useState<ActionButton | null>(null);

  return (
    <PageHeaderContext.Provider
      value={{ title, setTitle, actionButton, setActionButton }}
    >
      {children}
    </PageHeaderContext.Provider>
  );
};
