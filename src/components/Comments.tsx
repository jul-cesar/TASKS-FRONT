import * as React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { z } from "zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { MessageSquarePlus } from "lucide-react";
import { task } from "@/types/Task";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "./ui/textarea";
import CommentsList from "./CommentsList";
import LoadingSmall from "./loaders/LoadingSmall";

import { useGetComments } from "@/hooks/taskQueries";

type CommentsProps = {
  namet: string;
  tareaInfo: task;
};

export function Comments({ namet, tareaInfo }: CommentsProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          {" "}
          <MessageSquarePlus />{" "}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-w-96 min-h-12 max-h-[600px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Comentarios</DialogTitle>
          <DialogDescription>
            Agrega notas o comentarios sobre el progreso de esta tarea
          </DialogDescription>
        </DialogHeader>
        <CommentsSection namet={namet} tareaInfo={tareaInfo} />
      </DialogContent>
    </Dialog>
  );
}

function CommentsSection({ namet, tareaInfo }: CommentsProps) {
 

  const idTarea = tareaInfo.id;

  const { data, isLoading, isPending } = useGetComments(idTarea);

  const listaComentarios = data?.data;

  const formScheme = z.object({
    contenido: z
      .string()
      .min(4, { message: "minimo 4 caracteres" })
      .max(200, { message: "Maximo 44 caracteres" }),
  });

  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    mode: "onChange",
  });

  const OnSubmit = (data: z.infer<typeof formScheme>) => {
    // mutate({ tareaId: tareaInfo.id, authorId: id, contenido: data.contenido });
    // form.reset({ contenido: "" });
  };
  return (
    <div>
      <Form {...form}>
        <form
          className={cn("grid items-start gap-4")}
          onSubmit={form.handleSubmit(OnSubmit)}
        >
          <div className="grid gap-2">
            <FormField
              name="contenido"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Haz un comentario para "{namet}" </FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {!isPending ? (
            <Button type="submit"> Agregar</Button>
          ) : (
            <LoadingSmall />
          )}
        </form>
      </Form>
      <CommentsList
        listaComentarios={listaComentarios || []}
        isLoading={isLoading}
      />
    </div>
  );
}
