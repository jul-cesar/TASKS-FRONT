import { Bell, MessageSquareWarningIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useContext } from "react";
import { Auth } from "@/context/auth";
import LoadingSmall from "@/components/loaders/LoadingSmall";
import { useGetNotifications } from "@/hooks/queries/notificationQueries/notis";
import { formatCustomDate } from "@/utils/formatCustomDate";

export function NotificationsDropdown() {
  const { currentUser } = useContext(Auth);
  const userId = currentUser.id;

  const { data: notifications, isLoading, error } = useGetNotifications(userId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" size="icon">
          <Bell />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 h-96 overflow-y-auto ">
        <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {isLoading ? (
            <div className="flex justify-center items-center">
              <LoadingSmall />
            </div>
          ) : error ? (
            <div className="text-red-500">Error loading notifications</div>
          ) : (
            notifications?.map((notification) => (
              <DropdownMenuItem key={notification.id}>
                <div className="">
                  <div className="flex items-center">
                    <MessageSquareWarningIcon size={21} />
                    <DropdownMenuLabel> {notification.title}</DropdownMenuLabel>
                  </div>

                  <span className="text-center">
                    {notification.description}
                  </span>
                  <div className="flex py-2">
                    <span className="text-muted-foreground text-end">{`Hace ${formatCustomDate(
                      notification.createdAt
                    )}`}</span>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
