import { ReactNode, useContext, useState } from "react";
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

import { useLocation, useNavigate } from "react-router-dom";
import { useDeleteMember } from "@/hooks/queries/teamsQueries/queries";
import { Auth } from "@/context/auth";

const LeaveTeam = ({ children }: { children: ReactNode }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useContext(Auth);

  const idTeam = location.pathname.split("/").pop() || "";
  const idUser = currentUser.id;
  const { mutateAsync, isPending } = useDeleteMember();

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => setIsDialogOpen(open)}>
      <DialogTrigger className="cursor-pointer">{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Estas seguro que deseas dejar este team?</DialogTitle>
          <DialogDescription>
            Por favor, tenga en cuenta que dejar este team significa perder
            acceso a sus tareas
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4"></div>
        <DialogFooter className={"gap-2"}>
          {!isPending ? (
            <>
              <Button
                type="submit"
                onClick={async () => {
                  await mutateAsync({ idUser, idTeam });
                  navigate("/");
                }}
              >
                Si
              </Button>

              <Button type="submit" onClick={() => setIsDialogOpen(!open)}>
                No
              </Button>
            </>
          ) : (
            <LoadingSmall />
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default LeaveTeam;
