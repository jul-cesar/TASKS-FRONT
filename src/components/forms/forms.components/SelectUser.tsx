import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { SetStateAction, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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

  const { data: listaUsuarios } = useQuery({
    queryKey: ["listaUsuarios"],
    // queryFn: async () => await getAllUsers(),
  });

  const { currentUser } = useContext(Auth);

  const [listaFiltrada, setListaFiltrada] = useState([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const queryClient = useQueryClient();

  // const { mutate } = useMutation({
  //   mutationFn: async (newTarea: z.infer<typeof FormSchema>) => {
  //     //   await updateTarea(currentTarea.id, newTarea);
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["listaTasks"] }),
  //       queryClient.invalidateQueries({ queryKey: ["listaAsign"] }),
  //       toast.success(`Asignaste un usuario a la tarea ${currentTarea.titulo}`);
  //     setIsOpenDialog(false);
  //   },
  // });

  // function onSubmit(data: z.infer<typeof FormSchema>) {
  //   mutate({ asignadoId: data.userAsignado });
  // }

  // useEffect(() => {
  //   if (listaUsuarios && currentUser) {
  //     console.log(currentUser, "xddddadasdasd");
  //     const filtrados = listaUsuarios.filter(
  //       (x: user) =>
  //         x.email?.toLowerCase() !==
  //         currentUser.currentUser.email?.toLowerCase()
  //     );
  //     setListaFiltrada(filtrados);
  //   }
  // }, [listaUsuarios, currentUser]);

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
                  {Array.isArray(listaFiltrada) &&
                    listaFiltrada.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.nombre}
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
