import {
  createContext,
  ReactNode,
  useState,
  SetStateAction,
  useEffect,
} from "react";
import axiosInstance from "@/api/axios";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  nombre: string;
  email: string;
  id: string;
}

type AuthContextType = {
  currentUser: {
    nombre: string;
    email: string;
    id: string;
  };
  LogIn: (email: string, password: string) => Promise<void>;
  setAuthTok: React.Dispatch<SetStateAction<{ token: string }>>;
  authTok: {
    token: string;
  };
  logOut: () => Promise<void>;
};

export const Auth = createContext<AuthContextType>({
  currentUser: {
    nombre: "",
    email: "",
    id: "",
  },
  LogIn: async (email: string, password: string) => {},
  setAuthTok: () => {},
  authTok: {
    token: "",
  },
  logOut: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState({
    nombre: "",
    email: "",
    id: "",
  });
  const [authTok, setAuthTok] = useState<{ token: string }>({ token: "" });
  const axiosInstance = useAxiosPrivate();

  const LogIn = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      setAuthTok(response.data);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const logOut = async () => {
    try {
      await axiosInstance.get("/logout", {
        withCredentials: true,
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (authTok.token) {
      const decodedInfo = jwtDecode<CustomJwtPayload>(authTok.token);
      setCurrentUser({
        nombre: decodedInfo.nombre,
        email: decodedInfo.email,
        id: decodedInfo.id,
      });
    }
  }, [authTok]);

  return (
    <Auth.Provider
      value={{
        currentUser,
        LogIn,
        setAuthTok,
        authTok,
        logOut,
      }}
    >
      {children}
    </Auth.Provider>
  );
};
