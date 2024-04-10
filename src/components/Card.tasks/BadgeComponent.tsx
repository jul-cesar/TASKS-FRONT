import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";

type bedgeEstadoProps = {
  children: ReactNode;
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | null
    | undefined;
};

export function BadgeComponent({ children, variant }: bedgeEstadoProps) {
  return <Badge variant={variant}>{children}</Badge>;
}
