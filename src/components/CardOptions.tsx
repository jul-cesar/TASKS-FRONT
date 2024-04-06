import { EllipsisVertical, Trash } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { task } from "@/types/Task";
import { DeleteTareaDialog } from "./DeleteTareaDialog";

type CardOptionsProps = {
  tareaInfo: task;
};

export function CardOptions({ tareaInfo }: CardOptionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <Link to={"login"}>
              {" "}
              <span>Ver comentarios</span>
            </Link>
          </DropdownMenuItem> */}
          <div className="flex items-center m-2 cursor-pointer h-full">
            <Trash className="mr-2 h-4 w-4" />
            <DeleteTareaDialog tareaInfo={tareaInfo} />
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
