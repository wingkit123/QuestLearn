"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function approveUser(userId: number) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("user")
    .update({ account_status: "active" })
    .eq("user_id", userId);

  if (error) {
    console.error("Error approving user:", error);
    throw new Error("Failed to approve user");
  }
  revalidatePath("/admin");
}

export async function declineUser(userId: number) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("user")
    .update({ account_status: "deactivated" })
    .eq("user_id", userId);

  if (error) {
    console.error("Error declining user:", error);
    throw new Error("Failed to decline user");
  }
  revalidatePath("/admin");
}
