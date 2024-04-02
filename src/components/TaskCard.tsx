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
import { BadgeComponent} from "./BadgeComponent";
import { Comments } from "./Comments";

interface TaskCardProps extends task {
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
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between">
            {titulo}
            <CardOptions tareaInfo={tareaInfo} />
          </div>
        </CardTitle>
        <CardDescription>Creada por: {owner.nombre}</CardDescription>
        <CardDescription>
          Creada: hace {formatCustomDate(createdAt)}
        </CardDescription>

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
              <Label htmlFor="name">Fecha de vencimiento: </Label>
              <BadgeComponent variant="secondary">
                {formatCustomDate(fechaVencimiento)}
              </BadgeComponent>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-evenly">
        <Comments tareaInfo={tareaInfo} namet={titulo} />
        <DialogAsignarUser name={tareaInfo} />
        <DialogEditarTarea tareaInfo={tareaInfo} />
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
