"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithEmail } from "./action";

import { LucideLoader2, LucideLogIn } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/router";

const initialState = {
  message: "",
  success: false,
};

export default function LoginPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    signInWithEmail,
    initialState,
  );

  useEffect(() => {
    if (state.success && state.message != "") {
      toast.success(state.message);
      router.push("/app");
    }

    if (!state.success && state.message != "") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Card className="border-primary/50 from-primary/10 to-background ring-primary/20 w-full max-w-sm bg-linear-to-bl ring-4">
      <CardHeader>
        <CardTitle className="text-2xl">Log In</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="grid gap-4">
          {state.success == false && state.message != "" ? (
            <p className="border-destructive text-destructive w-full overflow-hidden rounded-md border border-dashed p-4 text-sm font-bold">
              {state.message}
            </p>
          ) : null}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="user@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              name="password"
              placeholder="Password"
              minLength={8}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit" disabled={isPending}>
            Log In
            {isPending ? (
              <LucideLoader2 className="ml-2 size-3.5 animate-spin" />
            ) : (
              <LucideLogIn className="ml-2 size-3.5" />
            )}
          </Button>
        </CardFooter>
        <CardFooter>
          <p className="border-primary/50 bg-background text-muted-foreground w-full overflow-hidden rounded-md border border-dashed p-2 text-center text-sm font-bold">
            Don&apos;t have an account?
            <Button
              variant="link"
              asChild
              className="text-muted-foreground p-1 text-sm font-bold"
            >
              <Link href="/signup" className="underline">
                Sign Up Here
              </Link>
            </Button>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
