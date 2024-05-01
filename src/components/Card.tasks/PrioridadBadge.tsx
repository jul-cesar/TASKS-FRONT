const PrioridadBadge = ({ prioridad }: { prioridad: string }) => {
  if (prioridad === "media")
    return (
      <span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
        {prioridad.toUpperCase()}
      </span>
    );
  if (prioridad === "alta")
    return (
      <span className="bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
        {" "}
        {prioridad.toUpperCase()}
      </span>
    );

  return (
<span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
      {prioridad.toUpperCase()}
    </span>
  );
};
export default PrioridadBadge;
