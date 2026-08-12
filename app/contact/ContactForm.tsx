"use client";

import {
  type FormEvent,
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
};


type SubmitState =
  | "idle"
  | "submitting"
  | "success"
  | "error";


/* ==========================================================================
   OPTIONS
   ========================================================================== */

const enquiryTypes = [
  "Tutoring",
  "Course enquiry",
  "Learning direction",
  "Research learning",
  "Partnership",
  "Technical issue",
  "General enquiry",
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
  "High School",
  "Undergraduate",
  "Postgraduate",
  "Learn for Yourself",
  "Professional / Research",
  "Not sure",
];


const timingOptions = [
  "As soon as possible",
  "Within the next week",
  "Within the next month",
  "Planning ahead",
  "No specific deadline",
];


const initialState: FormState = {
  enquiryType: "",
  name: "",
  email: "",
  subjectArea: "",
  level: "",
  topic: "",
  goal: "",
  timing: "",
  message: "",
};


/* ==========================================================================
   COMPONENT
   ========================================================================== */

export default function ContactForm() {
  const [
    form,
    setForm,
  ] = useState<FormState>(
    initialState
  );

  const [
    submitState,
    setSubmitState,
  ] = useState<SubmitState>(
    "idle"
  );

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");


  /* ------------------------------------------------------------------------
     Update helper
     ------------------------------------------------------------------------ */

  function updateField(
    field: keyof FormState,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (
      submitState === "error"
    ) {
      setSubmitState("idle");
      setErrorMessage("");
    }
  }


  /* ------------------------------------------------------------------------
     Submit
     ------------------------------------------------------------------------ */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSubmitState(
      "submitting"
    );

    setErrorMessage("");


    /*
     * Keep these conventional fields:
     *
     * name
     * email
     * subject
     * message
     *
     * even though we also send richer structured information.
     *
     * This keeps the form easier to integrate with a simple
     * contact API or email service.
     */

    const subject = [
      form.enquiryType,
      form.subjectArea,
    ]
      .filter(Boolean)
      .join(" — ");


    const structuredMessage = [
      `Enquiry type: ${
        form.enquiryType ||
        "Not specified"
      }`,

      `Subject area: ${
        form.subjectArea ||
        "Not specified"
      }`,

      `Level: ${
        form.level ||
        "Not specified"
      }`,

      `Topic / challenge: ${
        form.topic ||
        "Not specified"
      }`,

      `Goal: ${
        form.goal ||
        "Not specified"
      }`,

      `Timing: ${
        form.timing ||
        "Not specified"
      }`,

      "",
      "Additional details:",
      form.message ||
        "No additional details provided.",
    ].join("\n");


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

            body: JSON.stringify({
              /*
               * Basic fields for
               * backwards compatibility
               */
              name: form.name,
              email: form.email,
              subject:
                subject ||
                "Website enquiry",
              message:
                structuredMessage,

              /*
               * Structured fields
               */
              enquiryType:
                form.enquiryType,

              subjectArea:
                form.subjectArea,

              level:
                form.level,

              topic:
                form.topic,

              goal:
                form.goal,

              timing:
                form.timing,

              additionalMessage:
                form.message,
            }),
          }
        );


      const responseData =
        await response
          .json()
          .catch(() => null);


      if (!response.ok) {
        const message =
          responseData?.error ||
          responseData?.message ||
          "We couldn't send your enquiry. Please try again.";

        throw new Error(message);
      }


      setSubmitState(
        "success"
      );

      setForm(
        initialState
      );
    } catch (error) {
      console.error(
        "Contact form error:",
        error
      );

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


  /* ------------------------------------------------------------------------
     Success state
     ------------------------------------------------------------------------ */

  if (
    submitState === "success"
  ) {
    return (
      <div className="contact-form-success">
        <span className="contact-form-success-icon">
          <Icon
            name="check"
            size={22}
          />
        </span>

        <span className="eyebrow">
          Enquiry received
        </span>

        <h3>
          Thanks for getting in touch.
        </h3>

        <p>
          Your enquiry has been submitted.
          We&apos;ll use the information
          you provided to understand what
          kind of response or support is
          most appropriate.
        </p>

        <button
          type="button"
          className="button button-outline"
          onClick={() => {
            setSubmitState(
              "idle"
            );

            setErrorMessage("");
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
      className="form-card contact-enquiry-form"
      onSubmit={handleSubmit}
    >
      {/* ------------------------------------------------------------------
          Form introduction
         ------------------------------------------------------------------ */}

      <div className="contact-enquiry-form-head">
        <span className="eyebrow">
          Enquiry details
        </span>

        <h3>
          How can we help?
        </h3>

        <p>
          Fields marked with * are
          required. The extra context
          helps us understand your
          request before responding.
        </p>
      </div>


      {/* ==================================================================
          1. ENQUIRY TYPE
         ================================================================== */}

      <div className="contact-form-section">
        <div className="contact-form-section-head">
          <span>
            01
          </span>

          <div>
            <strong>
              Type of enquiry
            </strong>

            <small>
              What is the main reason
              you are contacting us?
            </small>
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="enquiryType">
            Enquiry type *
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
                  key={option}
                  value={option}
                >
                  {option}
                </option>
              )
            )}
          </select>
        </div>
      </div>


      {/* ==================================================================
          2. CONTACT DETAILS
         ================================================================== */}

      <div className="contact-form-section">
        <div className="contact-form-section-head">
          <span>
            02
          </span>

          <div>
            <strong>
              Your details
            </strong>

            <small>
              So we know who we are
              responding to.
            </small>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="name">
              Name *
            </label>

            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Your name"
              value={form.name}
              onChange={(event) =>
                updateField(
                  "name",
                  event.target.value
                )
              }
            />
          </div>


          <div className="form-field">
            <label htmlFor="email">
              Email *
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              value={form.email}
              onChange={(event) =>
                updateField(
                  "email",
                  event.target.value
                )
              }
            />
          </div>
        </div>
      </div>


      {/* ==================================================================
          3. LEARNING CONTEXT
         ================================================================== */}

      <div className="contact-form-section">
        <div className="contact-form-section-head">
          <span>
            03
          </span>

          <div>
            <strong>
              Learning context
            </strong>

            <small>
              Tell us where your
              enquiry sits academically.
            </small>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-field">
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
                (option) => (
                  <option
                    key={option}
                    value={option}
                  >
                    {option}
                  </option>
                )
              )}
            </select>
          </div>


          <div className="form-field">
            <label htmlFor="level">
              Current level
            </label>

            <select
              id="level"
              name="level"
              value={form.level}
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
                (option) => (
                  <option
                    key={option}
                    value={option}
                  >
                    {option}
                  </option>
                )
              )}
            </select>
          </div>
        </div>


        <div className="form-field">
          <label htmlFor="topic">
            Topic or challenge
          </label>

          <input
            id="topic"
            name="topic"
            type="text"
            placeholder="For example: logistic regression, RNA-seq, calculus, Python debugging..."
            value={form.topic}
            onChange={(event) =>
              updateField(
                "topic",
                event.target.value
              )
            }
          />

          <small className="form-help">
            A specific topic helps us
            understand your request more
            quickly.
          </small>
        </div>
      </div>


      {/* ==================================================================
          4. GOAL
         ================================================================== */}

      <div className="contact-form-section">
        <div className="contact-form-section-head">
          <span>
            04
          </span>

          <div>
            <strong>
              Your goal
            </strong>

            <small>
              What would a useful
              outcome look like?
            </small>
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="goal">
            What are you trying to achieve? *
          </label>

          <textarea
            id="goal"
            name="goal"
            required
            rows={4}
            placeholder="For example: understand a university module, prepare for an exam, learn a research method, build career skills..."
            value={form.goal}
            onChange={(event) =>
              updateField(
                "goal",
                event.target.value
              )
            }
          />
        </div>
      </div>


      {/* ==================================================================
          5. TIMING
         ================================================================== */}

      <div className="contact-form-section">
        <div className="contact-form-section-head">
          <span>
            05
          </span>

          <div>
            <strong>
              Timing
            </strong>

            <small>
              Is there an important
              deadline or timeframe?
            </small>
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="timing">
            Preferred timing
          </label>

          <select
            id="timing"
            name="timing"
            value={form.timing}
            onChange={(event) =>
              updateField(
                "timing",
                event.target.value
              )
            }
          >
            <option value="">
              Select a timeframe
            </option>

            {timingOptions.map(
              (option) => (
                <option
                  key={option}
                  value={option}
                >
                  {option}
                </option>
              )
            )}
          </select>
        </div>
      </div>


      {/* ==================================================================
          6. ADDITIONAL DETAIL
         ================================================================== */}

      <div className="contact-form-section">
        <div className="contact-form-section-head">
          <span>
            06
          </span>

          <div>
            <strong>
              Anything else?
            </strong>

            <small>
              Add any context that
              would help us understand
              the enquiry.
            </small>
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="message">
            Additional details
          </label>

          <textarea
            id="message"
            name="message"
            rows={6}
            placeholder="Include any other useful context. Please do not submit sensitive personal data or confidential datasets through this form."
            value={form.message}
            onChange={(event) =>
              updateField(
                "message",
                event.target.value
              )
            }
          />
        </div>
      </div>


      {/* ==================================================================
          ERROR STATE
         ================================================================== */}

      {submitState ===
        "error" && (
        <div
          className="contact-form-error"
          role="alert"
        >
          <span>
            !
          </span>

          <div>
            <strong>
              We couldn&apos;t send
              your enquiry.
            </strong>

            <p>
              {errorMessage}
            </p>
          </div>
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
            By submitting this form,
            you are asking us to
            respond to your enquiry
            using the contact details
            provided.
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