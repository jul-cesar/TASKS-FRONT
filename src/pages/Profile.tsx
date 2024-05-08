import AvatarUserProfile from "@/AvatarUserProfile";
import InfoCard from "@/components/InfoCard";
import LoaderMedium from "@/components/loaders/LoaderMedium";
import { useGetUserInfo } from "@/hooks/queries/userQueries/queries";
import TasksPagesLayout from "@/layout/TasksPagesLayout";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const location = useLocation();
  const idProfile = location.pathname.split("/").pop();
  const { data, refetch, isLoading } = useGetUserInfo(idProfile ?? "");

  useEffect(() => {
    refetch();
  }, [idProfile, refetch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderMedium />
      </div>
    );
  }
  return (
    <TasksPagesLayout>
      <div className="flex justify-center mt-20">
        <AvatarUserProfile
          src={data?.photoURL ?? ""}
          nombre={data?.name ?? ""}
        />
      </div>
      <h1 className="my-4 text-2xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-4xl dark:text-white">
        {data?.name}
      </h1>
      <p className="mb-6 text-lg text-center font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        {data?.email}
      </p>

      <div className="flex flex-col sm:flex-row justify-center  grow m-4 gap-4">
        <InfoCard text="Tareas creadas" nro={data?.nroTareasCreadas} />
        <InfoCard text="Tareas asignadas" nro={data?.nroTareasAsignadas} />
        <InfoCard text="Comentarios hechos" nro={data?.nroComentarios} />
      </div>
    </TasksPagesLayout>
  );
};

export default Profile;
