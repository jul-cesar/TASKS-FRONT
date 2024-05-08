import { ReactNode, useState } from "react";
import LoadingSmall from "../loaders/LoadingSmall";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { useDeleteTeam } from "@/hooks/queries/teamsQueries/queries";
import { useLocation, useNavigate } from "react-router-dom";

const DeleteTeam = ({ children }: { children: ReactNode }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const idTeam = location.pathname.split("/").pop();
  const { mutateAsync, isPending } = useDeleteTeam();

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => setIsDialogOpen(open)}>
      <DialogTrigger className="cursor-pointer">{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Estas seguro que deseas eliminar este team</DialogTitle>
          <DialogDescription>
            Por favor, tenga en cuenta que los comentarios realizados en esta
            tarea serán eliminados. Una vez que se proceda con esta acción, no
            será posible recuperar dicha información
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4"></div>
        <DialogFooter className={"gap-2"}>
          {!isPending ? (
            <Button
              type="submit"
              onClick={async () => {
                await mutateAsync(idTeam ?? "");
                navigate("/");
              }}
            >
              Si
            </Button>
          ) : (
            <LoadingSmall />
          )}
          <Button type="submit" onClick={() => setIsDialogOpen(!open)}>
            No
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteTeam;
