import { Card } from "../ui/card";
import { task } from "@/models/Task";

import { Label } from "../ui/label";

import EstadoBadge from "./EstadoBadge";
import PrioridadBadge from "./PrioridadBadge";
import CardFooterComponent from "./CardFooter";
import CardContentComponent from "./CardContent";

import CardHeaderComponent from "./CardHeader";

const TaskCard = ({ tareaInfo }: { tareaInfo: task }) => {
  return (
    <Card className="max-w-[350px]">
      <CardHeaderComponent
        fechaVencimiento={tareaInfo.expiringDate}
        asignado={tareaInfo.asigned}
        descripcion={tareaInfo.description}
        tareaInfo={tareaInfo}
        titulo={tareaInfo.title}
      />
      <div className="flex items-center justify-between gap-2 m-4">
        <div className="p-2">
          <Label>Estado: </Label>
          <EstadoBadge estado={tareaInfo.state} />
        </div>
        <div className="p-2">
          <Label>Prioridad: </Label>
          <PrioridadBadge prioridad={tareaInfo.priority} />
        </div>
      </div>

      <CardContentComponent fechaVencimiento={tareaInfo.expiringDate} />
      <CardFooterComponent tareaInfo={tareaInfo} />
    </Card>
  );
};

export default TaskCard;
