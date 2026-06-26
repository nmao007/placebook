"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { categories, statuses } from "../../place-fields";

export async function updatePlace(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const id = String(formData.get("id") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const country = String(formData.get("country") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();
  const status = String(formData.get("status") ?? "Saved");
  const category = String(formData.get("category") ?? "Other");
  const favorite = formData.get("favorite") === "on";

  if (
    !id ||
    !name ||
    !statuses.includes(status as (typeof statuses)[number]) ||
    !categories.includes(category as (typeof categories)[number])
  ) {
    throw new Error("Invalid place.");
  }

  const { error } = await supabase
    .from("places")
    .update({
      name,
      country,
      notes,
      status,
      category,
      favorite,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/app");
  redirect("/app");
}
