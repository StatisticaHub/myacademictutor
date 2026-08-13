"use client";

import {
  useState,
} from "react";

import Link from "next/link";

import type {
  AssessmentResult,
  AssessmentType,
  PublicAssessmentQuestion,
} from "@/lib/assessments/types";

import {
  submitAssessment,
} from "@/app/courses/[slug]/assessment/[assessmentKey]/actions";


type AssessmentRunnerProps = {
  courseSlug: string;
  assessmentKey: string;
  assessmentType: AssessmentType;
  title: string;
  description: string;
  passingPercentage: number;
  questions: PublicAssessmentQuestion[];
  previousBest: number | null;
};


export default function AssessmentRunner({
  courseSlug,
  assessmentKey,
  assessmentType,
  title,
  description,
  passingPercentage,
  questions,
  previousBest,
}: AssessmentRunnerProps) {

  const [
    answers,
    setAnswers,
  ] =
    useState<number[]>(
      Array.from(
        {
          length:
            questions.length,
        },
        () => -1
      )
    );


  const [
    submitting,
    setSubmitting,
  ] =
    useState(false);


  const [
    result,
    setResult,
  ] =
    useState<
      AssessmentResult | null
    >(null);


  const isFinal =
    assessmentType ===
    "final-assessment";


  const answeredCount =
    answers.filter(
      (answer) =>
        answer >= 0
    ).length;


  const allAnswered =
    answeredCount ===
    questions.length;


  function chooseAnswer(
    questionIndex: number,
    optionIndex: number
  ) {
    if (result) {
      return;
    }


    setAnswers(
      (
        current
      ) => {

        const updated =
          [...current];


        updated[
          questionIndex
        ] =
          optionIndex;


        return updated;
      }
    );
  }


  async function handleSubmit() {
    if (
      !allAnswered ||
      submitting
    ) {
      return;
    }


    setSubmitting(
      true
    );


    const submission =
      await submitAssessment(
        courseSlug,
        assessmentKey,
        answers
      );


    setResult(
      submission
    );


    setSubmitting(
      false
    );
  }


  function resetAssessment() {
    setAnswers(
      Array.from(
        {
          length:
            questions.length,
        },
        () => -1
      )
    );


    setResult(
      null
    );


    window.scrollTo({
      top: 0,
      behavior:
        "smooth",
    });
  }


  return (
    <div className="assessment-runner">

      <section className="assessment-hero">

        <span>
          {isFinal
            ? "Final course assessment"
            : "Module assessment"}
        </span>

        <h1>
          {title}
        </h1>

        <p>
          {description}
        </p>


        <div className="assessment-meta">

          <div>
            <span>
              Questions
            </span>

            <strong>
              {questions.length}
            </strong>
          </div>


          <div>
            <span>
              Pass mark
            </span>

            <strong>
              {passingPercentage}%
            </strong>
          </div>


          <div>
            <span>
              Previous best
            </span>

            <strong>
              {previousBest ===
              null
                ? "—"
                : `${previousBest.toFixed(
                    0
                  )}%`}
            </strong>
          </div>

        </div>

      </section>


      {!result && (
        <div className="assessment-progress">

          <div>

            <span>
              {answeredCount} of{" "}
              {questions.length} answered
            </span>


            <strong>
              {Math.round(
                (
                  answeredCount /
                  questions.length
                ) *
                  100
              )}
              %
            </strong>

          </div>


          <div className="assessment-progress-track">

            <div
              style={{
                width:
                  `${
                    (
                      answeredCount /
                      questions.length
                    ) *
                    100
                  }%`,
              }}
            />

          </div>

        </div>
      )}


      <div className="assessment-question-list">

        {questions.map(
          (
            question,
            questionIndex
          ) => {

            const reviewItem =
              result?.review?.[
                questionIndex
              ];


            return (
              <article
                className="assessment-question-card"
                key={
                  question.id
                }
              >

                <div className="assessment-question-heading">

                  <span>
                    Question{" "}
                    {questionIndex +
                      1}
                  </span>

                  <h2>
                    {question.question}
                  </h2>

                </div>


                <div className="assessment-options">

                  {question.options.map(
                    (
                      option,
                      optionIndex
                    ) => {

                      const selected =
                        answers[
                          questionIndex
                        ] ===
                        optionIndex;


                      const correct =
                        reviewItem &&
                        reviewItem
                          .correctIndex ===
                          optionIndex;


                      const incorrectSelected =
                        reviewItem &&
                        selected &&
                        !reviewItem.correct;


                      const classes = [
                        "assessment-option",

                        selected
                          ? "selected"
                          : "",

                        correct
                          ? "correct"
                          : "",

                        incorrectSelected
                          ? "incorrect"
                          : "",
                      ]
                        .filter(
                          Boolean
                        )
                        .join(
                          " "
                        );


                      return (
                        <button
                          key={
                            `${question.id}-${optionIndex}`
                          }
                          type="button"
                          className={
                            classes
                          }
                          disabled={
                            Boolean(
                              result
                            )
                          }
                          onClick={() =>
                            chooseAnswer(
                              questionIndex,
                              optionIndex
                            )
                          }
                        >

                          <span className="assessment-option-letter">
                            {String.fromCharCode(
                              65 +
                                optionIndex
                            )}
                          </span>


                          <span>
                            {option}
                          </span>

                        </button>
                      );
                    }
                  )}

                </div>


                {reviewItem && (
                  <div
                    className={[
                      "assessment-feedback",

                      reviewItem.correct
                        ? "correct"
                        : "incorrect",
                    ].join(
                      " "
                    )}
                  >

                    <strong>
                      {reviewItem.correct
                        ? "Correct"
                        : "Review this question"}
                    </strong>


                    <p>
                      {
                        reviewItem
                          .explanation
                      }
                    </p>

                  </div>
                )}

              </article>
            );
          }
        )}

      </div>


      {!result && (
        <section className="assessment-submit-panel">

          <div>

            <span>
              Ready to submit?
            </span>

            <p>
              You must answer every
              question before your
              assessment can be graded.
            </p>

          </div>


          <button
            type="button"
            disabled={
              !allAnswered ||
              submitting
            }
            onClick={
              handleSubmit
            }
          >
            {submitting
              ? "Marking assessment..."
              : isFinal
                ? "Submit final assessment"
                : "Submit checkpoint"}
          </button>

        </section>
      )}


      {result && (
        <section
          className={[
            "assessment-result",

            result.passed
              ? "passed"
              : "not-passed",
          ].join(
            " "
          )}
        >

          {!result.success ? (

            <>
              <span>
                Submission problem
              </span>

              <h2>
                We could not save your
                assessment.
              </h2>

              <p>
                {result.message}
              </p>

              <button
                type="button"
                onClick={
                  resetAssessment
                }
              >
                Try again
              </button>
            </>

          ) : (

            <>

              <span>
                {result.passed
                  ? isFinal
                    ? "Final assessment passed"
                    : "Checkpoint passed"
                  : isFinal
                    ? "Final assessment not yet passed"
                    : "Checkpoint not yet passed"}
              </span>


              <h2>
                {result.score}/
                {result.maxScore}
              </h2>


              <strong className="assessment-result-percentage">
                {result.percentage?.toFixed(
                  1
                )}
                %
              </strong>


              <p>
                {result.passed
                  ? isFinal
                    ? "Well done. Your final assessment result has been recorded and the course completion requirement is satisfied."
                    : "Well done. This checkpoint has been recorded as passed."
                  : `You need ${passingPercentage}% to pass. Review the explanations above and try again when ready.`}
              </p>


              <div className="assessment-result-actions">

                {!result.passed && (
                  <button
                    type="button"
                    onClick={
                      resetAssessment
                    }
                  >
                    {isFinal
                      ? "Retake final assessment"
                      : "Retake checkpoint"}
                  </button>
                )}


                {isFinal &&
                  result.passed && (
                    <Link
                      href={`/courses/${courseSlug}/complete`}
                    >
                      View course completion
                    </Link>
                  )}


                <Link
                  href={`/courses/${courseSlug}`}
                >
                  {result.passed &&
                  !isFinal
                    ? "Continue course"
                    : "Course overview"}
                </Link>


                <Link
                  href="/dashboard"
                >
                  Dashboard
                </Link>

              </div>

            </>

          )}

        </section>
      )}

    </div>
  );
}
