"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { UserPlus, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";

type RoleOption = "Student" | "Instructor";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<RoleOption>("Student");
  const [studentNo, setStudentNo] = useState("");
  const [staffNo, setStaffNo] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();

    // 1. Create Supabase Auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
        },
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    if (!authData.user) {
      setError("Registration failed. Please try again.");
      setLoading(false);
      return;
    }

    // 2. Create QuestLearn user record + profile
    // Students are immediately active; Instructors are pending
    const accountStatus = role === "Student" ? "active" : "pending";

    // Get role_id
    const { data: roleData } = await supabase
      .from("role")
      .select("role_id")
      .eq("role_name", role)
      .single();

    if (!roleData) {
      setError("Role configuration error. Please contact support.");
      setLoading(false);
      return;
    }

    // Insert user record
    const { data: userData, error: userError } = await supabase
      .from("user")
      .insert({
        auth_user_id: authData.user.id,
        role_id: roleData.role_id,
        full_name: fullName,
        email: email,
        account_status: accountStatus,
      })
      .select("user_id")
      .single();

    if (userError) {
      setError("Failed to create user profile: " + userError.message);
      setLoading(false);
      return;
    }

    // Insert role-specific profile
    if (role === "Student") {
      const { error: profileError } = await supabase
        .from("student_profile")
        .insert({
          user_id: userData.user_id,
          student_no: studentNo || `STU-${Date.now()}`,
        });

      if (profileError) {
        setError("Failed to create student profile: " + profileError.message);
        setLoading(false);
        return;
      }
    } else {
      const { error: profileError } = await supabase
        .from("instructor_profile")
        .insert({
          user_id: userData.user_id,
          staff_no: staffNo || `INS-${Date.now()}`,
        });

      if (profileError) {
        setError(
          "Failed to create instructor profile: " + profileError.message
        );
        setLoading(false);
        return;
      }
    }

    // Redirect based on status
    if (accountStatus === "pending") {
      router.push("/pending");
    } else {
      router.push("/");
    }
    router.refresh();
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-text mb-1">Create account</h2>
      <p className="text-text-muted text-sm mb-6">
        Register as a Student or Instructor
      </p>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-danger-bg text-danger text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Role selector */}
        <div>
          <label className="block text-sm font-medium text-text mb-1.5">
            I am a...
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(["Student", "Instructor"] as RoleOption[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                  role === r
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-bg-page text-text hover:border-primary/50"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-text mb-1.5"
          >
            Full name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            placeholder="Your full name"
            className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg-page text-text text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow"
          />
        </div>

        <div>
          <label
            htmlFor="regEmail"
            className="block text-sm font-medium text-text mb-1.5"
          >
            Email address
          </label>
          <input
            id="regEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg-page text-text text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow"
          />
        </div>

        {/* Role-specific ID field */}
        <div>
          <label
            htmlFor="idNumber"
            className="block text-sm font-medium text-text mb-1.5"
          >
            {role === "Student" ? "Student ID" : "Staff ID"}
          </label>
          <input
            id="idNumber"
            type="text"
            value={role === "Student" ? studentNo : staffNo}
            onChange={(e) =>
              role === "Student"
                ? setStudentNo(e.target.value)
                : setStaffNo(e.target.value)
            }
            placeholder={
              role === "Student" ? "e.g. STU-001" : "e.g. INS-001"
            }
            className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg-page text-text text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow"
          />
        </div>

        <div>
          <label
            htmlFor="regPassword"
            className="block text-sm font-medium text-text mb-1.5"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="regPassword"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="Min. 6 characters"
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg-page text-text text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {role === "Instructor" && (
          <div className="p-3 rounded-lg bg-warning-bg text-warning text-sm">
            Instructor accounts require admin approval before you can access the
            platform.
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <UserPlus className="w-4 h-4" />
          )}
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-text-muted">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-primary font-medium hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
