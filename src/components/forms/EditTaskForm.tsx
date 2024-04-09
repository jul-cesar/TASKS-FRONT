import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { task } from "@/types/Task";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { LucideEdit } from "lucide-react";
import LoadingSmall from "../loaders/LoadingSmall";
import { Input } from "../ui/input";
import { SelectPrioridad } from "../SelectPrioridad";
import SelectEstado from "../SelectEstado";
import { DatePicker } from "../DatePicker";
import { useEditTask } from "@/hooks/taskQueries";
import { Auth } from "@/context/auth";
import axios from "axios";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

type EditTaskFormProps = {
  taskInfo: task;
};

const EditTaskForm = ({ taskInfo }: EditTaskFormProps) => {
  const [open, setOpen] = useState(false);
  const [, setDropdownOpen] = useState(false);
  const { currentUser } = useContext(Auth);

  const formScheme = z.object({
    titulo: z
      .string()
      .min(4, { message: "minimo 4 caracteres" })
      .max(44, { message: "Maximo 44 caracteres" }),
    descripcion: z
      .string({ required_error: "Se requiere una descripcion" })
      .min(4, { message: "minimo 4 caracteres" })
      .max(220, { message: "Maximo 220 caracteres" }),
    prioridad: z
      .string({ required_error: "Por favor, elige una prioridad" })
      .min(1, { message: "Por favor elige una prioridad" }),
    fechaVencimiento: z.string({ required_error: "Fecha necesaria" }),
    estado: z.string({ required_error: "Fecha necesaria" }),
  });

  const axiosInstance = useAxiosPrivate();

  const { data: newTaskData } = useQuery<task, Error>({
    queryKey: ["tasks", taskInfo.id, open],
    queryFn: () =>
      axiosInstance.get(`/tarea/byid/${taskInfo.id}`).then((res) => res.data),
    enabled: !!open,
  });

  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),

    mode: "onChange",
  });

  React.useEffect(() => {
    if (newTaskData) {
      form.reset({
        titulo: newTaskData.titulo,
        descripcion: newTaskData.descripcion,
        fechaVencimiento: newTaskData.fechaVencimiento,
        prioridad: newTaskData.prioridad,
        estado: newTaskData.estado,
      });
    }
  }, [newTaskData, form]);

  React.useEffect(() => {
    form.reset();
  }, [open]);

  const { mutateAsync, isPending } = useEditTask(taskInfo.id);
  const OnSubmit: SubmitHandler<z.infer<typeof formScheme>> = async (
    data: z.infer<typeof formScheme>
  ) => {
    try {
      await mutateAsync({
        titulo: data.titulo,
        descripcion: data.descripcion,
        prioridad: data.prioridad,
        estado: data.estado,
        fechaVencimiento: data.fechaVencimiento,
        ownerId: currentUser.id,
      });
      if (!isPending) {
        setOpen(!open);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button>
          {" "}
          <LucideEdit />{" "}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar tarea</DialogTitle>
          <DialogDescription>Edita los datos de tu tarea</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className=" text-start space-y-1.5 space-x-1.5">
                <FormField
                  name="titulo"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titulo</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="name"
                          placeholder="Nombre de tu tarea"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className=" text-start space-x-1.5">
                <FormField
                  name="descripcion"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Descripcion
                        <FormControl>
                          <Textarea
                            placeholder="Descripcion breve de tu tarea."
                            id="message"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="prioridad"
                  render={({ field: { value, onChange } }) => (
                    <FormItem>
                      <FormLabel>
                        Prioridad
                        <FormControl>
                          <SelectPrioridad
                            valuef={value}
                            onChangeFn={onChange}
                            onOpenChange={(isOpen: boolean) =>
                              setDropdownOpen(isOpen)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="estado"
                  render={({ field: { value, onChange } }) => (
                    <FormItem>
                      <FormLabel>
                        Estado
                        <FormControl>
                          <SelectEstado
                            valuef={value}
                            onChangeFn={onChange}
                            onOpenChange={(isOpen: boolean) =>
                              setDropdownOpen(isOpen)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                name="fechaVencimiento"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Fecha de vencimiento
                      <FormControl>
                        <DatePicker
                          {...field}
                          valuef={field.value}
                          onChangef={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter>
          {!isPending ? (
            <Button type="submit" onClick={form.handleSubmit(OnSubmit)}>
              Editar
            </Button>
          ) : (
            <LoadingSmall />
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskForm;
