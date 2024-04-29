import { Calendar, PlusCircle } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useUserTeams } from "@/hooks/queries/teamsQueries/queries";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Auth } from "@/context/auth";
import { UiContext } from "@/context/ui";
import CreateTeam from "@/components/forms/CreateTeam";

export function SelectTeam() {
  const { data } = useUserTeams();
  const { currentUser } = useContext(Auth);
  const { setCurrentTeam } = useContext(UiContext);
  const navigate = useNavigate();

  return (
    <section className="flex flex-col justify-center items-center p-4 h-full ">
      <Command className="rounded-lg border shadow-md w-4/5  ">
        <CommandInput placeholder="Busca un team " />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Your teams">
            {data?.map((t) => (
              <div
                className="cursor-pointer hover:bg-accent"
                onClick={() => {
                  const teamData = JSON.stringify(t);
                  localStorage.setItem("currentTeam", teamData);
                  setCurrentTeam({
                    id: t.id || "",
                    nombre: t.nombre,
                    ownerId: t.ownerId,
                    createdAt: t.createdAt || new Date(),
                  });
                  navigate(`/${currentUser.nombre}/${t.id}`);
                }}
              >
                <CommandItem>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{t.nombre}</span>
                </CommandItem>
              </div>
            ))}
          </CommandGroup>

          <CommandSeparator />
          <CommandGroup heading="Configuraciones">
            <CreateTeam>
              <CommandItem>
                <PlusCircle className="mr-2 h-4 w-4" />
                <span>Crear team</span>
              </CommandItem>
            </CreateTeam>
          </CommandGroup>
        </CommandList>
      </Command>
    </section>
  );
}
