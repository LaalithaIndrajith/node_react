import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link, useNavigate} from "react-router";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import axios from 'axios';
import {PopupAlert} from "@/components/common/popup-alert.tsx";
import AlertType from "@/constants/alert-type.ts";
import {useEffect, useState} from "react";
import {AuthHelper} from "@/helpers/auth-helper.ts";


const registerFormSchema = z.object({
    email: z.string().email({message: "Please enter a valid email"}),
    username: z.string().min(1,{message: "Please enter a username"}),
    password: z.string().min(1, { message: 'Password is Required' }),
    confirmPassword: z
        .string()
        .min(1, { message: 'Please confirm your password' }),
}).superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Password is not the same as confirm password',
            path: ['confirmPassword'],
        })
    }
})

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function RegisterPage(){
    const [alert, setAlert] = useState<{ alertType: AlertType; titleText: string; description: string; isOpen: boolean, navigateTo?:string }>({
        alertType: AlertType.success,
        titleText: "",
        description: "",
        isOpen: false,
    });
    const navigate = useNavigate();
    useEffect(() => {
        if (AuthHelper.isAuthenticated())
            navigate("/home");
    }, []);

    const form= useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
        },
    })

    async function onSubmit(values: z.infer<typeof registerFormSchema>) {
        try{
            const userDetails = await axios.post(`${BACKEND_URL}/auth/register`,{
                    email: values.email,
                    username: values.username,
                    password: values.password,

                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )
            console.log(`✅ User registered successfully: ${userDetails.data}`);
            setAlert({
                alertType: AlertType.success,
                titleText: "User Registration",
                description: "User registered successfully",
                isOpen: true,
                navigateTo: '/'
            });
        }catch (err){
            if (axios.isAxiosError(err)) {
                console.error('❌ Error occurred:', err.response?.data.error);
                setAlert({
                    alertType: AlertType.warning,
                    titleText: "User Registration Unsuccessful",
                    description: err.response?.data.error || "Something went wrong",
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
                            <CardTitle className="text-2xl">Sign up</CardTitle>
                            <CardDescription>
                                Create an account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <div className="flex flex-col gap-5">
                                        <div className="grid gap-2">
                                            <FormField
                                                control={form.control}
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
                                                control={form.control}
                                                name="username"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Username</FormLabel>
                                                        <FormControl>
                                                            <Input style={{marginTop:4}} placeholder="John Doe" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <FormField
                                                control={form.control}
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
                                        <div className="grid gap-2">
                                            <FormField
                                                control={form.control}
                                                name="confirmPassword"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Confirm Password</FormLabel>
                                                        <FormControl>
                                                            <Input style={{marginTop:4}} type="password" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <Button type="submit" className="w-full">
                                            Sign up
                                        </Button>
                                    </div>
                                    <div className="mt-4 text-center text-sm">
                                        Already have an account?{" "}
                                        <Link to={'/'} className="underline underline-offset-4">
                                            Log in
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