import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { task } from "@/models/Task";
import { formatCustomDate } from "@/utils/formatCustomDate";
import { BadgeComponent } from "../Card.tasks/BadgeComponent";
import Comments from "../Card.tasks/Comments/Comments";

import { format } from "date-fns";
import { Separator } from "../ui/separator";
import { Clock, User } from "lucide-react";
import { Label } from "../ui/label";
import { TooltipDemo } from "../Card.tasks/TooltipDemo";

interface TaskCardProps extends Omit<task, "ownerId" | "id"> {
  tareaInfo: task;
}

const AsignedCard = ({
  title,
  asigned,
  description,
  state,
  priority,
  createdAt,
  owner,
  expiringDate,
  tareaInfo,
}: TaskCardProps) => {
  const fechaVencimientoDate = new Date(expiringDate);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  fechaVencimientoDate.setHours(0, 0, 0, 0);

  const badgeVariant =
    fechaVencimientoDate < today ? "destructive" : "secondary";
  return (
    <Card className="max-w-[350px]">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between">{title}</div>
        </CardTitle>

        {asigned && (
          <CardDescription>Asignada a: {asigned?.name}</CardDescription>
        )}
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <div className="flex items-center justify-between gap-2 m-4">
        <div className="p-2">
          <Label>Estado: </Label>
          <BadgeComponent>{state?.toUpperCase()}</BadgeComponent>
        </div>
        <div className="p-2">
          <Label>Prioridad: </Label>
          <BadgeComponent>{priority?.toUpperCase()}</BadgeComponent>
        </div>
      </div>

      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col items-center space-y-2">
              <Label>Fecha de vencimiento: </Label>
              <BadgeComponent variant={badgeVariant}>
                {format(expiringDate, "yyyy-MM-dd")} (
                {formatCustomDate(expiringDate)})
              </BadgeComponent>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <TooltipDemo text="Ver Comentarios">
          <Comments tareaInfo={tareaInfo} namet={title} />
        </TooltipDemo>
      </CardFooter>
      <Separator className="my-3" />
      <CardFooter className="flex justify-between ">
        <TooltipDemo text="Tarea creada por">
          <div className="flex justify-center items-center gap-1 mt-1">
            <User />
            <p className="font-bold text-xs"> {owner?.name} </p>
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

export default AsignedCard;
