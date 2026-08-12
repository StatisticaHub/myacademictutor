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


  if (!email || !password) {
    redirect(
      "/login?error=Please%20enter%20your%20email%20and%20password."
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
      )}`
    );
  }


  revalidatePath(
    "/",
    "layout"
  );

  redirect(
    "/dashboard"
  );
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


  if (
    !fullName ||
    !email ||
    !password
  ) {
    redirect(
      "/login?mode=signup&error=Please%20complete%20all%20required%20fields."
    );
  }


  if (password.length < 8) {
    redirect(
      "/login?mode=signup&error=Password%20must%20be%20at%20least%208%20characters."
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
      )}`
    );
  }


  redirect(
    "/login?message=Account%20created.%20Please%20check%20your%20email%20to%20confirm%20your%20account."
  );
}