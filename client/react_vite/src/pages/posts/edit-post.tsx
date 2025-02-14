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
import {useEffect, useState} from "react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {AuthHelper} from "@/helpers/auth-helper.ts";
import {useParams} from "react-router";

const editPostFormSchema = z.object({
    title: z.string().min(1, "Please enter a title"),
    description: z.string().min(1, "Description is required"),
})

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


export function EditPostPage(){
    const { postId } = useParams();
    const [alert, setAlert] = useState<{ alertType: AlertType; titleText: string; description: string; isOpen: boolean, navigateTo?:string }>({
        alertType: AlertType.success,
        titleText: "",
        description: "",
        isOpen: false,
    });
    const editPostForm= useForm<z.infer<typeof editPostFormSchema>>({
        resolver: zodResolver(editPostFormSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    })

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const BEARER_TOKEN = AuthHelper.getAuthToken()
                const response = await axios.get(`${BACKEND_URL}/posts/edit/${postId}`, {
                    headers: {
                        'Authorization': `Bearer ${BEARER_TOKEN}`
                    }
                });
                editPostForm.reset(response.data);
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };

        fetchPost();
    }, [postId, editPostForm]);



    async function onSubmit(values: z.infer<typeof editPostFormSchema>) {
        try{
            const BEARER_TOKEN = AuthHelper.getAuthToken()

            if (!BEARER_TOKEN) {
                throw new Error("Authentication failed");
            }

            const editedPost = await axios.put(`${BACKEND_URL}/posts/edit/${postId}`,{
                    title: values.title,
                    description: values.description,

                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${BEARER_TOKEN}`
                    }
                }
            )
            console.log(`✅ Post edited successfully: ${JSON.stringify(editedPost.data)}`);
            setAlert({
                alertType: AlertType.success,
                titleText: "Edit Post",
                description: "The changes has been saved successfully",
                isOpen: true,
            });
        }catch (err){
            if (axios.isAxiosError(err)) {
                console.error('❌ Error occurred:', err.response?.data.error);
                setAlert({
                    alertType: AlertType.warning,
                    titleText: "Edit Post",
                    description: "Save changes failed",
                    isOpen: true,
                });
            } else {
                console.error('❌ Unknown error occurred:', err);
                setAlert({
                    alertType: AlertType.warning,
                    titleText: "Edit Post",
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
                    <h2 className="text-lg font-semibold">Edit Post</h2>
                </div>
                <Separator />
                <Form {...editPostForm}>
                    <form onSubmit={editPostForm.handleSubmit(onSubmit)}>
                        <div className="grid w-full max-w-sm items-center gap-1.5 mb-3">
                            <FormField
                                control={editPostForm.control}
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
                                control={editPostForm.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Type something..." className="h-48" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Separator />
                        <div className="flex items-center space-x-2 my-3">
                            <Button type={"submit"}>Save Changes</Button>
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