import { Auth } from "@/context/auth";
import { UiContext } from "@/context/ui";
import { publicRoutes } from "@/models/routes";
import { BookOpenCheck, ListTodo, LogOut, UserCircle } from "lucide-react";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const { openSidebar, setOpenSidebar } = useContext(UiContext);
  const { currentUser, logOut } = useContext(Auth);
  const location = useLocation();

  return (
    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-12 transition-transform ${
        !openSidebar && "-translate-x-full"
      } bg-white border-r sm:translate-x-0`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 sm:py-8 py-11 overflow-y-auto bg-background border-border border-r-2">
        <ul className="space-y-2 font-medium">
          {/* <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
              <span className="ms-3">Dashboard</span>
              <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                Soon...
              </span>
            </a>
          </li> */}
          <li>
            <a
              onClick={() => {
                navigate("/asigned-tasks");
                setOpenSidebar(!openSidebar);
              }}
              className={`flex cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white ${
                location.pathname === "/asigned-tasks" &&
                "bg-gray-100  dark:bg-gray-900"
              } hover:bg-gray-100 dark:hover:bg-gray-800 group`}
            >
              <BookOpenCheck />
              <span className="flex-1 ms-3 whitespace-nowrap">
                Tareas asignadas
              </span>
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
          <li>
            <a
              onClick={() => {
                navigate("/");
                setOpenSidebar(!openSidebar);
              }}
              className={`flex cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white ${
                location.pathname === "/" && "bg-gray-100  dark:bg-gray-900"
              } hover:bg-gray-100 dark:hover:bg-gray-800 group`}
            >
              <ListTodo />
              <span className="flex-1 ms-3 whitespace-nowrap">Mis tareas</span>
              {/* <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                {tareasLength.myTasks}
              </span> */}
            </a>
          </li>
          <li>
            {/* <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <Handshake />
              <span className="flex-1 ms-3 whitespace-nowrap">Teams</span>
            </a> */}
          </li>
          {/* <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
            </a>
          </li> */}
        </ul>
        <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
          <li
            onClick={() => {
              navigate(`/user/${currentUser.id}`);

              setOpenSidebar(!openSidebar);
            }}
          >
            <a
              className={`flex cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white ${
                location.pathname === `/user/${currentUser.id}` &&
                "bg-gray-100  dark:bg-gray-900"
              } hover:bg-gray-100 dark:hover:bg-gray-800 group`}
            >
              <UserCircle />
              <span className="ms-3">Perfil</span>
            </a>
          </li>
          <li>
            {/* <a
              href="#"
              className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
            >
              <QuestionMarkIcon />
              <span className="ms-3">Sobre esto</span>
            </a> */}
          </li>
          {/*          
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
            >
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 21 21"
              >
                <path d="m5.4 2.736 3.429 3.429A5.046 5.046 0 0 1 10.134 6c.356.01.71.06 1.056.147l3.41-3.412c.136-.133.287-.248.45-.344A9.889 9.889 0 0 0 10.269 1c-1.87-.041-3.713.44-5.322 1.392a2.3 2.3 0 0 1 .454.344Zm11.45 1.54-.126-.127a.5.5 0 0 0-.706 0l-2.932 2.932c.029.023.049.054.078.077.236.194.454.41.65.645.034.038.078.067.11.107l2.927-2.927a.5.5 0 0 0 0-.707Zm-2.931 9.81c-.024.03-.057.052-.081.082a4.963 4.963 0 0 1-.633.639c-.041.036-.072.083-.115.117l2.927 2.927a.5.5 0 0 0 .707 0l.127-.127a.5.5 0 0 0 0-.707l-2.932-2.931Zm-1.442-4.763a3.036 3.036 0 0 0-1.383-1.1l-.012-.007a2.955 2.955 0 0 0-1-.213H10a2.964 2.964 0 0 0-2.122.893c-.285.29-.509.634-.657 1.013l-.01.016a2.96 2.96 0 0 0-.21 1 2.99 2.99 0 0 0 .489 1.716c.009.014.022.026.032.04a3.04 3.04 0 0 0 1.384 1.1l.012.007c.318.129.657.2 1 .213.392.015.784-.05 1.15-.192.012-.005.02-.013.033-.018a3.011 3.011 0 0 0 1.676-1.7v-.007a2.89 2.89 0 0 0 0-2.207 2.868 2.868 0 0 0-.27-.515c-.007-.012-.02-.025-.03-.039Zm6.137-3.373a2.53 2.53 0 0 1-.35.447L14.84 9.823c.112.428.166.869.16 1.311-.01.356-.06.709-.147 1.054l3.413 3.412c.132.134.249.283.347.444A9.88 9.88 0 0 0 20 11.269a9.912 9.912 0 0 0-1.386-5.319ZM14.6 19.264l-3.421-3.421c-.385.1-.781.152-1.18.157h-.134c-.356-.01-.71-.06-1.056-.147l-3.41 3.412a2.503 2.503 0 0 1-.443.347A9.884 9.884 0 0 0 9.732 21H10a9.9 9.9 0 0 0 5.044-1.388 2.519 2.519 0 0 1-.444-.348ZM1.735 15.6l3.426-3.426a4.608 4.608 0 0 1-.013-2.367L1.735 6.4a2.507 2.507 0 0 1-.35-.447 9.889 9.889 0 0 0 0 10.1c.1-.164.217-.316.35-.453Zm5.101-.758a4.957 4.957 0 0 1-.651-.645c-.033-.038-.077-.067-.11-.107L3.15 17.017a.5.5 0 0 0 0 .707l.127.127a.5.5 0 0 0 .706 0l2.932-2.933c-.03-.018-.05-.053-.078-.076ZM6.08 7.914c.03-.037.07-.063.1-.1.183-.22.384-.423.6-.609.047-.04.082-.092.129-.13L3.983 4.149a.5.5 0 0 0-.707 0l-.127.127a.5.5 0 0 0 0 .707L6.08 7.914Z" />
              </svg>
              <span className="ms-3">Help</span>
            </a>
          </li> */}
          <li
            onClick={async () => {
              await logOut();
              navigate(publicRoutes.LOGIN);
            }}
          >
            <a
              href="#"
              className="flex  items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <LogOut />
              <span className="flex-1 ms-3 whitespace-nowrap">
                Cerrar sesion
              </span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
