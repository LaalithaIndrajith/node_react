import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link, useNavigate} from "react-router";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import axios from "axios";
import AlertType from "@/constants/alert-type.ts";
import {PopupAlert} from "@/components/common/popup-alert.tsx";
import {useState} from "react";

const loginFormSchema = z.object({
    email: z.string().min(1, "Please enter a title").email({message: "Please enter a valid email"}),
    password: z.string().min(1,"Password is Required"),
})

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function LoginPage(){
    const [alert, setAlert] = useState<{ alertType: AlertType; titleText: string; description: string; isOpen: boolean, navigateTo?:string }>({
        alertType: AlertType.success,
        titleText: "",
        description: "",
        isOpen: false,
    });
    const navigate = useNavigate();
    const loginForm= useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof loginFormSchema>) {
        try{
            const authentication = await axios.post(`${BACKEND_URL}/auth/login`,{
                    email: values.email,
                    password: values.password,

                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )
            const userDetails =   {
                "authToken": authentication.data.token,
                "userId": authentication.data.user.id,
                "username": authentication.data.user.username,
                "email": authentication.data.user.email,
            }
            localStorage.setItem("userDetails", JSON.stringify(userDetails));
            navigate("/home");
        }catch (err){
            if (axios.isAxiosError(err)) {
                console.error('❌ Error occurred:', err.response?.data.error);
                setAlert({
                    alertType: AlertType.success,
                    titleText: "User Login",
                    description: err.response?.data.error,
                    isOpen: true,
                });
            } else {
                console.error('❌ Unknown error occurred:', err);
                setAlert({
                    alertType: AlertType.warning,
                    titleText: "User Registration Unsuccessful",
                    description: "Unknown error occurred. Please try again",
                    isOpen: true,
                });
            }
        }

    }

    return (
        <>
            <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Login</CardTitle>
                            <CardDescription>
                                Enter your email below to login to your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...loginForm}>
                                <form onSubmit={loginForm.handleSubmit(onSubmit)}>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <FormField
                                            control={loginForm.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input style={{marginTop:4}} placeholder="john@example.com" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <FormField
                                            control={loginForm.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Password</FormLabel>
                                                    <FormControl>
                                                        <Input style={{marginTop:4}} type="password" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Login
                                    </Button>
                                </div>
                                <div className="mt-4 text-center text-sm">
                                    Don&apos;t have an account?{" "}
                                    <Link to={'register'} className="underline underline-offset-4">
                                        Sign up
                                    </Link>
                                </div>
                            </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
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