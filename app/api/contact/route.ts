import { NextResponse } from "next/server";


/* ==========================================================================
   TYPES
   ========================================================================== */

type ContactPayload = {
  enquiryType?: unknown;
  name?: unknown;
  email?: unknown;
  subjectArea?: unknown;
  level?: unknown;
  topic?: unknown;
  goal?: unknown;
  timing?: unknown;
  message?: unknown;

  /*
   * Honeypot field.
   * Real users should never fill this.
   */
  website?: unknown;
};


type RateLimitRecord = {
  count: number;
  resetAt: number;
};


/* ==========================================================================
   RATE LIMIT
   ========================================================================== */

const RATE_LIMIT_WINDOW =
  10 * 60 * 1000;

const RATE_LIMIT_MAX =
  5;


const rateLimitStore =
  new Map<
    string,
    RateLimitRecord
  >();


function getClientIp(
  request: Request
) {
  const forwarded =
    request.headers.get(
      "x-forwarded-for"
    );

  if (forwarded) {
    return (
      forwarded
        .split(",")[0]
        ?.trim() ||
      "unknown"
    );
  }

  return (
    request.headers.get(
      "x-real-ip"
    ) ||
    "unknown"
  );
}


function isRateLimited(
  ip: string
) {
  const now =
    Date.now();

  const current =
    rateLimitStore.get(ip);


  if (
    !current ||
    current.resetAt <= now
  ) {
    rateLimitStore.set(
      ip,
      {
        count: 1,
        resetAt:
          now +
          RATE_LIMIT_WINDOW,
      }
    );

    return false;
  }


  if (
    current.count >=
    RATE_LIMIT_MAX
  ) {
    return true;
  }


  current.count += 1;

  rateLimitStore.set(
    ip,
    current
  );


  return false;
}


/* ==========================================================================
   CLEANING
   ========================================================================== */

function cleanSingleLine(
  value: unknown,
  maxLength = 200
) {
  if (
    typeof value !==
    "string"
  ) {
    return "";
  }


  return value
    .trim()
    .replace(
      /\s+/g,
      " "
    )
    .slice(
      0,
      maxLength
    );
}


function cleanMultiline(
  value: unknown,
  maxLength = 4000
) {
  if (
    typeof value !==
    "string"
  ) {
    return "";
  }


  return value
    .trim()
    .replace(
      /\r\n/g,
      "\n"
    )
    .slice(
      0,
      maxLength
    );
}


function isValidEmail(
  value: string
) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    value
  );
}


/* ==========================================================================
   HTML SAFETY
   ========================================================================== */

function escapeHtml(
  value: string
) {
  return value
    .replaceAll(
      "&",
      "&amp;"
    )
    .replaceAll(
      "<",
      "&lt;"
    )
    .replaceAll(
      ">",
      "&gt;"
    )
    .replaceAll(
      '"',
      "&quot;"
    )
    .replaceAll(
      "'",
      "&#039;"
    );
}


function htmlValue(
  value: string
) {
  return value
    ? escapeHtml(value)
    : "Not provided";
}


/* ==========================================================================
   EMAIL TEMPLATE
   ========================================================================== */

function buildEmailHtml(
  data: {
    enquiryType: string;
    name: string;
    email: string;
    subjectArea: string;
    level: string;
    topic: string;
    goal: string;
    timing: string;
    message: string;
    submissionId: string;
  }
) {
  return `
<!doctype html>

<html>
  <body
    style="
      margin:0;
      padding:0;
      background:#f5f2eb;
      font-family:Arial,Helvetica,sans-serif;
      color:#171717;
    "
  >
    <div
      style="
        max-width:680px;
        margin:0 auto;
        padding:38px 20px;
      "
    >
      <div
        style="
          background:#111111;
          color:#ffffff;
          padding:28px;
          border-radius:18px 18px 0 0;
        "
      >
        <div
          style="
            font-size:11px;
            letter-spacing:2px;
            text-transform:uppercase;
            color:#a6a19a;
            margin-bottom:14px;
          "
        >
          My Academic Tutor
        </div>

        <h1
          style="
            margin:0;
            font-size:28px;
            line-height:1.15;
            font-weight:600;
          "
        >
          New website enquiry
        </h1>
      </div>


      <div
        style="
          background:#ffffff;
          padding:30px;
          border-radius:0 0 18px 18px;
        "
      >
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          style="
            border-collapse:collapse;
          "
        >
          ${emailRow(
            "Enquiry type",
            data.enquiryType
          )}

          ${emailRow(
            "Name",
            data.name
          )}

          ${emailRow(
            "Email",
            data.email
          )}

          ${emailRow(
            "Subject area",
            data.subjectArea
          )}

          ${emailRow(
            "Level",
            data.level
          )}

          ${emailRow(
            "Topic",
            data.topic
          )}

          ${emailRow(
            "Goal",
            data.goal
          )}

          ${emailRow(
            "Timing",
            data.timing
          )}
        </table>


        <div
          style="
            margin-top:28px;
            padding-top:24px;
            border-top:1px solid #e8e3da;
          "
        >
          <div
            style="
              margin-bottom:8px;
              font-size:11px;
              font-weight:700;
              text-transform:uppercase;
              letter-spacing:1.2px;
              color:#716d67;
            "
          >
            Message
          </div>

          <div
            style="
              font-size:14px;
              line-height:1.7;
              white-space:pre-wrap;
            "
          >${htmlValue(
            data.message
          )}</div>
        </div>


        <div
          style="
            margin-top:28px;
            padding-top:18px;
            border-top:1px solid #e8e3da;
            font-size:10px;
            color:#9a958d;
          "
        >
          Submission ID:
          ${escapeHtml(
            data.submissionId
          )}
        </div>
      </div>
    </div>
  </body>
</html>
`;
}


function emailRow(
  label: string,
  value: string
) {
  return `
<tr>
  <td
    style="
      width:145px;
      padding:10px 0;
      border-bottom:1px solid #eee9e1;
      vertical-align:top;
      font-size:11px;
      font-weight:700;
      color:#77716a;
    "
  >
    ${escapeHtml(label)}
  </td>

  <td
    style="
      padding:10px 0;
      border-bottom:1px solid #eee9e1;
      vertical-align:top;
      font-size:13px;
      color:#191919;
    "
  >
    ${htmlValue(value)}
  </td>
</tr>
`;
}


/* ==========================================================================
   TEXT VERSION
   ========================================================================== */

function buildEmailText(
  data: {
    enquiryType: string;
    name: string;
    email: string;
    subjectArea: string;
    level: string;
    topic: string;
    goal: string;
    timing: string;
    message: string;
    submissionId: string;
  }
) {
  return `
NEW MY ACADEMIC TUTOR ENQUIRY

Enquiry type: ${data.enquiryType}
Name: ${data.name}
Email: ${data.email}
Subject area: ${data.subjectArea || "Not provided"}
Level: ${data.level || "Not provided"}
Topic: ${data.topic || "Not provided"}
Goal: ${data.goal}
Timing: ${data.timing || "Not provided"}

MESSAGE
-------
${data.message || "Not provided"}

Submission ID: ${data.submissionId}
`.trim();
}


/* ==========================================================================
   POST
   ========================================================================== */

export async function POST(
  request: Request
) {
  try {
    /* ----------------------------------------------------------------------
       Parse body
       ---------------------------------------------------------------------- */

    let body: ContactPayload;


    try {
      body =
        await request.json();
    } catch {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Invalid request.",
        },
        {
          status: 400,
        }
      );
    }


    /* ----------------------------------------------------------------------
       Honeypot
       ---------------------------------------------------------------------- */

    const website =
      cleanSingleLine(
        body.website,
        300
      );


    if (website) {
      /*
       * Pretend success so bots
       * do not learn that they
       * were detected.
       */

      return NextResponse.json(
        {
          ok: true,
        }
      );
    }


    /* ----------------------------------------------------------------------
       Rate limit
       ---------------------------------------------------------------------- */

    const ip =
      getClientIp(
        request
      );


    if (
      isRateLimited(ip)
    ) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Too many enquiries have been submitted. Please try again later.",
        },
        {
          status: 429,
        }
      );
    }


    /* ----------------------------------------------------------------------
       Clean fields
       ---------------------------------------------------------------------- */

    const enquiryType =
      cleanSingleLine(
        body.enquiryType,
        100
      );

    const name =
      cleanSingleLine(
        body.name,
        120
      );

    const email =
      cleanSingleLine(
        body.email,
        200
      ).toLowerCase();

    const subjectArea =
      cleanSingleLine(
        body.subjectArea,
        120
      );

    const level =
      cleanSingleLine(
        body.level,
        120
      );

    const topic =
      cleanSingleLine(
        body.topic,
        200
      );

    const goal =
      cleanSingleLine(
        body.goal,
        500
      );

    const timing =
      cleanSingleLine(
        body.timing,
        150
      );

    const message =
      cleanMultiline(
        body.message,
        4000
      );


    /* ----------------------------------------------------------------------
       Validate required fields
       ---------------------------------------------------------------------- */

    if (
      !enquiryType ||
      !name ||
      !email ||
      !goal
    ) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Please complete all required fields.",
        },
        {
          status: 400,
        }
      );
    }


    if (
      !isValidEmail(
        email
      )
    ) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Please enter a valid email address.",
        },
        {
          status: 400,
        }
      );
    }


    /* ----------------------------------------------------------------------
       Environment configuration
       ---------------------------------------------------------------------- */

    const resendApiKey =
      process.env
        .RESEND_API_KEY;

    const contactToEmail =
      process.env
        .CONTACT_TO_EMAIL;

    const contactFromEmail =
      process.env
        .CONTACT_FROM_EMAIL;


    if (
      !resendApiKey ||
      !contactToEmail ||
      !contactFromEmail
    ) {
      console.error(
        "Contact email configuration is incomplete."
      );


      return NextResponse.json(
        {
          ok: false,

          error:
            "Contact delivery is temporarily unavailable. Please try again later.",
        },
        {
          status: 503,
        }
      );
    }


    /* ----------------------------------------------------------------------
       Build enquiry
       ---------------------------------------------------------------------- */

    const submissionId =
      crypto.randomUUID();


    const enquiry = {
      enquiryType,
      name,
      email,
      subjectArea,
      level,
      topic,
      goal,
      timing,
      message,
      submissionId,
    };


    const subject =
      [
        "[My Academic Tutor]",
        enquiryType,

        topic
          ? `— ${topic}`
          : "",
      ]
        .filter(Boolean)
        .join(" ");


    const from =
      contactFromEmail.includes(
        "<"
      )
        ? contactFromEmail
        : `My Academic Tutor <${contactFromEmail}>`;


    /* ----------------------------------------------------------------------
       Send via Resend
       ---------------------------------------------------------------------- */

    const resendResponse =
      await fetch(
        "https://api.resend.com/emails",
        {
          method: "POST",

          headers: {
            Authorization:
              `Bearer ${resendApiKey}`,

            "Content-Type":
              "application/json",

            /*
             * Prevent accidental duplicate
             * sends if the same request is
             * retried.
             */
            "Idempotency-Key":
              submissionId,
          },

          body:
            JSON.stringify({
              from,

              to: [
                contactToEmail,
              ],

              /*
               * Clicking Reply in your
               * inbox replies directly
               * to the learner.
               */
              reply_to:
                email,

              subject,

              text:
                buildEmailText(
                  enquiry
                ),

              html:
                buildEmailHtml(
                  enquiry
                ),
            }),
        }
      );


    const resendData =
      await resendResponse
        .json()
        .catch(
          () => null
        );


    if (
      !resendResponse.ok
    ) {
      console.error(
        "Resend contact delivery failed:",
        resendData
      );


      return NextResponse.json(
        {
          ok: false,

          error:
            "We could not send your enquiry. Please try again shortly.",
        },
        {
          status: 502,
        }
      );
    }


    /* ----------------------------------------------------------------------
       Success
       ---------------------------------------------------------------------- */

    return NextResponse.json(
      {
        ok: true,

        submissionId,

        emailId:
          resendData?.id ??
          null,
      }
    );
  } catch (error) {
    console.error(
      "Unexpected contact route error:",
      error
    );


    return NextResponse.json(
      {
        ok: false,

        error:
          "Something went wrong. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}


/* ==========================================================================
   OTHER METHODS
   ========================================================================== */

export async function GET() {
  return NextResponse.json(
    {
      ok: false,
      error:
        "Method not allowed.",
    },
    {
      status: 405,
    }
  );
}