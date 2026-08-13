"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";


function getValue(
  formData: FormData,
  key: string
) {
  return String(
    formData.get(key) ?? ""
  ).trim();
}


function safeNext(
  value: string
) {
  if (
    value.startsWith("/") &&
    !value.startsWith("//")
  ) {
    return value;
  }

  return "/dashboard";
}


/* ==========================================================================
   SIGN IN
   ========================================================================== */

export async function login(
  formData: FormData
) {
  const email = getValue(
    formData,
    "email"
  ).toLowerCase();

  const password = getValue(
    formData,
    "password"
  );

  const next = safeNext(
    getValue(
      formData,
      "next"
    )
  );


  if (!email || !password) {
    redirect(
      `/login?error=${encodeURIComponent(
        "Please enter your email and password."
      )}&next=${encodeURIComponent(
        next
      )}`
    );
  }


  const supabase =
    await createClient();


  const { error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });


  if (error) {
    redirect(
      `/login?error=${encodeURIComponent(
        error.message
      )}&next=${encodeURIComponent(
        next
      )}`
    );
  }


  revalidatePath(
    "/",
    "layout"
  );


  redirect(next);
}


/* ==========================================================================
   SIGN UP
   ========================================================================== */

export async function signup(
  formData: FormData
) {
  const fullName = getValue(
    formData,
    "fullName"
  );

  const email = getValue(
    formData,
    "email"
  ).toLowerCase();

  const password = getValue(
    formData,
    "password"
  );

  const next = safeNext(
    getValue(
      formData,
      "next"
    )
  );


  if (
    !fullName ||
    !email ||
    !password
  ) {
    redirect(
      `/login?mode=signup&error=${encodeURIComponent(
        "Please complete all required fields."
      )}&next=${encodeURIComponent(
        next
      )}`
    );
  }


  if (password.length < 8) {
    redirect(
      `/login?mode=signup&error=${encodeURIComponent(
        "Password must be at least 8 characters."
      )}&next=${encodeURIComponent(
        next
      )}`
    );
  }


  const supabase =
    await createClient();


  const { error } =
    await supabase.auth.signUp({
      email,
      password,

      options: {
        data: {
          full_name: fullName,
        },
      },
    });


  if (error) {
    redirect(
      `/login?mode=signup&error=${encodeURIComponent(
        error.message
      )}&next=${encodeURIComponent(
        next
      )}`
    );
  }


  redirect(
    `/login?message=${encodeURIComponent(
      "Account created. Please check your email to confirm your account."
    )}&next=${encodeURIComponent(
      next
    )}`
  );
}