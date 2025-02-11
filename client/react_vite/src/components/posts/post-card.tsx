import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Avatar, AvatarFallback} from "@radix-ui/react-avatar";
import {TextHelper} from "@/helpers/text-helper.ts";
import moment from "moment";
import {TPostCard} from "@/pages/posts/my-posts.tsx";


export function PostCard({id, title, description, authorId, author, createdAt, updatedAt}: TPostCard) {

    const createdDate  = moment(createdAt).format('YYYY-MM-DD HH:mm:ss');
    const lastEdited = moment(updatedAt).fromNow();

    return (
        <>
            <Card className="w-[550px] my-2">
                <CardHeader>
                    <div className="flex justify-between">
                        <CardTitle className={'text-2xl'}>{title}</CardTitle>
                        <Button className={'ml-2'}>Edit</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <p className={'text-neutral-500 font-normal text-sm'}>{description}</p>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <div className="flex items-center  gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 ">
                            <AvatarFallback className="rounded-lg">{TextHelper.getInitials(author.username)}</AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">{author.username}</span>
                            <span className="truncate text-xs text-neutral-400">Last modified: {lastEdited}</span>
                            <span className="truncate text-xs text-neutral-400">Created: {createdDate}</span>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}