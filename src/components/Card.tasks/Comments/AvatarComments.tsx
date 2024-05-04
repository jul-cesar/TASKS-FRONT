import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { user } from "@/models/User"

type AvatarCommentsProps = {
    src: string | undefined
    author: user
}


export function AvatarComments({ src, author }: AvatarCommentsProps) {

    return (
        <Avatar>
            <AvatarImage src={src} alt="userprofile" />
            <AvatarFallback>{author.name?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
    )
}
