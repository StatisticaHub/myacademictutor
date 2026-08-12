"use client";

import {
  FormEvent,
  useState,
} from "react";

import Icon from "@/components/Icon";


/* ==========================================================================
   TYPES
   ========================================================================== */

type FormState = {
  enquiryType: string;
  name: string;
  email: string;
  subjectArea: string;
  level: string;
  topic: string;
  goal: string;
  timing: string;
  message: string;

  /*
   * Honeypot.
   * Real visitors should never fill this.
   */
  website: string;
};


type SubmitState =
  | "idle"
  | "submitting"
  | "success"
  | "error";


/* ==========================================================================
   INITIAL STATE
   ========================================================================== */

const initialForm: FormState = {
  enquiryType: "",
  name: "",
  email: "",
  subjectArea: "",
  level: "",
  topic: "",
  goal: "",
  timing: "",
  message: "",
  website: "",
};


/* ==========================================================================
   OPTIONS
   ========================================================================== */

const enquiryTypes = [
  {
    value: "Tutoring",
    label: "Expert tutoring",
  },
  {
    value: "Course guidance",
    label: "Course guidance",
  },
  {
    value: "Learning pathway",
    label: "Learning pathway",
  },
  {
    value: "Research or postgraduate support",
    label:
      "Research or postgraduate support",
  },
  {
    value: "Technical support",
    label: "Technical support",
  },
  {
    value: "Partnership or institution",
    label: "Partnership or institution",
  },
  {
    value: "General enquiry",
    label: "General enquiry",
  },
];


const subjectOptions = [
  "Statistics",
  "Mathematics",
  "Data Science",
  "Bioinformatics",
  "Computer Science",
  "Multiple subjects",
  "Not sure yet",
];


const levelOptions = [
  "School",
  "Undergraduate",
  "Postgraduate",
  "Learn for Yourself",
  "Professional / Research",
  "Not sure yet",
];


const timingOptions = [
  "As soon as possible",
  "Within the next week",
  "Within the next month",
  "Planning ahead",
  "No specific deadline",
];


/* ==========================================================================
   HELPERS
   ========================================================================== */

function validEmail(
  email: string
) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email
  );
}


/* ==========================================================================
   COMPONENT
   ========================================================================== */

export default function ContactForm() {
  const [
    form,
    setForm,
  ] =
    useState<FormState>(
      initialForm
    );


  const [
    submitState,
    setSubmitState,
  ] =
    useState<SubmitState>(
      "idle"
    );


  const [
    errorMessage,
    setErrorMessage,
  ] =
    useState("");


  const [
    submissionId,
    setSubmissionId,
  ] =
    useState("");


  /* ==========================================================================
     FIELD UPDATE
     ========================================================================== */

  function updateField(
    field: keyof FormState,
    value: string
  ) {
    setForm(
      (current) => ({
        ...current,
        [field]: value,
      })
    );


    if (
      submitState ===
      "error"
    ) {
      setSubmitState(
        "idle"
      );

      setErrorMessage("");
    }
  }


  /* ==========================================================================
     SUBMIT
     ========================================================================== */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();


    /* ----------------------------------------------------------------------
       Basic client validation
       ---------------------------------------------------------------------- */

    if (
      !form.enquiryType ||
      !form.name.trim() ||
      !form.email.trim() ||
      !form.goal.trim()
    ) {
      setSubmitState(
        "error"
      );

      setErrorMessage(
        "Please complete the required fields before sending your enquiry."
      );

      return;
    }


    if (
      !validEmail(
        form.email.trim()
      )
    ) {
      setSubmitState(
        "error"
      );

      setErrorMessage(
        "Please enter a valid email address."
      );

      return;
    }


    setSubmitState(
      "submitting"
    );

    setErrorMessage("");


    try {
      const response =
        await fetch(
          "/api/contact",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                enquiryType:
                  form.enquiryType,

                name:
                  form.name.trim(),

                email:
                  form.email.trim(),

                subjectArea:
                  form.subjectArea,

                level:
                  form.level,

                topic:
                  form.topic.trim(),

                goal:
                  form.goal.trim(),

                timing:
                  form.timing,

                message:
                  form.message.trim(),

                website:
                  form.website,
              }),
          }
        );


      const data =
        await response
          .json()
          .catch(
            () => null
          );


      if (
        !response.ok ||
        !data?.ok
      ) {
        throw new Error(
          data?.error ||
            "We could not send your enquiry. Please try again."
        );
      }


      setSubmissionId(
        data.submissionId ||
          ""
      );

      setSubmitState(
        "success"
      );

      setForm(
        initialForm
      );
    } catch (error) {
      setSubmitState(
        "error"
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  }


  /* ==========================================================================
     SUCCESS
     ========================================================================== */

  if (
    submitState ===
    "success"
  ) {
    return (
      <div
        className="contact-form-success"
        role="status"
      >
        <div className="contact-success-icon">
          <Icon
            name="check"
            size={20}
          />
        </div>

        <span className="eyebrow">
          Enquiry sent
        </span>

        <h2>
          Thanks for getting
          <br />
          in touch.
        </h2>

        <p>
          Your enquiry has been
          received. We&apos;ll review
          what you&apos;re looking for
          and respond using the email
          address you provided.
        </p>

        {submissionId && (
          <div className="contact-submission-reference">
            <span>
              Reference
            </span>

            <code>
              {submissionId}
            </code>
          </div>
        )}

        <button
          type="button"
          className="button button-outline"
          onClick={() => {
            setSubmitState(
              "idle"
            );

            setSubmissionId(
              ""
            );
          }}
        >
          Send another enquiry
        </button>
      </div>
    );
  }


  /* ==========================================================================
     FORM
     ========================================================================== */

  return (
    <form
      className="contact-enquiry-form"
      onSubmit={
        handleSubmit
      }
      noValidate
    >
      {/* ==================================================================
          HONEYPOT
         ================================================================== */}

      <div
        className="contact-honeypot"
        aria-hidden="true"
      >
        <label htmlFor="website">
          Website
        </label>

        <input
          id="website"
          name="website"
          type="text"
          value={
            form.website
          }
          onChange={(event) =>
            updateField(
              "website",
              event.target.value
            )
          }
          autoComplete="off"
          tabIndex={-1}
        />
      </div>


      {/* ==================================================================
          01 — ENQUIRY TYPE
         ================================================================== */}

      <section className="contact-form-section">
        <div className="contact-form-section-heading">
          <span>
            01
          </span>

          <div>
            <strong>
              What can we help
              with?
            </strong>

            <p>
              Choose the option that
              best describes your
              enquiry.
            </p>
          </div>
        </div>


        <div className="contact-form-field">
          <label htmlFor="enquiryType">
            Enquiry type
            <em>
              Required
            </em>
          </label>

          <select
            id="enquiryType"
            name="enquiryType"
            required
            value={
              form.enquiryType
            }
            onChange={(event) =>
              updateField(
                "enquiryType",
                event.target.value
              )
            }
          >
            <option value="">
              Select an enquiry type
            </option>

            {enquiryTypes.map(
              (option) => (
                <option
                  key={
                    option.value
                  }
                  value={
                    option.value
                  }
                >
                  {option.label}
                </option>
              )
            )}
          </select>
        </div>
      </section>


      {/* ==================================================================
          02 — YOUR DETAILS
         ================================================================== */}

      <section className="contact-form-section">
        <div className="contact-form-section-heading">
          <span>
            02
          </span>

          <div>
            <strong>
              Your details
            </strong>

            <p>
              Tell us who we&apos;re
              speaking with and where
              we should reply.
            </p>
          </div>
        </div>


        <div className="contact-form-grid">
          <div className="contact-form-field">
            <label htmlFor="name">
              Name
              <em>
                Required
              </em>
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={
                form.name
              }
              onChange={(event) =>
                updateField(
                  "name",
                  event.target.value
                )
              }
              placeholder="Your name"
              autoComplete="name"
              maxLength={120}
              required
            />
          </div>


          <div className="contact-form-field">
            <label htmlFor="email">
              Email
              <em>
                Required
              </em>
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={
                form.email
              }
              onChange={(event) =>
                updateField(
                  "email",
                  event.target.value
                )
              }
              placeholder="you@example.com"
              autoComplete="email"
              maxLength={200}
              required
            />
          </div>
        </div>
      </section>


      {/* ==================================================================
          03 — LEARNING CONTEXT
         ================================================================== */}

      <section className="contact-form-section">
        <div className="contact-form-section-heading">
          <span>
            03
          </span>

          <div>
            <strong>
              Learning context
            </strong>

            <p>
              A little context helps
              us give you a more useful
              response.
            </p>
          </div>
        </div>


        <div className="contact-form-grid">
          <div className="contact-form-field">
            <label htmlFor="subjectArea">
              Subject
            </label>

            <select
              id="subjectArea"
              name="subjectArea"
              value={
                form.subjectArea
              }
              onChange={(event) =>
                updateField(
                  "subjectArea",
                  event.target.value
                )
              }
            >
              <option value="">
                Select a subject
              </option>

              {subjectOptions.map(
                (subject) => (
                  <option
                    key={
                      subject
                    }
                    value={
                      subject
                    }
                  >
                    {subject}
                  </option>
                )
              )}
            </select>
          </div>


          <div className="contact-form-field">
            <label htmlFor="level">
              Level
            </label>

            <select
              id="level"
              name="level"
              value={
                form.level
              }
              onChange={(event) =>
                updateField(
                  "level",
                  event.target.value
                )
              }
            >
              <option value="">
                Select your level
              </option>

              {levelOptions.map(
                (level) => (
                  <option
                    key={
                      level
                    }
                    value={
                      level
                    }
                  >
                    {level}
                  </option>
                )
              )}
            </select>
          </div>
        </div>


        <div className="contact-form-field">
          <label htmlFor="topic">
            Topic or course
          </label>

          <input
            id="topic"
            name="topic"
            type="text"
            value={
              form.topic
            }
            onChange={(event) =>
              updateField(
                "topic",
                event.target.value
              )
            }
            placeholder="For example: regression, Python, calculus, RNA-seq..."
            maxLength={200}
          />
        </div>
      </section>


      {/* ==================================================================
          04 — GOAL
         ================================================================== */}

      <section className="contact-form-section">
        <div className="contact-form-section-heading">
          <span>
            04
          </span>

          <div>
            <strong>
              What would you like
              to achieve?
            </strong>

            <p>
              Describe the outcome
              you&apos;re working
              towards.
            </p>
          </div>
        </div>


        <div className="contact-form-field">
          <label htmlFor="goal">
            Your goal
            <em>
              Required
            </em>
          </label>

          <textarea
            id="goal"
            name="goal"
            value={
              form.goal
            }
            onChange={(event) =>
              updateField(
                "goal",
                event.target.value
              )
            }
            placeholder="Tell us what you want to understand, prepare for, complete or improve."
            rows={5}
            maxLength={500}
            required
          />

          <div className="contact-field-counter">
            {form.goal.length}
            /500
          </div>
        </div>
      </section>


      {/* ==================================================================
          05 — TIMING + MESSAGE
         ================================================================== */}

      <section className="contact-form-section">
        <div className="contact-form-section-heading">
          <span>
            05
          </span>

          <div>
            <strong>
              Anything else?
            </strong>

            <p>
              Add timing or other
              information that could
              help us understand the
              enquiry.
            </p>
          </div>
        </div>


        <div className="contact-form-field">
          <label htmlFor="timing">
            Timing
          </label>

          <select
            id="timing"
            name="timing"
            value={
              form.timing
            }
            onChange={(event) =>
              updateField(
                "timing",
                event.target.value
              )
            }
          >
            <option value="">
              Select if relevant
            </option>

            {timingOptions.map(
              (timing) => (
                <option
                  key={
                    timing
                  }
                  value={
                    timing
                  }
                >
                  {timing}
                </option>
              )
            )}
          </select>
        </div>


        <div className="contact-form-field">
          <label htmlFor="message">
            Additional details
          </label>

          <textarea
            id="message"
            name="message"
            value={
              form.message
            }
            onChange={(event) =>
              updateField(
                "message",
                event.target.value
              )
            }
            placeholder="Add any useful background, questions or requirements."
            rows={7}
            maxLength={4000}
          />

          <div className="contact-field-counter">
            {form.message.length}
            /4000
          </div>
        </div>
      </section>


      {/* ==================================================================
          ERROR
         ================================================================== */}

      {submitState ===
        "error" && (
        <div
          className="contact-form-error"
          role="alert"
        >
          <strong>
            We couldn&apos;t send
            your enquiry.
          </strong>

          <p>
            {errorMessage}
          </p>
        </div>
      )}


      {/* ==================================================================
          SUBMIT
         ================================================================== */}

      <div className="contact-form-submit">
        <div>
          <strong>
            Ready to send?
          </strong>

          <p>
            We&apos;ll use the
            information you provide
            only to handle your
            enquiry in line with our
            Privacy Notice.
          </p>
        </div>

        <button
          type="submit"
          className="button"
          disabled={
            submitState ===
            "submitting"
          }
        >
          {submitState ===
          "submitting"
            ? "Sending..."
            : "Send enquiry"}

          {submitState !==
            "submitting" && (
            <Icon
              name="arrow"
              size={16}
            />
          )}
        </button>
      </div>
    </form>
  );
}