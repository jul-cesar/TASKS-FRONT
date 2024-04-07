import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
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

type EditTaskFormProps = {
  taskInfo: task;
};

const EditTaskForm = ({ taskInfo }: EditTaskFormProps) => {
  const [open, setOpen] = useState(false);
  const [, setDropdownOpen] = useState(false);

  const queryClient = useQueryClient();

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

  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      titulo: taskInfo.titulo,
      descripcion: taskInfo.descripcion,
      fechaVencimiento: taskInfo.fechaVencimiento,
      prioridad: taskInfo.prioridad,
      estado: taskInfo.estado,
    },
    mode: "onChange",
  });

  React.useEffect(() => {
    form.reset();
  }, [open]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (newTarea: Omit<task, "id" | "createdAt">) => {
      console.log(newTarea, "new");
      // await updateTarea(tareaInfo.id, newTarea);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listaTasks"] }),
        toast.success(`Tarea editada`);
    },
  });
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
        ownerId: "1212",
      });
      if (!isPending) {
        setOpen(!open);
      }
      console.log(data);
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
                    <FormControl>
                      <DatePicker
                        {...field}
                        valuef={field.value}
                        onChangef={field.onChange}
                      />
                    </FormControl>

                    <FormMessage />
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
