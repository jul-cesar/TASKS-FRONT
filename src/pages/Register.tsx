import LoadingSmall from "@/components/loaders/LoadingSmall";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Auth } from "@/context/auth";
import { useRegister } from "@/hooks/queries/authQueries/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const Register = () => {
  const formScheme = z.object({
    name: z
      .string()
      .min(2, { message: "tu nombre debe contener al menos 2 caracteres" }),
    email: z
      .string()
      .min(1, { message: "Este campo es obligatorio" })
      .email("Esto no es un email valido"),
    password: z
      .string()
      .min(1, { message: "Por favor, ingresa una contraseña" }),
  });

  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    mode: "onChange",
  });

  const { mutateAsync, isPending } = useRegister();
  const { currentUser } = useContext(Auth);

  const onSubmit = async (data: z.infer<typeof formScheme>) => {
    try {
      await mutateAsync({
        name: data.name,
        email: data.email,
        password: data.password,
      });
    } catch (err: any) {
      console.log("error", err.message);
    }
  };
  return (
    <div className="w-full  lg:grid lg:min-h-[600px] lg:grid-cols-2 ">
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold underline">tâche</h1>
            <p className="text-balance text-muted-foreground">Registrate</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input
                            id="nombre"
                            type="text"
                            placeholder="jul"
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo</FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    {/* <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link> */}
                  </div>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                          <Input
                            id="password"
                            type="password"
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">
                  {isPending && currentUser.nombre === "" ? (
                    <LoadingSmall />
                  ) : (
                    "Registrar"
                  )}
                </Button>
                {/* <Button variant="outline" className="w-full">
              Inicia con Google
              <img
                className="w-6 h-4 m-1"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                loading="lazy"
                alt="google logo"
              />
            </Button> */}
              </div>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Ya tienes una cuenta?{" "}
            <Link to="/login" className="underline">
              Inicia sesion
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden bg-muted ">
        <img
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default Register;
