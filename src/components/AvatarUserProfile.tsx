import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const AvatarUserProfile = ({
  src,
  nombre,
}: {
  src: string;
  nombre: string;
}) => {
  return (
    <Avatar className="h-28 w-28">
      <AvatarImage src={src} alt="userprofile" />
      <AvatarFallback className="text-3xl">{nombre.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};

export default AvatarUserProfile;
