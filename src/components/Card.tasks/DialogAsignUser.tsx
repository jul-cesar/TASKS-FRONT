import { Button } from "../ui/button";
import { UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { task } from "@/models/Task";
import SelectUser from "../forms/forms.components/SelectUser";
import { useState } from "react";

type DialogAsignUserProps = {
  taskInfo: task;
};

const DialogAsignUser = ({ taskInfo }: DialogAsignUserProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => setIsDialogOpen(open)}>
      <DialogTrigger asChild>
        <Button>
          {" "}
          <UserPlus />{" "}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-w-[400px]">
        <DialogHeader>
          <DialogTitle>
            Asigna un usuario a la tarea "{taskInfo.title}"
          </DialogTitle>
          <DialogDescription>Al asignar una tarea xdxdxd</DialogDescription>
        </DialogHeader>
        <SelectUser currentTarea={taskInfo} setIsOpenDialog={setIsDialogOpen} />
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAsignUser;
