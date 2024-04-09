import { useNavigate } from "react-router-dom";

const showTareas = true;

const Tabs = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center mt-16">
      <div className="text-sm font-medium text-center cursor-pointer text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="me-2">
            <a
              onClick={() => navigate("/")}
              className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg ${
                showTareas && "text-gray-900"
              } ${showTareas && "border-gray-300"}}`}
            >
              Mis tareas
            </a>
          </li>

          <li className="me-2">
            <a
              onClick={() => navigate("/asigned-tasks")}
              className={`inline-block p-4 cursor-pointer border-b-2 border-transparent rounded-t-lg ${
                !showTareas && "text-gray-900"
              } ${!showTareas && "border-gray-300"}}`}
            >
              Tareas asignadas
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Tabs;
