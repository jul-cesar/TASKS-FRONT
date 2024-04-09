import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "@radix-ui/react-label";
import { task } from "@/types/Task";
import { CardOptions } from "./CardOptions";
import { formatCustomDate } from "@/utils/formatCustomDate";
import { BadgeComponent } from "./BadgeComponent";
import { Comments } from "./Comments";
import DialogAsignUser from "./DialogAsignUser";
import EditTaskForm from "./forms/EditTaskForm";
import { format } from "date-fns";
import { Separator } from "./ui/separator";
import { Clock, User } from "lucide-react";

interface TaskCardProps extends Omit<task, "ownerId" | "id"> {
  tareaInfo: task;
}

const TaskCard = ({
  titulo,
  asignado,
  descripcion,
  estado,
  prioridad,
  createdAt,
  owner,
  fechaVencimiento,
  tareaInfo,
}: TaskCardProps) => {
  return (
    <Card className="max-w-[340px]">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between">
            {titulo}
            <CardOptions tareaInfo={tareaInfo} />
          </div>
        </CardTitle>

        {asignado && (
          <CardDescription>Asignada a: {asignado.nombre}</CardDescription>
        )}
        <CardDescription>{descripcion}</CardDescription>
      </CardHeader>
      <div className="flex items-center justify-between gap-2 m-4">
        <div className="p-2">
          <Label>Estado: </Label>
          <BadgeComponent>{estado?.toUpperCase()}</BadgeComponent>
        </div>
        <div className="p-2">
          <Label>Prioridad: </Label>
          <BadgeComponent>{prioridad?.toUpperCase()}</BadgeComponent>
        </div>
      </div>

      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col items-center space-y-2">
              <Label>Fecha de vencimiento: </Label>
              <BadgeComponent variant="secondary">
                {format(fechaVencimiento, "yyyy-MM-dd")} (
                {formatCustomDate(fechaVencimiento)})
              </BadgeComponent>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-evenly">
        <Comments tareaInfo={tareaInfo} namet={titulo} />
        <DialogAsignUser taskInfo={tareaInfo} />
        <EditTaskForm taskInfo={tareaInfo} />
      </CardFooter>
      <Separator className="my-3" />
      <CardFooter className="flex justify-between ">
        <div className="flex justify-center items-center gap-1 mt-1">
          <User />
          <p className="font-bold text-xs"> {owner?.nombre} </p>
        </div>

        <div className="flex justify-center items-center gap-1 mt-1">
          <Clock />
          <p className="font-bold text-xs">{formatCustomDate(createdAt)} </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
