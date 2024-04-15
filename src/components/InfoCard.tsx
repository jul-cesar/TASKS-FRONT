import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Goal, GrabIcon, Speech } from "lucide-react";

const InfoCard = ({ text, nro }: { text: string; nro: number | undefined }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{text}</CardTitle>
        {text.toLowerCase().includes("creadas") && (
          <Goal className="h-5 w-5 m-1 text-muted-foreground" />
        )}
        {text.toLowerCase().includes("asignadas") && (
          <GrabIcon className="h-5 w-5 m-1 text-muted-foreground" />
        )}
        {text.toLowerCase().includes("comentarios") && (
          <Speech className="h-5 w-5 m-1 text-muted-foreground" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{nro}</div>
        {/* <p className="text-xs text-muted-foreground">
          +19% from last month
        </p> */}
      </CardContent>
    </Card>
  );
};

export default InfoCard;
