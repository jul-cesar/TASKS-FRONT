import { Label } from "@radix-ui/react-label";
import { CardContent } from "../ui/card";
import { BadgeComponent } from "./BadgeComponent";
import { formatCustomDate } from "@/utils/formatCustomDate";
import { format } from "date-fns";

const CardContentComponent = ({
  fechaVencimiento,
}: {
  fechaVencimiento: string;
}) => {
  const fechaVencimientoDate = new Date(fechaVencimiento);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  fechaVencimientoDate.setHours(0, 0, 0, 0);
  const badgeVariant =
    fechaVencimientoDate < today ? "destructive" : "secondary";
  return (
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
  );
};
export default CardContentComponent;
