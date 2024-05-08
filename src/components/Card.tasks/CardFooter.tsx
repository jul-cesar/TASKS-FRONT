import { Clock, User } from "lucide-react";
import EditTaskForm from "../forms/EditTaskForm";
import Comments from "./Comments/Comments";
import DialogAsignUser from "./DialogAsignUser";
import { TooltipDemo } from "./TooltipDemo";
import { formatCustomDate } from "@/utils/formatCustomDate";
import { task } from "@/models/Task";
import { CardFooter } from "../ui/card";
import { Separator } from "../ui/separator";

const CardFooterComponent = ({ tareaInfo }: { tareaInfo: task }) => {
  return (
    <>
      <CardFooter className="flex justify-evenly">
        <TooltipDemo text="Ver Comentarios">
          <Comments tareaInfo={tareaInfo}/>
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
            <p className="font-bold text-xs"> {tareaInfo.owner?.name} </p>
          </div>
        </TooltipDemo>
        <TooltipDemo text="Tarea creada hace">
          <div className="flex justify-center items-center gap-1 mt-1">
            <Clock />
            <p className="font-bold text-xs">
              {formatCustomDate(tareaInfo.createdAt)}{" "}
            </p>
          </div>
        </TooltipDemo>
      </CardFooter>
    </>
  );
};
export default CardFooterComponent;
