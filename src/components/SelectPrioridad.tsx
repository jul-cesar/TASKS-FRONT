

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectPrioridadProps = {
  valuef: string;
  onChangeFn: (...event: any[]) => void;
  onOpenChange: (isOpen: boolean) => void;
};

export function SelectPrioridad({
  valuef,
  onChangeFn,
  onOpenChange,
}: SelectPrioridadProps) {
  return (
    <Select onValueChange={onChangeFn} onOpenChange={onOpenChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Elige una prioridad" defaultValue={valuef} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Prioridades</SelectLabel>
          <SelectItem value="alta">Alta</SelectItem>
          <SelectItem value="media">Media</SelectItem>
          <SelectItem value="baja">Baja</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
