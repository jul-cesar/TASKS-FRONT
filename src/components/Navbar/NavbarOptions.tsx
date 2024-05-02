import { useNavigate } from "react-router-dom";
import { AvatarDemo } from "../Avatar";
import { useContext, useState } from "react";
import { Auth } from "@/context/auth";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
import { publicRoutes } from "@/models/routes";
import { Bell } from "lucide-react";

const NavbarOptions = () => {
  const [openMenuProfile, setOpenMenuProfile] = useState<boolean>(false);
  const { logOut } = useContext(Auth);
  const navigate = useNavigate();
  const { currentUser, authTok } = useContext(Auth);

  return (
    <div className="flex items-center ms-3 gap-2">
      <div>
        <ModeToggle />
      </div>
      <div>
        <Button variant="outline" size="icon">
          <Bell />
        </Button>
      </div>
      <div>
        {authTok.token !== "" ? (
          <button
            onClick={() => setOpenMenuProfile(!openMenuProfile)}
            type="button"
            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
            aria-expanded="false"
            data-dropdown-toggle="dropdown-user"
          >
            <span className="sr-only">Open user menu</span>
            <AvatarDemo src={""} />
          </button>
        ) : (
          <Button onClick={() => navigate("/login")}>Inicia sesion</Button>
        )}
      </div>

      <div
        className={`absolute right-0 top-16 m-2 z-50 ${
          !openMenuProfile ? "hidden" : "block"
        } text-base list-none bg-background divide-y divide-gray-100 rounded shadow`}
        id="dropdown-user"
      >
        <div className="px-4 py-3" role="none">
          <span className="block text-sm">{currentUser.nombre}</span>

          <p className="text-sm truncate" role="none">
            {currentUser.email}
          </p>
          <p className="text-sm font-medium  truncate" role="none"></p>
        </div>
        <ul className="py-1" role="none">
          <li>
            <a
              onClick={async () => {
                await logOut();
                navigate(publicRoutes.LOGIN);
              }}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              role="menuitem"
            >
              Cerrar Sesion
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default NavbarOptions;
