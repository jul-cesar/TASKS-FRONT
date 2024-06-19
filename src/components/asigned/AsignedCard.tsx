import { task } from "@/models/Task";
import { formatCustomDate } from "@/utils/formatCustomDate";
import Comments from "../Card.tasks/Comments/Comments";

import { Separator } from "../ui/separator";
import { Clock, User } from "lucide-react";
import { Label } from "../ui/label";
import { TooltipDemo } from "../Card.tasks/TooltipDemo";
import CardHeaderComponent from "../Card.tasks/CardHeader";
import { Card, CardFooter } from "../ui/card";
import EstadoBadge from "../Card.tasks/EstadoBadge";
import PrioridadBadge from "../Card.tasks/PrioridadBadge";
import CardContentComponent from "../Card.tasks/CardContent";

const AsignedCard = ({ taskInfo }: { taskInfo: task }) => {
  const fechaVencimientoDate = new Date(taskInfo.expiringDate);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  fechaVencimientoDate.setHours(0, 0, 0, 0);

  return (
    <Card className="max-w-[350px]">
      <CardHeaderComponent
        fechaVencimiento={taskInfo.expiringDate}
        asignado={taskInfo.asigned}
        descripcion={taskInfo.description}
        tareaInfo={taskInfo}
        titulo={taskInfo.title}
      />
      <div className="flex items-center justify-between gap-2 m-4">
        <div className="p-2">
          <Label>Estado: </Label>
          <EstadoBadge estado={taskInfo.state} />
        </div>
        <div className="p-2">
          <Label>Prioridad: </Label>
          <PrioridadBadge prioridad={taskInfo.priority} />
        </div>
      </div>
      <CardContentComponent fechaVencimiento={taskInfo.expiringDate} />
      <CardFooter className="flex justify-center">
        <TooltipDemo text="Ver Comentarios">
          <Comments tareaInfo={taskInfo} />
        </TooltipDemo>
      </CardFooter>
      <Separator className="my-3" />
      <CardFooter className="flex justify-between ">
        <TooltipDemo text="Tarea creada por">
          <div className="flex justify-center items-center gap-1 mt-1">
            <User />
            <p className="font-bold text-xs"> {taskInfo.owner?.name} </p>
          </div>
        </TooltipDemo>
        <TooltipDemo text="Tarea creada hace">
          <div className="flex justify-center items-center gap-1 mt-1">
            <Clock />
            <p className="font-bold text-xs">
              {formatCustomDate(taskInfo.createdAt)}{" "}
            </p>
          </div>
        </TooltipDemo>
      </CardFooter>{" "}
    </Card>
  );
};

export default AsignedCard;
