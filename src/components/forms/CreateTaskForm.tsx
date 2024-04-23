import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { SubmitHandler, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React, { useContext, useState } from "react";
import { SelectPrioridad } from "./forms.components/SelectPrioridad";
import { DatePicker } from "./forms.components/DatePicker";
import LoadingSmall from "../loaders/LoadingSmall";
import { Auth } from "@/context/auth";
import { Plus } from "lucide-react";
import { useCreateTask } from "@/hooks/queries/taskQueries/queries";

export function CreateTaskForm() {
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
    fechaVencimiento: z
      .string({ required_error: "Fecha necesaria" })
      .min(1, { message: "Por favor selecciona una fecha" }),
  });

  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      titulo: "",
      descripcion: "",
      fechaVencimiento: "",
      prioridad: "",
    },
    mode: "onChange",
  });

  React.useEffect(() => {
    form.reset();
  }, [open]);

  const { mutate, isPending } = useCreateTask();

  const OnSubmit: SubmitHandler<z.infer<typeof formScheme>> = async (
    data: z.infer<typeof formScheme>
  ) => {
    try {
      mutate({
        titulo: data.titulo,
        descripcion: data.descripcion,
        fechaVencimiento: data.fechaVencimiento,
        prioridad: data.prioridad,
        estado: "pendiente",
        ownerId: currentUser.id,
      });
      if (!isPending) {
        setOpen(!open);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"outline"}>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crea una tarea</DialogTitle>
          <DialogDescription>
            Llena la info de tu nueva tarea, una vez estes listo, presiona el
            boton "Crear" y se agregara automaticamente a tu lista de tareas.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onKeyDown={handleKeyDown}>
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
              Crear
            </Button>
          ) : (
            <LoadingSmall />
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
