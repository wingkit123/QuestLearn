"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createUser(payload: {
  fullName: string;
  email: string;
  roleName: string;
  staffNo?: string;
  studentNo?: string;
}) {
  const supabase = await createClient();

  // 1. Get role_id
  const { data: roleData, error: roleError } = await supabase
    .from("role")
    .select("role_id")
    .eq("role_name", payload.roleName)
    .single();

  if (roleError || !roleData) {
    throw new Error("Invalid role selected");
  }

  // Generate a mock auth UUID
  const mockAuthId = crypto.randomUUID();

  // 2. Insert into user table
  const { data: newUser, error: userError } = await supabase
    .from("user")
    .insert({
      auth_user_id: mockAuthId,
      role_id: roleData.role_id,
      full_name: payload.fullName,
      email: payload.email.trim().toLowerCase(),
      account_status: "active",
    })
    .select("user_id")
    .single();

  if (userError) {
    throw new Error("Failed to insert user row: " + userError.message);
  }

  // 3. Create profile depending on role
  if (payload.roleName === "Student") {
    const { error: profileError } = await supabase
      .from("student_profile")
      .insert({
        user_id: newUser.user_id,
        student_no: payload.studentNo || `STU-${Date.now()}`,
        academic_level: "Year 1",
        programme: "Degree in Computer Science",
        department: "Computer Science",
      });
    if (profileError) throw new Error("Failed to create student profile: " + profileError.message);
  } else if (payload.roleName === "Instructor") {
    const { error: profileError } = await supabase
      .from("instructor_profile")
      .insert({
        user_id: newUser.user_id,
        staff_no: payload.staffNo || `INS-${Date.now()}`,
        specialization: "General Software Engineering",
      });
    if (profileError) throw new Error("Failed to create instructor profile: " + profileError.message);
  } else if (payload.roleName === "Academic Advisor") {
    const { error: profileError } = await supabase
      .from("advisor_profile")
      .insert({
        user_id: newUser.user_id,
        staff_no: payload.staffNo || `ADV-${Date.now()}`,
        department: "Computer Science",
      });
    if (profileError) throw new Error("Failed to create advisor profile: " + profileError.message);
  }

  revalidatePath("/admin/users");
}

export async function updateUserStatus(userId: number, status: "active" | "suspended") {
  const supabase = await createClient();
  const { error } = await supabase
    .from("user")
    .update({ account_status: status })
    .eq("user_id", userId);

  if (error) {
    throw new Error("Failed to update status: " + error.message);
  }
  revalidatePath("/admin/users");
}

export async function deleteUser(userId: number) {
  const supabase = await createClient();
  // Deleting user will cascade delete their profiles due to ON DELETE CASCADE
  const { error } = await supabase
    .from("user")
    .delete()
    .eq("user_id", userId);

  if (error) {
    throw new Error("Failed to delete user: " + error.message);
  }
  revalidatePath("/admin/users");
}
