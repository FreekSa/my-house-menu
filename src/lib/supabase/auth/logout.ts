"use server";

import "server-only";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

type LogoutState = string[] | undefined;

export async function logout(): Promise<LogoutState> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();
  if (error) {
    return [error.message];
  }

  revalidatePath("/", "layout");
  redirect("/");
}
