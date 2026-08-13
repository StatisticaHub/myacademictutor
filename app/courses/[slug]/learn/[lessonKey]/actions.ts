"use server";

import {
  revalidatePath,
} from "next/cache";

import {
  redirect,
} from "next/navigation";

import {
  getCourse,
} from "@/lib/data";

import {
  getCourseLesson,
} from "@/lib/course-lessons";

import {
  createClient,
} from "@/lib/supabase/server";


function getValue(
  formData: FormData,
  key: string
) {
  return String(
    formData.get(key) ?? ""
  ).trim();
}


/* ==========================================================================
   COMPLETE LESSON
   ========================================================================== */

export async function completeLesson(
  formData: FormData
) {
  const courseSlug =
    getValue(
      formData,
      "courseSlug"
    );

  const lessonKey =
    getValue(
      formData,
      "lessonKey"
    );


  /* ------------------------------------------------------------------------
     VALIDATE COURSE + LESSON
     ------------------------------------------------------------------------ */

  const course =
    getCourse(courseSlug);

  const lesson =
    getCourseLesson(
      courseSlug,
      lessonKey
    );


  if (
    !course ||
    !lesson
  ) {
    redirect(
      "/courses"
    );
  }


  const lessonPath =
    `/courses/${courseSlug}/learn/${lessonKey}`;


  /* ------------------------------------------------------------------------
     AUTHENTICATION
     ------------------------------------------------------------------------ */

  const supabase =
    await createClient();


  const {
    data: claimsData,
    error: claimsError,
  } =
    await supabase.auth.getClaims();


  const userId =
    typeof claimsData
      ?.claims
      ?.sub === "string"
      ? claimsData.claims.sub
      : null;


  if (
    claimsError ||
    !userId
  ) {
    redirect(
      `/login?next=${encodeURIComponent(
        lessonPath
      )}`
    );
  }


  /* ------------------------------------------------------------------------
     VERIFY ENROLMENT
     ------------------------------------------------------------------------ */

  const {
    data: enrolment,
  } =
    await supabase
      .from("enrollments")
      .select("course_slug")
      .eq(
        "user_id",
        userId
      )
      .eq(
        "course_slug",
        courseSlug
      )
      .maybeSingle();


  if (!enrolment) {
    redirect(
      `/courses/${courseSlug}`
    );
  }


  /* ------------------------------------------------------------------------
     SAVE PROGRESS
     ------------------------------------------------------------------------ */

  const now =
    new Date()
      .toISOString();


  const {
    error: progressError,
  } =
    await supabase
      .from("lesson_progress")
      .upsert(
        {
          user_id:
            userId,

          course_slug:
            courseSlug,

          lesson_key:
            lessonKey,

          completed:
            true,

          completed_at:
            now,

          updated_at:
            now,
        },
        {
          onConflict:
            "user_id,course_slug,lesson_key",
        }
      );


  if (progressError) {
    redirect(
      `${lessonPath}?error=${encodeURIComponent(
        "We could not save your progress. Please try again."
      )}`
    );
  }


  /* ------------------------------------------------------------------------
     UPDATE RECENT COURSE ACTIVITY
     ------------------------------------------------------------------------ */

  await supabase
    .from("enrollments")
    .update({
      last_opened_at:
        now,
    })
    .eq(
      "user_id",
      userId
    )
    .eq(
      "course_slug",
      courseSlug
    );


  /* ------------------------------------------------------------------------
     REFRESH
     ------------------------------------------------------------------------ */

  revalidatePath(
    lessonPath
  );

  revalidatePath(
    "/dashboard"
  );

  revalidatePath(
    `/courses/${courseSlug}`
  );
}