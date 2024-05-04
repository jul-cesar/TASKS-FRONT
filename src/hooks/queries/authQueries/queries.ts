import { Auth } from "@/context/auth";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

export const useLogIn = () => {
  const { LogIn } = useContext(Auth);

  type dataLogin = {
    email: string;
    password: string;
  };

  return useMutation({
    mutationFn: async (data: dataLogin) => {
      await LogIn(data.email, data.password);
    },
  });
};

type registerData = {
  name: string;
  email: string;
  password: string;
};

export const useRegister = () => {
  const { registerUser } = useContext(Auth);
  return useMutation({
    mutationFn: async (data: registerData) => {
      await registerUser(data.name, data.email, data.password);
    },
  });
};
