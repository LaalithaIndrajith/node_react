import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router";

export  function RegisterPage(){
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
                            <form>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">Email</Label>
                                        </div>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">Password</Label>
                                        </div>
                                        <Input id="password" type="password" required />
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">Confirm Password</Label>
                                        </div>
                                        <Input id="password" type="password" required />
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
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}