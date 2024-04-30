import { Bolt, BrainCircuit, PlusCircle } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useUserTeams } from "@/hooks/queries/teamsQueries/queries";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Auth } from "@/context/auth";
import { UiContext } from "@/context/ui";
import CreateTeam from "@/components/forms/CreateTeam";
import Navbar from "@/components/Navbar";

export default function SelectTeam() {
  const { data } = useUserTeams();
  const { currentUser } = useContext(Auth);
  const { setCurrentTeam } = useContext(UiContext);
  const navigate = useNavigate();

  return (
    <section className="flex flex-col justify-center items-center p-4 h-full ">
      <Navbar />
      <Command className="rounded-lg border shadow-md sm:w-4/5 font-semibold leading-none tracking-tight sm:mt-16 mt-20 ">
        <CommandInput placeholder="Busca un team " />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Tus teams">
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
                  <BrainCircuit className="mr-2 h-4 w-4" />
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
            <CommandItem>
              <Bolt className="mr-2 h-4 w-4" />
              <span>Gestionar teams</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </section>
  );
}
