import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Trash } from "lucide-react";
import { comment } from "@/models/comment";
import { useDeleteComment } from "@/hooks/taskQueries";

const CommentsOptions = ({ comentarioData }: { comentarioData: comment }) => {
    const { mutate} = useDeleteComment(comentarioData.id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        <Link to={"login"}>
                            {" "}
                            <span>Editar</span>
                        </Link>
                    </DropdownMenuItem> */}

          <DropdownMenuItem onClick={()=>mutate()}>
            <Trash className="mr-2 h-4 w-4" />

            <span>Eliminar</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CommentsOptions;
