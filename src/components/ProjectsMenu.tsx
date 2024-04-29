import * as React from "react";

import { cn } from "@/lib/utils";
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
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowDown, CheckIcon, Search } from "lucide-react";
import { Separator } from "./ui/separator";
import { useUserTeams } from "@/hooks/queries/teamsQueries/queries";
import { UiContext } from "@/context/ui";
import { Link } from "react-router-dom";

export function ProjectsMenu() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
 

  const { data } = useUserTeams();
  const { currentTeam, setCurrentTeam } = React.useContext(UiContext);

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={(open) => setOpen(open)}>
        <div className="flex gap-2 items-center justify-center ">
          <Label className="text-center text-base">{currentTeam.nombre}</Label>
          <PopoverTrigger asChild>
            <Button variant={"outline"} className="p-1 m-1">
              <ArrowDown size={"20px"} />
            </Button>
          </PopoverTrigger>
        </div>

        <PopoverContent className="w-64">
          <div className="grid gap-3 ">
            <div className="flex items-center justify-center gap-3">
              <Search size={"20"} />
              <Input
                type="search"
                placeholder="Search for a team "
                className="border-hidden "
              />
            </div>
            <Separator />

            <div className="grid gap-2">
              <p className="text-neutral-500 text-sm">Teams</p>
              {data?.map((t) => (
                <Link to={`/${location.pathname.split("/")[1]}/${t.id}`}>
                  <div
                    onClick={() => {
                      const teamData = JSON.stringify(t);
                      localStorage.setItem("currentTeam", teamData);
                      setCurrentTeam({
                        id: t.id || "",
                        nombre: t.nombre,
                        ownerId: t.ownerId,
                        createdAt: t.createdAt || new Date(),
                      });
                      setOpen(!open);
                    }}
                    key={t.id}
                    className=" hover:bg-accent flex  justify-between items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  >
                    <p className="">{t.nombre}</p>
                    {currentTeam.id === t.id && <CheckIcon size={19} />}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" defaultValue="shadcn@example.com" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" defaultValue="@shadcn" />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  );
}
