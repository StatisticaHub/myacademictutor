"use client";

import {
  useState,
} from "react";

import type {
  QuizQuestion,
} from "@/lib/lesson-content";


type LessonQuizProps = {
  questions: QuizQuestion[];
};


export default function LessonQuiz({
  questions,
}: LessonQuizProps) {
  const [
    answers,
    setAnswers,
  ] =
    useState<
      Array<number | null>
    >(
      () =>
        questions.map(
          () => null
        )
    );

  const [
    checked,
    setChecked,
  ] =
    useState(false);


  const allAnswered =
    answers.every(
      (answer) =>
        answer !== null
    );


  const score =
  answers.reduce<number>(
    (
      total,
      answer,
      index
    ) => {
      return (
        total +
        (
          answer ===
          questions[index].correctIndex
            ? 1
            : 0
        )
      );
    },
    0
  );


  function chooseAnswer(
    questionIndex: number,
    optionIndex: number
  ) {
    setAnswers(
      (current) => {
        const next =
          [...current];

        next[
          questionIndex
        ] =
          optionIndex;

        return next;
      }
    );

    setChecked(false);
  }


  function resetQuiz() {
    setAnswers(
      questions.map(
        () => null
      )
    );

    setChecked(false);
  }


  return (
    <div className="lesson-quiz">

      {questions.map(
        (
          question,
          questionIndex
        ) => {

          const selected =
            answers[
              questionIndex
            ];


          return (
            <article
              key={
                question.question
              }
              className="lesson-quiz-question"
            >

              <div className="lesson-quiz-question-heading">

                <span>
                  Question{" "}
                  {questionIndex + 1}
                </span>

                <h3>
                  {
                    question.question
                  }
                </h3>

              </div>


              <div className="lesson-quiz-options">

                {question.options.map(
                  (
                    option,
                    optionIndex
                  ) => {

                    const isSelected =
                      selected ===
                      optionIndex;

                    const isCorrect =
                      checked &&
                      optionIndex ===
                        question.correctIndex;

                    const isIncorrect =
                      checked &&
                      isSelected &&
                      optionIndex !==
                        question.correctIndex;


                    const classes = [
                      "lesson-quiz-option",

                      isSelected
                        ? "selected"
                        : "",

                      isCorrect
                        ? "correct"
                        : "",

                      isIncorrect
                        ? "incorrect"
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ");


                    return (
                      <label
                        key={
                          option
                        }
                        className={
                          classes
                        }
                      >

                        <input
                          type="radio"
                          name={`question-${questionIndex}`}
                          value={
                            optionIndex
                          }
                          checked={
                            isSelected
                          }
                          onChange={() =>
                            chooseAnswer(
                              questionIndex,
                              optionIndex
                            )
                          }
                        />

                        <span className="lesson-quiz-letter">
                          {String.fromCharCode(
                            65 +
                              optionIndex
                          )}
                        </span>

                        <span>
                          {option}
                        </span>

                      </label>
                    );
                  }
                )}

              </div>


              {checked && (
                <div className="lesson-quiz-explanation">

                  <strong>
                    {selected ===
                    question.correctIndex
                      ? "Correct"
                      : "Review this one"}
                  </strong>

                  <p>
                    {
                      question.explanation
                    }
                  </p>

                </div>
              )}

            </article>
          );
        }
      )}


      <div className="lesson-quiz-actions">

        <button
          type="button"
          className="button"
          disabled={
            !allAnswered
          }
          onClick={() =>
            setChecked(true)
          }
        >
          Check answers
        </button>


        {checked && (
          <button
            type="button"
            className="button button-outline"
            onClick={
              resetQuiz
            }
          >
            Try again
          </button>
        )}

      </div>


      {checked && (
        <div
          className="lesson-quiz-result"
          aria-live="polite"
        >
          <span>
            Quiz result
          </span>

          <strong>
            {score}
            {" / "}
            {questions.length}
          </strong>

          <p>
            {score ===
            questions.length
              ? "Excellent. You answered every question correctly."
              : "Review the explanations above, then try the quiz again when you are ready."}
          </p>
        </div>
      )}

    </div>
  );
}