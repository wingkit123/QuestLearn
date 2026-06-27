import { createClient } from "@/lib/supabase/server";
import type { RoleId } from "@/lib/constants";
import { ROLE_MAP } from "@/lib/constants";
import type { User, Role } from "@/types/database";

export type AuthUser = {
  authId: string;
  userId: number;
  email: string;
  fullName: string;
  role: RoleId;
  roleName: string;
  accountStatus: string;
};

/**
 * Get the current authenticated user with their QuestLearn role.
 * Returns null if not authenticated or user record not found.
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  const supabase = await createClient();

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) return null;

  // Fetch the QuestLearn user record with role
  const { data: userData } = await supabase
    .from("user")
    .select(`
      user_id,
      full_name,
      email,
      account_status,
      role:role_id (
        role_id,
        role_name
      )
    `)
    .eq("auth_user_id", authUser.id)
    .single();

  if (!userData) return null;

  const role = userData.role as unknown as Role;
  const roleId = ROLE_MAP[role.role_name];

  return {
    authId: authUser.id,
    userId: userData.user_id,
    email: userData.email,
    fullName: userData.full_name,
    role: roleId,
    roleName: role.role_name,
    accountStatus: userData.account_status,
  };
}

/**
 * Get role from user table for middleware (lightweight version).
 * Uses the provided supabase client instance instead of creating a new one.
 */
export async function getRoleForAuthId(
  supabase: ReturnType<typeof import("@supabase/ssr").createServerClient>,
  authUserId: string
): Promise<{ role: RoleId; accountStatus: string } | null> {
  const { data } = await supabase
    .from("user")
    .select(`
      account_status,
      role:role_id (
        role_name
      )
    `)
    .eq("auth_user_id", authUserId)
    .single();

  if (!data) return null;

  const role = data.role as unknown as { role_name: string };
  const roleId = ROLE_MAP[role.role_name as keyof typeof ROLE_MAP];

  return {
    role: roleId,
    accountStatus: data.account_status,
  };
}
