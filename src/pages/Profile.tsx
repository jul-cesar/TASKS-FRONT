import AvatarUserProfile from "@/components/AvatarUserProfile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetUserInfo } from "@/hooks/taskQueries";
import TasksPagesLayout from "@/layout/TasksPagesLayout";
import { CreditCard } from "lucide-react";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const location = useLocation();
  const idProfile = location.pathname.split("/").pop();
  const { data } = useGetUserInfo(idProfile ?? "");

  return (
    <TasksPagesLayout>
      <div className="flex justify-center mt-20">
        <AvatarUserProfile
          src={data?.photoURL ?? ""}
          nombre={data?.nombre ?? ""}
        />
      </div>
      <h1 className="my-4 text-2xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-4xl dark:text-white">
        {data?.nombre}
      </h1>
      <p className="mb-6 text-lg text-center font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        {data?.email}
      </p>

      <div className="flex justify-center items-center grow gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
      </div>
    </TasksPagesLayout>
  );
};

export default Profile;
