import { TimerOffIcon } from "lucide-react";
import { CardDescription, CardHeader, CardTitle } from "../ui/card";
import { TooltipDemo } from "./TooltipDemo";
import { task } from "@/models/Task";
import { user } from "@/models/User";
import { CardOptions } from "./CardOptions";

const CardHeaderComponent = ({
  titulo,
  tareaInfo,
  descripcion,
  asignado,
  fechaVencimiento,
}: {
  titulo: string;
  tareaInfo: task;
  descripcion: string;
  asignado: user | undefined;
  fechaVencimiento: string;
}) => {
  const fechaVencimientoDate = new Date(fechaVencimiento);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  fechaVencimientoDate.setHours(0, 0, 0, 0);

  const badgeVariant =
    fechaVencimientoDate < today ? "destructive" : "secondary";
  return (
    <CardHeader>
      <CardTitle>
        <div className="flex justify-between items-center">
          {titulo}
          {badgeVariant === "destructive" && (
            <TooltipDemo text="Esta tarea expiró">
              {" "}
              <TimerOffIcon />{" "}
            </TooltipDemo>
          )}

          <CardOptions tareaInfo={tareaInfo} />
        </div>
      </CardTitle>
      {asignado && (
        <CardDescription className="font-semibold underline">
          Asignada a: {asignado.nombre}
        </CardDescription>
      )}
      <CardDescription>{descripcion}</CardDescription>
    </CardHeader>
  );
};
export default CardHeaderComponent;
