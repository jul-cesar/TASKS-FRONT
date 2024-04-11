import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { task } from "@/models/Task";
import { useState } from "react";
import LoadingSmall from "../loaders/LoadingSmall";
import { useDeleteTask } from "@/hooks/taskQueries";

export function DeleteTareaDialog({ tareaInfo }: { tareaInfo: task }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { mutate, isPending } = useDeleteTask(tareaInfo.id);
  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => setIsDialogOpen(open)}>
      <DialogTrigger asChild className="cursor-pointer">
        <Label>Eliminar</Label>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Estas seguro que deseas eliminar "{tareaInfo.titulo}"
          </DialogTitle>
          <DialogDescription>
            Por favor, tenga en cuenta que los comentarios realizados en esta
            tarea serán eliminados. Una vez que se proceda con esta acción, no
            será posible recuperar dicha información
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4"></div>
        <DialogFooter className={"gap-2"}>
          {!isPending ? (
            <Button type="submit" onClick={() => mutate()}>
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
}
