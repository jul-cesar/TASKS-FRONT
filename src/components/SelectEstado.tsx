import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type selectEstadoProps = {
  onChangeFn: (...event: any[]) => void;
  onOpenChange: (isOpen: boolean) => void;
  valuef: string;
};

const SelectEstado = ({
  onChangeFn,
  onOpenChange,
  valuef,
}: selectEstadoProps) => {
  return (
    <Select onValueChange={onChangeFn} onOpenChange={onOpenChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={valuef || "Elige un estado"} defaultValue={valuef} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Estado</SelectLabel>
          <SelectItem value="pendiente">Pendiente</SelectItem>
          <SelectItem value="progreso">En progreso</SelectItem>
          <SelectItem value="completada">Completada</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectEstado;
