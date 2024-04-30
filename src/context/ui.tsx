import { Team } from "@/models/teams";
import React, {
  createContext,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type UiContextType = {
  openSidebar: boolean;
  setOpenSidebar: React.Dispatch<SetStateAction<boolean>>;
  setTareasLength: React.Dispatch<
    SetStateAction<{ myTasks: number; asignedTasks: number }>
  >;
  tareasLength: { myTasks: number; asignedTasks: number };
  currentTeam: Team;
  setCurrentTeam: React.Dispatch<
    SetStateAction<{
      id: string;
      nombre: string;
      ownerId: string;
      createdAt: Date;
    }>
  >;
};

const UiContext = createContext<UiContextType>({
  openSidebar: false,
  setOpenSidebar: () => {},
  setTareasLength: () => {},
  tareasLength: { myTasks: 0, asignedTasks: 0 },
  currentTeam: {
    id: "",
    nombre: "",
    ownerId: "",
    createdAt: new Date(),
  },
  setCurrentTeam: () => {},
});

export const UiContextProvider = ({ children }: { children: ReactNode }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [currentTeam, setCurrentTeam] = useState({
    id: "",
    nombre: "",
    ownerId: "",
    createdAt: new Date(),
  });
  const [tareasLength, setTareasLength] = useState({
    myTasks: 0,
    asignedTasks: 0,
  });

  useEffect(() => {
    localStorage.removeItem("currentTeam");
    const storedTeam = localStorage.getItem("currentTeamInfo");
    if (storedTeam) {
      const teamData = JSON.parse(storedTeam);
      setCurrentTeam(teamData);
    }
  }, []);

  return (
    <UiContext.Provider
      value={{
        openSidebar,
        setOpenSidebar,
        tareasLength,
        setTareasLength,
        currentTeam,
        setCurrentTeam,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};

export { UiContext };
