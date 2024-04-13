import React, {
  createContext,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type UiContextType = {
  openSidebar: boolean;
  setOpenSidebar: React.Dispatch<SetStateAction<boolean>>;
  setTareasLength: React.Dispatch<
    SetStateAction<{ myTasks: number; asignedTasks: number }>
  >;
  tareasLength: { myTasks: number; asignedTasks: number };
};

const UiContext = createContext<UiContextType>({
  openSidebar: false,
  setOpenSidebar: () => {},
  setTareasLength: () => {},
  tareasLength: { myTasks: 0, asignedTasks: 0 },
});

export const UiContextProvider = ({ children }: { children: ReactNode }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [tareasLength, setTareasLength] = useState({
    myTasks: 0,
    asignedTasks: 0,
  });
  return (
    <UiContext.Provider
      value={{ openSidebar, setOpenSidebar, tareasLength, setTareasLength }}
    >
      {children}
    </UiContext.Provider>
  );
};

export { UiContext };
