import { Auth } from "@/context/auth";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

import { UiContext } from "@/context/ui";
import ProjectsMenu from "../ProjectsMenu";
import BurgerButtonNavbar from "./BurgerButtonNavbar";

import NavbarOptions from "./NavbarOptions";
import NavbarLogo from "./NavbarLogo";

const Navbar = () => {
  const { currentUser } = useContext(Auth);
  const location = useLocation();
  const { currentTeam } = useContext(UiContext);

  const encodedName = encodeURIComponent(currentUser.nombre);
  const matchPath = `/${encodedName}/${currentTeam.id}`;

  return (
    <nav className="fixed top-0 z-50 w-full px-2 bg-background border-b border-border">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <BurgerButtonNavbar />
            <NavbarLogo />
            <div>{location.pathname === matchPath && <ProjectsMenu />}</div>
          </div>
          <NavbarOptions />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
