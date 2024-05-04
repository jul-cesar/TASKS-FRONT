import { Card } from "../ui/card";
import { task } from "@/models/Task";

import { Label } from "../ui/label";

import EstadoBadge from "./EstadoBadge";
import PrioridadBadge from "./PrioridadBadge";
import CardFooterComponent from "./CardFooter";
import CardContentComponent from "./CardContent";

import CardHeaderComponent from "./CardHeader";

interface TaskCardProps extends Omit<task, "ownerId" | "id"> {
  tareaInfo: task;
}

const TaskCard = ({
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
  return (
    <Card className="max-w-[350px]">
      <CardHeaderComponent
        fechaVencimiento={expiringDate}
        asignado={asigned}
        descripcion={description}
        tareaInfo={tareaInfo}
        titulo={title}
      />
      <div className="flex items-center justify-between gap-2 m-4">
        <div className="p-2">
          <Label>Estado: </Label>
          <EstadoBadge estado={state} />
        </div>
        <div className="p-2">
          <Label>Prioridad: </Label>
          <PrioridadBadge prioridad={priority} />
        </div>
      </div>

      <CardContentComponent fechaVencimiento={expiringDate} />
      <CardFooterComponent
        createdAt={createdAt}
        owner={owner}
        tareaInfo={tareaInfo}
        titulo={title}
      />
    </Card>
  );
};

export default TaskCard;
