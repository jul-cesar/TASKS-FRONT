import AddMember from "@/components/teams/addMember";
import { AvatarMember } from "@/components/teams/AvatarMember";
import LoaderMedium from "@/components/loaders/LoaderMedium";
import Navbar from "@/components/Navbar/Navbar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  useDeleteMember,
  useGetTeamInfo,
} from "@/hooks/queries/teamsQueries/queries";
import { Trash2Icon } from "lucide-react";
import { useLocation } from "react-router-dom";
import DeleteTeam from "@/components/teams/deleteTeam";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useContext } from "react";
import { Auth } from "@/context/auth";
import LeaveTeam from "@/components/teams/LeaveTeam";

const TeamConfig = () => {
  const location = useLocation();
  const idTeam = location.pathname.split("/").pop();
  const { data: members, isLoading } = useGetTeamInfo(idTeam || "");
  const { currentUser } = useContext(Auth);

  const { mutateAsync } = useDeleteMember();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderMedium />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="max-w-2xl sm:ml-[260px]  lg:ml-[450px] mr-auto  mt-20 flex item flex-col p-6 justify-center">
        <div className="items-start justify-between sm:flex">
          <div>
            <h4 className=" text-xl font-semibold underline">
              {members?.name}
            </h4>
            <p className="mt-2  text-base sm:text-sm">
             {members?.ownerId === currentUser.id  ? 'Agrega o elimina miembros a tu equipo.' : "" }
            </p>
          </div>

          {members?.ownerId === currentUser.id && (
            <AddMember>
              <Button variant={"outline"} className="mt-3 bg-purple-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
                Agregar miembro
              </Button>
            </AddMember>
          )}
        </div>
        <ul className="mt-7 divide-y">
          <li className="py-5 flex items-start justify-between">
            <div className="flex gap-3">
              <AvatarMember
                src={members?.owner.photoURL || ""}
                nombre={members?.owner.name || ""}
              />
              <div>
                <span className="block text-sm  font-semibold">
                  {members?.owner.name}
                </span>
                <span className="block text-sm ">{members?.owner.email}</span>
                <span className="block text-sm font-bold ">Creador</span>
              </div>
            </div>
          </li>
          {members?.members?.map((item, idx) => (
            <li key={idx} className="py-5 flex items-start justify-between">
              <div className="flex gap-3">
                <AvatarMember src={item.photoURL || ""} nombre={item.name} />
                <div>
                  <span className="block text-sm  font-semibold">
                    {item.name}
                  </span>
                  <span className="block text-sm ">{item.email}</span>
                  <span className="block text-sm font-bold ">Miembro</span>
                </div>
              </div>
              {members.ownerId === currentUser.id && (
                <Trash2Icon
                  className="hover:text-red-500 hover:scale-125"
                  onClick={async () => {
                    await mutateAsync({
                      idUser: item.id ?? "",
                      idTeam: idTeam ?? "",
                    });
                  }}
                />
              )}
            </li>
          ))}
        </ul>
        {members?.ownerId === currentUser.id ? (
          <section className="flex flex-col items-end justify-center gap-4 mt-4">
            <Label>Eliminar team</Label>
            <DeleteTeam>
              <Button variant="destructive">Eliminar</Button>
            </DeleteTeam>
          </section>
        ) : (
          <section className="flex flex-col items-end justify-center gap-4 mt-4">
            <Label>Salir del team</Label>
            <LeaveTeam>
              <Button variant="secondary">Salir</Button>
            </LeaveTeam>
          </section>
        )}
      </div>
    </div>
  );
};

export default TeamConfig;
