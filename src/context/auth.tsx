import { axiosInstance } from "@/api/axios";
import { createContext, ReactNode, useState, SetStateAction } from "react";

type AuthContextType = {
  currentUser: {};
  LogIn: (email: string, password: string) => Promise<void>;
  setAuthTok: React.Dispatch<SetStateAction<{token: string}>>;
  authTok: {
    token: string;
  };
};

export const Auth = createContext<AuthContextType>({
  currentUser: {},
  LogIn: async (email: string, password: string) => {},
  setAuthTok: () => {},
  authTok: {
    token: "",
  },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [authTok, setAuthTok] = useState<{ token: string }>({ token: "" });

  const LogIn = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      console.log(response.data.token);
      setAuthTok(response.data);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <Auth.Provider
      value={{
        currentUser,
        LogIn,
        setAuthTok,
        authTok,
      }}
    >
      {children}
    </Auth.Provider>
  );
};
