import { Auth } from "@/context/auth";
import { UiContext } from "@/context/ui";
import { ReactNode, useContext } from "react";
import { useNavigate } from "react-router-dom";

const SidebarOption = ({
  route,
  text,
  logo,
}: {
  route: string;
  text: string;
  logo: ReactNode;
}) => {
  const navigate = useNavigate();
  const { openSidebar, setOpenSidebar } = useContext(UiContext);
  const { logOut } = useContext(Auth);

  return (
    <li>
      <a
        onClick={async () => {
          text === "Cerrar sesion" && (await logOut());
          navigate(route);
          setOpenSidebar(!openSidebar);
        }}
        className={`flex cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white ${
          location.pathname === route && "bg-gray-100  dark:bg-gray-900"
        } hover:bg-gray-100 dark:hover:bg-gray-800 group`}
      >
        {logo}
        <span className="flex-1 ms-3 whitespace-nowrap">{text}</span>
        {/* {
        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
          {tareasLength.asignedTasks}
        </span>
      } */}
        {/* <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
        Pro
      </span> */}
      </a>
    </li>
  );
};
export default SidebarOption;
