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
  getFirstLesson,
} from "@/lib/course-lessons";

import {
  buildCourseProgress,
} from "@/lib/course-progress";

import {
  createClient,
} from "@/lib/supabase/server";


export async function enrollInCourse(
  formData: FormData
) {
  const courseSlug =
    String(
      formData.get(
        "courseSlug"
      ) ??
        ""
    ).trim();


  const course =
    getCourse(
      courseSlug
    );


  if (!course) {
    redirect(
      "/courses"
    );
  }


  const firstLesson =
    getFirstLesson(
      courseSlug
    );


  if (!firstLesson) {
    redirect(
      `/courses/${courseSlug}`
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
      `/login?next=${encodeURIComponent(
        `/courses/${courseSlug}`
      )}&message=${encodeURIComponent(
        "Sign in to start this course."
      )}`
    );
  }


  const now =
    new Date()
      .toISOString();


  const {
    error:
      enrolmentError,
  } =
    await supabase
      .from(
        "enrollments"
      )
      .upsert(
        {
          user_id:
            userId,

          course_slug:
            courseSlug,

          last_opened_at:
            now,
        },
        {
          onConflict:
            "user_id,course_slug",
        }
      );


  if (
    enrolmentError
  ) {
    redirect(
      `/courses/${courseSlug}?error=${encodeURIComponent(
        "We could not enrol you in this course. Please try again."
      )}`
    );
  }


  revalidatePath(
    "/dashboard"
  );

  revalidatePath(
    `/courses/${courseSlug}`
  );


  redirect(
    `/courses/${courseSlug}/learn/${firstLesson.key}`
  );
}


export async function continueCourse(
  formData: FormData
) {
  const courseSlug =
    String(
      formData.get(
        "courseSlug"
      ) ??
        ""
    ).trim();


  const course =
    getCourse(
      courseSlug
    );


  if (!course) {
    redirect(
      "/courses"
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
      `/login?next=${encodeURIComponent(
        `/courses/${courseSlug}`
      )}`
    );
  }


  const [
    enrolmentResult,
    progressResult,
    attemptsResult,
  ] =
    await Promise.all([

      supabase
        .from(
          "enrollments"
        )
        .select(
          "course_slug"
        )
        .eq(
          "user_id",
          userId
        )
        .eq(
          "course_slug",
          courseSlug
        )
        .maybeSingle(),

      supabase
        .from(
          "lesson_progress"
        )
        .select(
          "lesson_key"
        )
        .eq(
          "user_id",
          userId
        )
        .eq(
          "course_slug",
          courseSlug
        )
        .eq(
          "completed",
          true
        ),

      supabase
        .from(
          "assessment_attempts"
        )
        .select(
          "assessment_key"
        )
        .eq(
          "user_id",
          userId
        )
        .eq(
          "course_slug",
          courseSlug
        )
        .eq(
          "passed",
          true
        ),
    ]);


  if (
    !enrolmentResult
      .data
  ) {
    redirect(
      `/courses/${courseSlug}`
    );
  }


  const completedKeys =
    (
      progressResult
        .data ??
      []
    ).map(
      (item) =>
        item.lesson_key
    );


  const passedKeys =
    (
      attemptsResult
        .data ??
      []
    ).map(
      (item) =>
        item.assessment_key
    );


  const summary =
    buildCourseProgress(
      courseSlug,
      completedKeys,
      passedKeys
    );


  await supabase
    .from(
      "enrollments"
    )
    .update({
      last_opened_at:
        new Date()
          .toISOString(),
    })
    .eq(
      "user_id",
      userId
    )
    .eq(
      "course_slug",
      courseSlug
    );


  revalidatePath(
    "/dashboard"
  );

  revalidatePath(
    `/courses/${courseSlug}`
  );


  redirect(
    summary.nextHref
  );
}
