import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { task } from "@/models/Task";
import { CardOptions } from "./CardOptions";
import { formatCustomDate } from "@/utils/formatCustomDate";
import { BadgeComponent } from "./BadgeComponent";
import { format } from "date-fns";
import { Separator } from "../ui/separator";
import { Clock, TimerOffIcon, User } from "lucide-react";
import { Label } from "../ui/label";
import { TooltipDemo } from "./TooltipDemo";

import Comments from "./Comments/Comments";
import DialogAsignUser from "./DialogAsignUser";
import EditTaskForm from "../forms/EditTaskForm";

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
  const fechaVencimientoDate = new Date(fechaVencimiento);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  fechaVencimientoDate.setHours(0, 0, 0, 0);

  const badgeVariant =
    fechaVencimientoDate < today ? "destructive" : "secondary";

  return (
    <Card className="max-w-[350px]">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between">
            {titulo}
            <div className="flex items-center justify-center gap-2">
              {badgeVariant === "destructive" && (
                <TooltipDemo text="Esta tarea expiró">
                  {" "}
                  <TimerOffIcon />{" "}
                </TooltipDemo>
              )}
              <CardOptions tareaInfo={tareaInfo} />
            </div>
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
              <BadgeComponent variant={badgeVariant}>
                {format(fechaVencimiento, "yyyy-MM-dd")} (
                {formatCustomDate(fechaVencimiento)})
              </BadgeComponent>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-evenly">
        <TooltipDemo text="Ver Comentarios">
          <Comments tareaInfo={tareaInfo} namet={titulo} />
        </TooltipDemo>

        <TooltipDemo text="Asignar un usuario">
          <DialogAsignUser taskInfo={tareaInfo} />
        </TooltipDemo>
        <TooltipDemo text="Editar tarea">
          <EditTaskForm taskInfo={tareaInfo} />
        </TooltipDemo>
      </CardFooter>
      <Separator className="my-3" />
      <CardFooter className="flex justify-between ">
        <TooltipDemo text="Tarea creada por">
          <div className="flex justify-center items-center gap-1 mt-1">
            <User />
            <p className="font-bold text-xs"> {owner?.nombre} </p>
          </div>
        </TooltipDemo>
        <TooltipDemo text="Tarea creada hace">
          <div className="flex justify-center items-center gap-1 mt-1">
            <Clock />
            <p className="font-bold text-xs">{formatCustomDate(createdAt)} </p>
          </div>
        </TooltipDemo>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
