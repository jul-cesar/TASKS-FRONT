import { Auth } from "@/context/auth";
import useRefreshToken from "@/hooks/useRefreshToken";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const PersistLogin = () => {
  const { authTok } = useContext(Auth);
  const refresh = useRefreshToken();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    !authTok?.token ? verifyRefreshToken() : setLoading(false);
  }, []);

  return <>{loading ? <></> : <Outlet />}</>;
};

export default PersistLogin;
