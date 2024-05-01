const EstadoBadge = ({ estado }: { estado: string }) => {
  if (estado === "completada")
    return (
      <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
        {estado.toUpperCase()}
      </span>
    );
  if (estado === "pendiente")
    return (
      <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
        {estado.toUpperCase()}
      </span>
    );

  return (
    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
      {estado.toUpperCase()}
    </span>
  );
};
export default EstadoBadge;
