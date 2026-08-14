"use server";

import {
  revalidatePath,
} from "next/cache";

import {
  redirect,
} from "next/navigation";

import {
  createClient,
} from "@/lib/supabase/server";


const allowedSubjects =
  new Set([
    "statistics",
    "mathematics",
    "data-science",
    "bioinformatics",
    "computer-science",
  ]);


const allowedLevels =
  new Set([
    "high-school",
    "undergraduate",
    "postgraduate",
    "casual",
  ]);


export async function updateProfile(
  formData:
    FormData
) {

  const fullName =
    String(
      formData.get(
        "fullName"
      ) ??
        ""
    )
      .trim()
      .replace(
        /\s+/g,
        " "
      );


  const preferredSubject =
    String(
      formData.get(
        "preferredSubject"
      ) ??
        ""
    )
      .trim();


  const learnerLevel =
    String(
      formData.get(
        "learnerLevel"
      ) ??
        ""
    )
      .trim();


  if (
    fullName.length <
      2 ||
    fullName.length >
      100
  ) {
    redirect(
      `/account?error=${encodeURIComponent(
        "Please enter a valid name."
      )}`
    );
  }


  if (
    preferredSubject &&
    !allowedSubjects.has(
      preferredSubject
    )
  ) {
    redirect(
      `/account?error=${encodeURIComponent(
        "Please choose a valid subject."
      )}`
    );
  }


  if (
    learnerLevel &&
    !allowedLevels.has(
      learnerLevel
    )
  ) {
    redirect(
      `/account?error=${encodeURIComponent(
        "Please choose a valid learning level."
      )}`
    );
  }


  const supabase =
    await createClient();


  const {
    data:
      claimsData,
    error:
      claimsError,
  } =
    await supabase
      .auth
      .getClaims();


  const userId =
    typeof claimsData
      ?.claims
      ?.sub ===
    "string"
      ? claimsData
          .claims
          .sub
      : null;


  if (
    claimsError ||
    !userId
  ) {
    redirect(
      "/login?next=/account"
    );
  }


  const {
    error,
  } =
    await supabase
      .from(
        "profiles"
      )
      .upsert(
        {
          id:
            userId,

          full_name:
            fullName,

          preferred_subject:
            preferredSubject ||
            null,

          learner_level:
            learnerLevel ||
            null,

          updated_at:
            new Date()
              .toISOString(),
        },
        {
          onConflict:
            "id",
        }
      );


  if (error) {
    redirect(
      `/account?error=${encodeURIComponent(
        "We could not save your profile. Please try again."
      )}`
    );
  }


  revalidatePath(
    "/account"
  );

  revalidatePath(
    "/dashboard"
  );


  redirect(
    "/account?updated=1"
  );
}
