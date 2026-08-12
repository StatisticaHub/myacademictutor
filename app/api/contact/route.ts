import {
  type NextRequest,
  NextResponse,
} from "next/server";


/* ==========================================================================
   CONFIGURATION
   ========================================================================== */

const RATE_LIMIT_WINDOW_MS =
  10 * 60 * 1000;

const RATE_LIMIT_MAX_REQUESTS = 5;

const MAX_LENGTHS = {
  name: 120,
  email: 254,
  enquiryType: 100,
  subjectArea: 100,
  level: 100,
  topic: 500,
  goal: 2500,
  timing: 120,
  subject: 300,
  message: 6000,
  additionalMessage: 4000,
};


/* ==========================================================================
   TYPES
   ========================================================================== */

type ContactRequestBody = {
  name?: unknown;
  email?: unknown;

  enquiryType?: unknown;
  subjectArea?: unknown;
  level?: unknown;
  topic?: unknown;
  goal?: unknown;
  timing?: unknown;

  subject?: unknown;
  message?: unknown;
  additionalMessage?: unknown;

  /*
   * Honeypot field.
   *
   * Normal users will never fill this.
   * Basic bots sometimes do.
   */
  website?: unknown;
};


type RateLimitEntry = {
  count: number;
  resetAt: number;
};


/* ==========================================================================
   BASIC IN-MEMORY RATE LIMIT
   ========================================================================== */

/*
 * This is deliberately simple.
 *
 * It helps during development and provides a basic defensive layer,
 * but serverless instances may not share memory.
 *
 * Before significant production traffic, this can later be replaced
 * with a persistent rate limiter such as Redis / Upstash.
 */

const rateLimitStore =
  new Map<
    string,
    RateLimitEntry
  >();


/* ==========================================================================
   HELPERS
   ========================================================================== */

function cleanString(
  value: unknown,
  maxLength: number
) {
  if (
    typeof value !== "string"
  ) {
    return "";
  }

  return value
    .trim()
    .slice(0, maxLength);
}


function isValidEmail(
  email: string
) {
  /*
   * Deliberately practical rather than
   * attempting complete RFC validation.
   */

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email
  );
}


function getClientIdentifier(
  request: NextRequest
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
    ) || "unknown"
  );
}


function checkRateLimit(
  identifier: string
) {
  const now = Date.now();

  const existing =
    rateLimitStore.get(
      identifier
    );


  if (
    !existing ||
    existing.resetAt <= now
  ) {
    rateLimitStore.set(
      identifier,
      {
        count: 1,

        resetAt:
          now +
          RATE_LIMIT_WINDOW_MS,
      }
    );

    return {
      allowed: true,
      retryAfter: 0,
    };
  }


  if (
    existing.count >=
    RATE_LIMIT_MAX_REQUESTS
  ) {
    return {
      allowed: false,

      retryAfter:
        Math.ceil(
          (
            existing.resetAt -
            now
          ) / 1000
        ),
    };
  }


  existing.count += 1;

  rateLimitStore.set(
    identifier,
    existing
  );


  return {
    allowed: true,
    retryAfter: 0,
  };
}


/* ==========================================================================
   POST
   ========================================================================== */

export async function POST(
  request: NextRequest
) {
  /* ------------------------------------------------------------------------
     1. Rate limit
     ------------------------------------------------------------------------ */

  const clientIdentifier =
    getClientIdentifier(request);

  const rateLimit =
    checkRateLimit(
      clientIdentifier
    );


  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        error:
          "Too many enquiries have been submitted from this connection. Please wait a few minutes and try again.",
      },

      {
        status: 429,

        headers: {
          "Retry-After":
            String(
              rateLimit.retryAfter
            ),
        },
      }
    );
  }


  /* ------------------------------------------------------------------------
     2. Parse JSON
     ------------------------------------------------------------------------ */

  let body: ContactRequestBody;


  try {
    body =
      (await request.json()) as ContactRequestBody;
  } catch {
    return NextResponse.json(
      {
        error:
          "The enquiry could not be read. Please refresh the page and try again.",
      },

      {
        status: 400,
      }
    );
  }


  /* ------------------------------------------------------------------------
     3. Honeypot
     ------------------------------------------------------------------------ */

  const honeypot =
    cleanString(
      body.website,
      200
    );


  if (honeypot) {
    /*
     * Return a normal-looking
     * response to automated spam.
     */

    return NextResponse.json(
      {
        success: true,
      },

      {
        status: 200,
      }
    );
  }


  /* ------------------------------------------------------------------------
     4. Clean fields
     ------------------------------------------------------------------------ */

  const name =
    cleanString(
      body.name,
      MAX_LENGTHS.name
    );

  const email =
    cleanString(
      body.email,
      MAX_LENGTHS.email
    )
      .toLowerCase();


  const enquiryType =
    cleanString(
      body.enquiryType,
      MAX_LENGTHS.enquiryType
    );

  const subjectArea =
    cleanString(
      body.subjectArea,
      MAX_LENGTHS.subjectArea
    );

  const level =
    cleanString(
      body.level,
      MAX_LENGTHS.level
    );

  const topic =
    cleanString(
      body.topic,
      MAX_LENGTHS.topic
    );

  const goal =
    cleanString(
      body.goal,
      MAX_LENGTHS.goal
    );

  const timing =
    cleanString(
      body.timing,
      MAX_LENGTHS.timing
    );

  const subject =
    cleanString(
      body.subject,
      MAX_LENGTHS.subject
    );

  const message =
    cleanString(
      body.message,
      MAX_LENGTHS.message
    );

  const additionalMessage =
    cleanString(
      body.additionalMessage,
      MAX_LENGTHS.additionalMessage
    );


  /* ------------------------------------------------------------------------
     5. Required-field validation
     ------------------------------------------------------------------------ */

  if (!name) {
    return NextResponse.json(
      {
        error:
          "Please enter your name.",
      },

      {
        status: 400,
      }
    );
  }


  if (!email) {
    return NextResponse.json(
      {
        error:
          "Please enter your email address.",
      },

      {
        status: 400,
      }
    );
  }


  if (
    !isValidEmail(email)
  ) {
    return NextResponse.json(
      {
        error:
          "Please enter a valid email address.",
      },

      {
        status: 400,
      }
    );
  }


  if (!enquiryType) {
    return NextResponse.json(
      {
        error:
          "Please select an enquiry type.",
      },

      {
        status: 400,
      }
    );
  }


  if (!goal) {
    return NextResponse.json(
      {
        error:
          "Please tell us what you are trying to achieve.",
      },

      {
        status: 400,
      }
    );
  }


  /* ------------------------------------------------------------------------
     6. Build structured enquiry
     ------------------------------------------------------------------------ */

  const requestId =
    crypto.randomUUID();

  const receivedAt =
    new Date().toISOString();


  const enquiry = {
    id: requestId,
    receivedAt,

    contact: {
      name,
      email,
    },

    enquiry: {
      type: enquiryType,

      subjectArea:
        subjectArea || null,

      level:
        level || null,

      topic:
        topic || null,

      goal,

      timing:
        timing || null,

      additionalMessage:
        additionalMessage ||
        null,
    },

    /*
     * These are retained because
     * the client also generates a
     * human-readable email-style
     * subject and message.
     */

    formatted: {
      subject:
        subject ||
        `${enquiryType} enquiry`,

      message:
        message ||
        [
          `Name: ${name}`,
          `Email: ${email}`,
          `Enquiry type: ${enquiryType}`,
          `Subject: ${
            subjectArea ||
            "Not specified"
          }`,
          `Level: ${
            level ||
            "Not specified"
          }`,
          `Topic: ${
            topic ||
            "Not specified"
          }`,
          `Goal: ${goal}`,
          `Timing: ${
            timing ||
            "Not specified"
          }`,
          "",
          additionalMessage ||
            "No additional details provided.",
        ].join("\n"),
    },
  };


  /* ------------------------------------------------------------------------
     7. Delivery configuration
     ------------------------------------------------------------------------ */

  const webhookUrl =
    process.env
      .CONTACT_WEBHOOK_URL;

  const webhookSecret =
    process.env
      .CONTACT_WEBHOOK_SECRET;


  /*
   * If a delivery webhook has been
   * configured, send the structured
   * enquiry to it.
   */

  if (webhookUrl) {
    try {
      const deliveryResponse =
        await fetch(
          webhookUrl,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              ...(webhookSecret
                ? {
                    Authorization:
                      `Bearer ${webhookSecret}`,
                  }
                : {}),
            },

            body:
              JSON.stringify(
                enquiry
              ),

            cache: "no-store",
          }
        );


      if (
        !deliveryResponse.ok
      ) {
        console.error(
          "Contact webhook returned an error:",
          deliveryResponse.status
        );


        return NextResponse.json(
          {
            error:
              "Your enquiry could not be delivered at the moment. Please try again shortly.",
          },

          {
            status: 502,
          }
        );
      }


      return NextResponse.json(
        {
          success: true,

          requestId,
        },

        {
          status: 200,
        }
      );
    } catch (error) {
      console.error(
        "Contact delivery failed:",
        error
      );


      return NextResponse.json(
        {
          error:
            "Your enquiry could not be delivered at the moment. Please try again shortly.",
        },

        {
          status: 502,
        }
      );
    }
  }


  /* ------------------------------------------------------------------------
     8. Local development behaviour
     ------------------------------------------------------------------------ */

  if (
    process.env.NODE_ENV ===
    "development"
  ) {
    /*
     * We deliberately do NOT claim
     * that an email was sent.
     *
     * The enquiry is printed in the
     * local development terminal so
     * the complete form workflow can
     * be tested before an email /
     * webhook service is connected.
     */

    console.info(
      "\n========================================"
    );

    console.info(
      "CONTACT FORM — DEVELOPMENT SUBMISSION"
    );

    console.info(
      "========================================"
    );

    console.info(
      JSON.stringify(
        enquiry,
        null,
        2
      )
    );

    console.info(
      "========================================\n"
    );


    return NextResponse.json(
      {
        success: true,

        requestId,

        development: true,

        message:
          "Development submission accepted. No external delivery service is configured.",
      },

      {
        status: 200,
      }
    );
  }


  /* ------------------------------------------------------------------------
     9. Production without delivery
     ------------------------------------------------------------------------ */

  console.error(
    "Contact form submission received, but CONTACT_WEBHOOK_URL is not configured."
  );


  return NextResponse.json(
    {
      error:
        "Contact delivery is temporarily unavailable. Please try again later.",
    },

    {
      status: 503,
    }
  );
}


/* ==========================================================================
   OTHER METHODS
   ========================================================================== */

export async function GET() {
  return NextResponse.json(
    {
      error:
        "Method not allowed.",
    },

    {
      status: 405,

      headers: {
        Allow: "POST",
      },
    }
  );
}