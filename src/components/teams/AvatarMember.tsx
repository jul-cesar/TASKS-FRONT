import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AvatarMember({
  src,
  nombre,
}: {
  src?: string;
  nombre: string;
}) {
  return (
    <Avatar className="w-12 h-12 rounded-full">
      <AvatarImage src={src} alt="userprofile" />
      <AvatarFallback>{nombre.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
