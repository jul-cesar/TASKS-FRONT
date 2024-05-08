import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowDown, CheckIcon, Search } from "lucide-react";
import { Separator } from "../ui/separator";
import { useUserTeams } from "@/hooks/queries/teamsQueries/queries";
import { UiContext } from "@/context/ui";
import { Link } from "react-router-dom";
import { Team } from "@/models/teams";
import { Auth } from "@/context/auth";
import LoadingSmall from "../loaders/LoadingSmall";

export default function ProjectsMenu() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { currentTeam, setCurrentTeam } = React.useContext(UiContext);

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={(open) => setOpen(open)}>
        <div className="flex gap-2 items-center justify-center ">
          <Label className="text-center text-base">{currentTeam.name}</Label>
          <PopoverTrigger asChild>
            <Button variant={"outline"} className="p-1 m-1">
              <ArrowDown size={"20px"} />
            </Button>
          </PopoverTrigger>
        </div>

        <PopoverContent className="w-64">
          <ProfileForm
            setCurrentTeam={setCurrentTeam}
            setOpen={setOpen}
            currentTeam={currentTeam}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <div className="flex gap-1 items-center justify-center">
        <Label className="text-center text-base">{currentTeam.name}</Label>
        <DrawerTrigger>
          <Button variant={"outline"} className="p-1 m-1">
            <ArrowDown size={"20px"} />
          </Button>{" "}
        </DrawerTrigger>
      </div>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Cambia de team con un click!</DrawerTitle>
        </DrawerHeader>
        <ProfileForm
          setCurrentTeam={setCurrentTeam}
          setOpen={setOpen}
          currentTeam={currentTeam}
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({
  setCurrentTeam,
  currentTeam,
  setOpen,
}: {
  setCurrentTeam: React.Dispatch<
    React.SetStateAction<{
      id: string;
      name: string;
      ownerId: string;
      createdAt: Date;
    }>
  >;
  currentTeam: Team;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { currentUser } = React.useContext(Auth);
  const { data, isLoading } = useUserTeams();

  return (
    <div className="grid gap-3 p-4 sm:p-4 lg:p-0 ">
      <div className="flex items-center justify-center gap-3">
        <Search size={"20"} />
        <Input
          type="search"
          placeholder="Busca un team"
          className="border-hidden "
        />
      </div>
      <Separator />

      {!isLoading ? (
        <ul className="grid gap-2 max-h-[500px] sm:max-h-[300px] overflow-y-auto ">
          <p className="text-neutral-500 text-sm">Teams</p>
          {data?.map((t) => (
            <Link to={`/${currentUser.nombre}/${t.id}`}>
              <div
                onClick={() => {
                  const teamData = JSON.stringify(t);
                  localStorage.setItem("currentTeamInfo", teamData);
                  setCurrentTeam({
                    id: t.id || "",
                    name: t.name,
                    ownerId: t.ownerId,
                    createdAt: t.createdAt || new Date(),
                  });
                  setOpen(!open);
                }}
                key={t.id}
                className=" hover:bg-accent flex  justify-between items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              >
                <li className="">{t.name}</li>
                {currentTeam.id === t.id && <CheckIcon size={19} />}
              </div>
            </Link>
          ))}
        </ul>
      ) : (
        <div className="flex items-center justify-center h-full">
          <LoadingSmall />
        </div>
      )}
    </div>
  );
}
