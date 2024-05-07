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
import { useEditTask } from "@/hooks/queries/taskQueries/queries";
import { useGetTeamInfo } from "@/hooks/queries/teamsQueries/queries";
import { useLocation } from "react-router-dom";

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
  const location = useLocation();
  const idTeam = location.pathname.split("/").pop();

  const { data } = useGetTeamInfo(idTeam || "");
  const listaUsuarios = data?.members;
  const { mutate } = useEditTask(currentTarea.id);
  const { currentUser } = useContext(Auth);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate({
      ownerId: currentTarea.ownerId,
      title: currentTarea.title,
      expiringDate: currentTarea.expiringDate,
      description: currentTarea.description,
      state: currentTarea.state,
      priority: currentTarea.priority,
      asignedId: data.userAsignado,
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
                  {listaUsuarios?.length ?? 0 > 0 ? (
                    listaUsuarios
                      ?.filter(
                        (x: user) =>
                          x.email?.toLowerCase() !==
                          currentUser.email?.toLowerCase()
                      )
                      .map((user) => (
                        <SelectItem key={user.id} value={user.id || ""}>
                          {user.email}
                        </SelectItem>
                      ))
                  ) : (
                    <div className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md  px-3 py-2 text-sm shadow-sm  placeholder:text-muted-foreground ">
                      No hay usuarios en el team actual
                    </div>
                  )}
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
