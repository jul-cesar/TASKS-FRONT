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
    <Card className="max-w-[350px]">
      <CardHeaderComponent
        fechaVencimiento={fechaVencimiento}
        asignado={asignado}
        descripcion={descripcion}
        tareaInfo={tareaInfo}
        titulo={titulo}
      />
      <div className="flex items-center justify-between gap-2 m-4">
        <div className="p-2">
          <Label>Estado: </Label>
          <EstadoBadge estado={estado} />
        </div>
        <div className="p-2">
          <Label>Prioridad: </Label>
          <PrioridadBadge prioridad={prioridad} />
        </div>
      </div>

      <CardContentComponent fechaVencimiento={fechaVencimiento} />
      <CardFooterComponent
        createdAt={createdAt}
        owner={owner}
        tareaInfo={tareaInfo}
        titulo={titulo}
      />
    </Card>
  );
};

export default TaskCard;
