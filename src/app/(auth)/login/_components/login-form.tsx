"use client";

import { useActionState } from "react";
import { CircleAlert } from "lucide-react";

import { authenticate } from "@/lib/supabase/auth/authenticate";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const [errorMessages, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <form action={formAction}>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        <Button aria-disabled={isPending} type="submit" className="w-full">
          Login
        </Button>
        {errorMessages &&
          errorMessages.map((message, index) => (
            <div
              key={index}
              className="flex h-4 items-end space-x-1 text-red-500"
              aria-live="polite"
              aria-atomic="true"
            >
              <CircleAlert className="h-5 w-5" />
              <p className="text-sm">{message}</p>
            </div>
          ))}
      </div>
    </form>
  );
}
