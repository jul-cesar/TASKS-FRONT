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
import { CheckIcon, Search, TargetIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import { useUserTeams } from "@/hooks/queries/teamsQueries/queries";

export function ProjectsMenu() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { data } = useUserTeams();

  if (isDesktop) {
    return (
      <Popover>
        <div className="flex gap-2 items-center justify-center ">
          <Label className="text-center">Julio Cesar</Label>
          <PopoverTrigger asChild>
            <Button variant={"outline"}>
              <TargetIcon size={"20px"} />
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
                <div className="flex justify-between items-center hover:bg-neutral-800 cursor-pointer rounded-md p-1 ">
                  <p className="">{t.nombre}</p>
                  <CheckIcon size={19} />
                </div>
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
