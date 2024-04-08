import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Auth } from "@/context/auth";

import { useContext } from "react";

export function AvatarDemo({ src }: { src: string }) {
  const { currentUser } = useContext(Auth);
  return (
    <Avatar>
      <AvatarImage src={src} alt="userprofile" />
      <AvatarFallback>
        {currentUser.nombre.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
