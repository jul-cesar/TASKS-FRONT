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
import { useLogIn } from "@/hooks/taskQueries";
import useRefreshToken from "@/hooks/useRefreshToken";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { z } from "zod";

const Login = () => {
  const navigate = useNavigate();
  const refresh = useRefreshToken();
  const { currentUser } = useContext(Auth);
  const { mutateAsync, status } = useLogIn();
  const formScheme = z.object({
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

  const onSubmit = async (data: z.infer<typeof formScheme>) => {
    try {
      await mutateAsync({
        email: data.email,
        password: data.password,
      });

      navigate("/");
    } catch (err: any) {
      console.log("error",err.message);
     
    }
  };

  return (
    <div className="auth flex items-center justify-center w-screen h-screen">
      <div
        className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
                px-6 py-10 sm:px-10 sm:py-6 
                bg-white rounded-lg shadow-md lg:shadow-lg"
      >
        <div className="flex flex-col gap-2 items-center justify-center">
          <h2 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl">
            Ingresa 👋{" "}
          </h2>
          <button
            type="button"
            onClick={() => refresh()}
            className="justify-self-center px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
          >
            <img
              className="w-6 h-6"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
            />
            <span>Inicia con Google</span>
          </button>
          <div className="inline-flex items-center justify-center w-full">
            <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2">
              o
            </span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="ejemplo@ejemplo.com"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col justify-center items-center m-4 gap-2">
              <Link
                className="self-start font-medium text-gray-900 underline"
                to={"/register"}
              >
                Registrate
              </Link>
              <Button className="">
                {status === "pending" && currentUser.nombre === "" ? (
                  <LoadingSmall />
                ) : (
                  "Ingresar"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
