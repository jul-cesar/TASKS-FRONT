import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Team } from "@/models/teams";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { AvatarMember } from "./AvatarMember";

export function ManageTeam({
  children,
  data,
}: {
  children: React.ReactNode;
  data: Team[] | undefined;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-screen-lg">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <ProfileForm data={data} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent className="p-4">
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
        </DrawerHeader>

        <ProfileForm data={data} />

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ data }: { data: Team[] | undefined }) {
  return (
    <ul className=" divide-y max-h-[500px] overflow-y-auto p-4">
      {data?.map((item) => (
        <li key={item.id} className="py-5 flex items-start justify-between">
          <div className="flex gap-3">
            <AvatarMember nombre={item.name} />
            <div>
              <span className="block text-sm  font-semibold">
                {item.name}
              </span>
              <span className="block text-sm ">
                Creado: {format(item.createdAt ?? new Date(), "yyyy-MM-dd")}
              </span>
            </div>
          </div>
          <Link
            to={`/team/${item.id}`}
            className="text-gray-700 text-sm border rounded-lg px-3 py-2 duration-150 bg-white hover:bg-gray-100"
          >
            Administrar
          </Link>
        </li>
      ))}
    </ul>
  );
}
