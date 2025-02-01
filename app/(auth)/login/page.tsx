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

const initialState = {
  message: "",
  success: false,
};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    signInWithEmail,
    initialState,
  );

  useEffect(() => {
    if (!state.success && state.message != "") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Card className="w-full max-w-sm bg-muted/25">
      <CardHeader>
        <CardTitle className="text-2xl">Log In</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="grid gap-4">
          {state.message != "" ? (
            <p className="w-full overflow-hidden rounded-xl border border-dashed border-destructive p-4 text-xs font-bold text-destructive">
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
            {isPending ? (
              <LucideLoader2 className="mr-2 size-3.5 animate-spin" />
            ) : (
              <LucideLogIn className="mr-2 size-3.5" />
            )}
            Log In
          </Button>
        </CardFooter>
        <CardFooter>
          <p className="w-full overflow-hidden rounded-xl border border-dashed bg-background p-2 text-center text-sm text-xs font-bold text-muted-foreground">
            Don&apos;t have an account?
            <Button
              variant="link"
              asChild
              className="p-1 text-xs font-bold text-muted-foreground"
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
