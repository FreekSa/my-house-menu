"use server";

import "server-only";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as v from "valibot";

import { createClient } from "@/utils/supabase/server";

const AuthenticateInputSchema = v.object({
  email: v.pipe(v.string(), v.email()),
  password: v.pipe(v.string(), v.minLength(6)),
});

type AuthenticateState = string[] | undefined;

export async function authenticate(
  prevState: AuthenticateState,
  formData: FormData
): Promise<AuthenticateState> {
  const supabase = await createClient();

  const input = Object.fromEntries(formData);
  const parsedCredentials = v.safeParse(AuthenticateInputSchema, input);
  if (parsedCredentials.success) {
    const { email, password } = parsedCredentials.output;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return [error.message];
    }
  } else {
    return parsedCredentials.issues.map((issue) => issue.message);
  }

  revalidatePath("/", "layout");
  redirect("/");
}
