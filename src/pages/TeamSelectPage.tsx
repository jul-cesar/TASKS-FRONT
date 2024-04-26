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

export function SelectTeam() {
  const { data } = useUserTeams();
  const { currentUser } = useContext(Auth);
  const { setCurrentTeam } = useContext(UiContext);
  const navigate = useNavigate();

  return (
    <section className="flex flex-col justify-center items-center space-y-10 p-4 my-auto ">
      <h1 className="font-bold text-3xl">Select a team</h1>
      <Command className="rounded-lg border shadow-md w-4/5">
        <CommandInput placeholder="Search a team " />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Your teams">
            {data?.map((t) => (
              <div
                className="cursor-pointer"
                onClick={() => {
                  setCurrentTeam({
                    id: t.id ?? "",
                    nombre: t.nombre,
                    ownerId: t.ownerId,
                    createdAt: t.createdAt ?? new Date(),
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
            <CommandItem>
              <PlusCircle className="mr-2 h-4 w-4" />
              <span>Create new team</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </section>
  );
}
