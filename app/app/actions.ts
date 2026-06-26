"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deletePlace(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const id = String(formData.get("id") ?? "").trim();

  if (!id) {
    throw new Error("Invalid place.");
  }

  const { error } = await supabase.from("places").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/app");
}
