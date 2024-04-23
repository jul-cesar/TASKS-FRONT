import { zodResolver } from "@hookform/resolvers/zod";
import React, { SetStateAction, useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Button } from "../../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { task } from "@/models/Task";
import { user } from "@/models/User";
import { Auth } from "@/context/auth";
import { useGetAllUsers } from "@/hooks/queries/userQueries/queries";
import { useEditTask } from "@/hooks/queries/taskQueries/queries";

type SelectUserProps = {
  setIsOpenDialog: React.Dispatch<SetStateAction<boolean>>;
  currentTarea: task;
};

const SelectUser = ({ setIsOpenDialog, currentTarea }: SelectUserProps) => {
  const FormSchema = z.object({
    userAsignado: z.string({
      required_error: "Por favor, selecciona un usuario",
    }),
  });

  const { data: listaUsuarios } = useGetAllUsers();
  const { mutate } = useEditTask(currentTarea.id);
  const { currentUser } = useContext(Auth);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate({
      ownerId: currentTarea.ownerId,
      titulo: currentTarea.titulo,
      fechaVencimiento: currentTarea.fechaVencimiento,
      descripcion: currentTarea.descripcion,
      estado: currentTarea.estado,
      prioridad: currentTarea.prioridad,
      asignadoId: data.userAsignado,
    });
    setIsOpenDialog(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="userAsignado"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuario</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un usuario" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Array.isArray(listaUsuarios) &&
                    listaUsuarios
                      .filter(
                        (x: user) =>
                          x.email?.toLowerCase() !==
                          currentUser.email?.toLowerCase()
                      )
                      .map((user) => (
                        <SelectItem key={user.id} value={user.id || ""}>
                          {user.email}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Solo puedes asignar la tarea a un usuario
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Asignar</Button>
      </form>
    </Form>
  );
};

export default SelectUser;
