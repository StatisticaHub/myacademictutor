import { NextResponse } from "next/server";
import nodemailer from "nodemailer";


/* ==========================================================================
   RUNTIME
   ========================================================================== */

export const runtime = "nodejs";


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
  website?: unknown;
};


type RateLimitRecord = {
  count: number;
  resetAt: number;
};


/* ==========================================================================
   BASIC RATE LIMIT
   ========================================================================== */

const RATE_LIMIT_WINDOW =
  10 * 60 * 1000;

const RATE_LIMIT_MAX =
  5;


const rateLimitStore =
  new Map<string, RateLimitRecord>();


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


function displayValue(
  value: string
) {
  return value
    ? escapeHtml(value)
    : "Not provided";
}


/* ==========================================================================
   EMAIL TABLE ROW
   ========================================================================== */

function emailRow(
  label: string,
  value: string
) {
  return `
    <tr>
      <td
        style="
          width:150px;
          padding:11px 0;
          border-bottom:1px solid #eee9e1;
          vertical-align:top;
          color:#77716a;
          font-size:11px;
          font-weight:700;
        "
      >
        ${escapeHtml(label)}
      </td>

      <td
        style="
          padding:11px 0;
          border-bottom:1px solid #eee9e1;
          vertical-align:top;
          color:#181818;
          font-size:13px;
        "
      >
        ${displayValue(value)}
      </td>
    </tr>
  `;
}


/* ==========================================================================
   EMAIL HTML
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
      color:#171717;
      font-family:Arial,Helvetica,sans-serif;
    "
  >
    <div
      style="
        max-width:680px;
        margin:0 auto;
        padding:40px 20px;
      "
    >

      <!-- HEADER -->

      <div
        style="
          padding:30px;
          background:#111111;
          color:#ffffff;
          border-radius:20px 20px 0 0;
        "
      >
        <div
          style="
            margin-bottom:14px;
            color:#a39e96;
            font-size:10px;
            font-weight:700;
            letter-spacing:2px;
            text-transform:uppercase;
          "
        >
          My Academic Tutor
        </div>

        <h1
          style="
            margin:0;
            font-size:28px;
            font-weight:600;
            line-height:1.15;
          "
        >
          New website enquiry
        </h1>
      </div>


      <!-- CONTENT -->

      <div
        style="
          padding:30px;
          background:#ffffff;
          border-radius:0 0 20px 20px;
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
            "Subject",
            data.subjectArea
          )}

          ${emailRow(
            "Level",
            data.level
          )}

          ${emailRow(
            "Topic / course",
            data.topic
          )}

          ${emailRow(
            "Timing",
            data.timing
          )}
        </table>


        <!-- GOAL -->

        <div
          style="
            margin-top:28px;
            padding-top:22px;
            border-top:1px solid #e8e3da;
          "
        >
          <div
            style="
              margin-bottom:8px;
              color:#77716a;
              font-size:10px;
              font-weight:700;
              letter-spacing:1.2px;
              text-transform:uppercase;
            "
          >
            Goal
          </div>

          <div
            style="
              color:#191919;
              font-size:14px;
              line-height:1.7;
              white-space:pre-wrap;
            "
          >${displayValue(
            data.goal
          )}</div>
        </div>


        <!-- MESSAGE -->

        <div
          style="
            margin-top:28px;
            padding-top:22px;
            border-top:1px solid #e8e3da;
          "
        >
          <div
            style="
              margin-bottom:8px;
              color:#77716a;
              font-size:10px;
              font-weight:700;
              letter-spacing:1.2px;
              text-transform:uppercase;
            "
          >
            Additional details
          </div>

          <div
            style="
              color:#191919;
              font-size:14px;
              line-height:1.7;
              white-space:pre-wrap;
            "
          >${displayValue(
            data.message
          )}</div>
        </div>


        <!-- REFERENCE -->

        <div
          style="
            margin-top:30px;
            padding-top:18px;
            border-top:1px solid #e8e3da;
            color:#99938a;
            font-size:10px;
          "
        >
          Submission reference:
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


/* ==========================================================================
   TEXT EMAIL
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
MY ACADEMIC TUTOR
New website enquiry

Enquiry type:
${data.enquiryType}

Name:
${data.name}

Email:
${data.email}

Subject:
${data.subjectArea || "Not provided"}

Level:
${data.level || "Not provided"}

Topic / course:
${data.topic || "Not provided"}

Timing:
${data.timing || "Not provided"}

GOAL
----
${data.goal}

ADDITIONAL DETAILS
------------------
${data.message || "Not provided"}

Submission reference:
${data.submissionId}
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
       Parse request
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
       * Return success silently.
       * Bots should not know that
       * they were detected.
       */

      return NextResponse.json({
        ok: true,
      });
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
       Clean values
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
      cleanMultiline(
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
       Required fields
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
       Gmail configuration
       ---------------------------------------------------------------------- */

    const gmailUser =
      process.env.GMAIL_USER;


    const gmailAppPassword =
      process.env
        .GMAIL_APP_PASSWORD
        ?.replace(
          /\s+/g,
          ""
        );


    const contactToEmail =
      process.env
        .CONTACT_TO_EMAIL ||
      gmailUser;


    if (
      !gmailUser ||
      !gmailAppPassword ||
      !contactToEmail
    ) {
      console.error(
        "Gmail contact configuration is incomplete."
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
       Submission
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


    /* ----------------------------------------------------------------------
       Gmail transporter
       ---------------------------------------------------------------------- */

    const transporter =
      nodemailer.createTransport({
        service: "gmail",

        auth: {
          user:
            gmailUser,

          pass:
            gmailAppPassword,
        },
      });


    /* ----------------------------------------------------------------------
       Subject
       ---------------------------------------------------------------------- */

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


    /* ----------------------------------------------------------------------
       Send
       ---------------------------------------------------------------------- */

    try {
      const info =
        await transporter.sendMail({
          from:
            `"My Academic Tutor" <${gmailUser}>`,

          to:
            contactToEmail,

          /*
           * When you click Reply,
           * Gmail should address the
           * response to the visitor.
           */
          replyTo:
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
        });


      console.log(
        "Contact email sent:",
        {
          submissionId,

          messageId:
            info.messageId,
        }
      );


      return NextResponse.json({
        ok: true,

        submissionId,
      });
    } catch (error) {
      console.error(
        "Gmail contact delivery failed:",
        error
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
   GET
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