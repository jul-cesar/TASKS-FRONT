import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTeam } from "@/hooks/queries/teamsQueries/queries";
import { ReactNode, useContext } from "react";
import { Auth } from "@/context/auth";

const CreateTeam = ({ children }: { children: ReactNode }) => {
  const { mutate } = useCreateTeam();
  const { currentUser } = useContext(Auth);
  const formScheme = z.object({
    nombre: z.string().min(3, { message: "Minimo 3 caracteres" }),
  });
  const OnSubmit: SubmitHandler<z.infer<typeof formScheme>> = async (
    data: z.infer<typeof formScheme>
  ) => {
    mutate({
      nombre: data.nombre,
      ownerId: currentUser.id,
    });
  };
  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
  });
  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crea un equipo</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className=" text-start space-y-1.5 space-x-1.5">
                <FormField
                  name="nombre"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="nombre"
                          placeholder="Nombre de tu team"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" onClick={form.handleSubmit(OnSubmit)}>
            Crear
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default CreateTeam;
