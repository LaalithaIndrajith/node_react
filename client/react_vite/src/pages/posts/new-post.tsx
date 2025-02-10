import {Separator} from "@radix-ui/react-separator";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import AlertType from "@/constants/alert-type.ts";
import {PopupAlert} from "@/components/common/popup-alert.tsx";
import {useState} from "react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {AuthHelper} from "@/helpers/auth-helper.ts";

const newPostFormSchema = z.object({
    title: z.string().min(1, "Please enter a title"),
    description: z.string().min(1, "Description is required"),
})

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


export function NewPostPage(){
    const [alert, setAlert] = useState<{ alertType: AlertType; titleText: string; description: string; isOpen: boolean, navigateTo?:string }>({
        alertType: AlertType.success,
        titleText: "",
        description: "",
        isOpen: false,
    });
    const newPostForm= useForm<z.infer<typeof newPostFormSchema>>({
        resolver: zodResolver(newPostFormSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    })
    async function onSubmit(values: z.infer<typeof newPostFormSchema>) {
        try{
            const authorId = AuthHelper.getAuthenticatedUserId()

            if (!authorId) {
                throw new Error("No authenticated user found!");
            }

            const newPost = await axios.post(`${BACKEND_URL}/posts/new`,{
                    title: values.title,
                    description: values.description,
                    authorId: authorId

                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )
            console.log(`✅ Post created successfully: ${JSON.stringify(newPost.data)}`);
            newPostForm.reset();
            setAlert({
                alertType: AlertType.success,
                titleText: "New Post",
                description: "New post created successfully",
                isOpen: true,
            });
        }catch (err){
            if (axios.isAxiosError(err)) {
                console.error('❌ Error occurred:', err.response?.data.error);
                setAlert({
                    alertType: AlertType.warning,
                    titleText: "New Post",
                    description: "Post creation failed",
                    isOpen: true,
                });
            } else {
                console.error('❌ Unknown error occurred:', err);
                setAlert({
                    alertType: AlertType.warning,
                    titleText: "New Post",
                    description: "Unknown error occurred. Please try again",
                    isOpen: true,
                });
            }
        }

    }

    return (
        <>
            <div className="h-full w-6/12 flex flex-col">
                <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
                    <h2 className="text-lg font-semibold">New Post</h2>
                </div>
                <Separator />
                <Form {...newPostForm}>
                    <form onSubmit={newPostForm.handleSubmit(onSubmit)}>
                        <div className="grid w-full max-w-sm items-center gap-1.5 mb-3">
                            <FormField
                                control={newPostForm.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input style={{marginTop:4}} placeholder="Title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <FormField
                                control={newPostForm.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Type something..."
                                                className="h-48"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Separator />
                        <div className="flex items-center space-x-2 my-3">
                            <Button type={"submit"}>Submit</Button>
                        </div>
                    </form>
                </Form>
            </div>
            <PopupAlert
                alertType={alert.alertType}
                titleText={alert.titleText}
                description={alert.description}
                isOpen={alert.isOpen}
                onClose={() => setAlert({ ...alert, isOpen: false })}
                navigateTo={alert.navigateTo}
            />
        </>
    )
}