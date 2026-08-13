import {
  readFile,
} from "fs/promises";

import {
  join,
} from "path";

import {
  PDFDocument,
  StandardFonts,
  rgb,
} from "pdf-lib";

import {
  createClient,
} from "@/lib/supabase/server";

import {
  ensureCertificate,
} from "@/lib/certificates";


export const dynamic =
  "force-dynamic";


function formatCertificateDate(
  value: string
) {
  return new Intl
    .DateTimeFormat(
      "en-GB",
      {
        day:
          "numeric",
        month:
          "long",
        year:
          "numeric",
      }
    )
    .format(
      new Date(
        value
      )
    );
}


function safeFilename(
  value: string
) {
  return value
    .replace(
      /[^a-z0-9]+/gi,
      "-"
    )
    .replace(
      /^-+|-+$/g,
      ""
    )
    .toLowerCase();
}


export async function GET(
  _request: Request,
  {
    params,
  }: {
    params:
      Promise<{
        slug:
          string;
      }>;
  }
) {

  const {
    slug,
  } =
    await params;


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
    return new Response(
      "Sign in required.",
      {
        status:
          401,
      }
    );
  }


  const result =
    await ensureCertificate({
      supabase,
      userId,
      courseSlug:
        slug,
    });


  if (
    !result.eligible
  ) {
    return new Response(
      "Course completion requirements have not been met.",
      {
        status:
          403,
      }
    );
  }


  if (
    !result.certificate
  ) {
    return new Response(
      result.error ??
        "Certificate could not be created.",
      {
        status:
          500,
      }
    );
  }


  const certificate =
    result.certificate;


  if (
    certificate.revoked_at
  ) {
    return new Response(
      "This certificate has been revoked.",
      {
        status:
          403,
      }
    );
  }


  const pdf =
    await PDFDocument
      .create();


  const page =
    pdf.addPage([
      841.89,
      595.28,
    ]);


  const {
    width,
    height,
  } =
    page.getSize();


  const serif =
    await pdf.embedFont(
      StandardFonts
        .TimesRoman
    );


  const serifBold =
    await pdf.embedFont(
      StandardFonts
        .TimesRomanBold
    );


  const sans =
    await pdf.embedFont(
      StandardFonts
        .Helvetica
    );


  const sansBold =
    await pdf.embedFont(
      StandardFonts
        .HelveticaBold
    );


  /*
   * Palette intentionally mirrors
   * the website: warm paper, near
   * black, restrained neutral lines.
   */
  page.drawRectangle({
    x:
      0,
    y:
      0,
    width,
    height,
    color:
      rgb(
        0.965,
        0.953,
        0.929
      ),
  });


  page.drawRectangle({
    x:
      22,
    y:
      22,
    width:
      width -
      44,
    height:
      height -
      44,
    borderColor:
      rgb(
        0.10,
        0.10,
        0.10
      ),
    borderWidth:
      1.5,
  });


  page.drawRectangle({
    x:
      32,
    y:
      32,
    width:
      width -
      64,
    height:
      height -
      64,
    borderColor:
      rgb(
        0.68,
        0.65,
        0.60
      ),
    borderWidth:
      0.6,
  });


  /*
   * Logo is optional. If the file
   * cannot be embedded, certificate
   * generation still succeeds.
   */
  try {
    const logoBytes =
      await readFile(
        join(
          process.cwd(),
          "public",
          "logo.png"
        )
      );


    const logo =
      await pdf.embedPng(
        logoBytes
      );


    const logoWidth =
      112;


    const logoHeight =
      logo.height /
      logo.width *
      logoWidth;


    page.drawImage(
      logo,
      {
        x:
          (
            width -
            logoWidth
          ) /
          2,
        y:
          height -
          118,
        width:
          logoWidth,
        height:
          logoHeight,
      }
    );
  } catch {
    // Logo is decorative only.
  }


  function centeredText(
    text:
      string,
    y:
      number,
    size:
      number,
    font:
      any,
    color =
      rgb(
        0.10,
        0.10,
        0.10
      )
  ) {
    const textWidth =
      font.widthOfTextAtSize(
        text,
        size
      );


    page.drawText(
      text,
      {
        x:
          (
            width -
            textWidth
          ) /
          2,
        y,
        size,
        font,
        color,
      }
    );
  }


  centeredText(
    "CERTIFICATE OF COMPLETION",
    height -
      167,
    10,
    sansBold,
    rgb(
      0.38,
      0.36,
      0.33
    )
  );


  centeredText(
    "This certifies that",
    height -
      211,
    13,
    serif
  );


  centeredText(
    certificate
      .learner_name,
    height -
      260,
    31,
    serifBold
  );


  centeredText(
    "has successfully completed",
    height -
      298,
    13,
    serif
  );


  centeredText(
    certificate
      .course_title,
    height -
      343,
    24,
    serifBold
  );


  const completedText =
    `Completed ${formatCertificateDate(
      certificate
        .completed_at
    )}`;


  centeredText(
    completedText,
    height -
      386,
    10,
    sans,
    rgb(
      0.34,
      0.32,
      0.30
    )
  );


  if (
    certificate
      .final_assessment_percentage !==
    null
  ) {
    centeredText(
      `Final assessment: ${Number(
        certificate
          .final_assessment_percentage
      ).toFixed(
        0
      )}%`,
      height -
        408,
      9,
      sans,
      rgb(
        0.34,
        0.32,
        0.30
      )
    );
  }


  const ruleY =
    130;


  page.drawLine({
    start: {
      x:
        175,
      y:
        ruleY,
    },
    end: {
      x:
        width -
        175,
      y:
        ruleY,
    },
    thickness:
      0.7,
    color:
      rgb(
        0.58,
        0.55,
        0.51
      ),
  });


  centeredText(
    "My Academic Tutor",
    103,
    11,
    serifBold
  );


  centeredText(
    `Certificate ID: ${certificate.certificate_code}`,
    77,
    8,
    sans,
    rgb(
      0.40,
      0.38,
      0.35
    )
  );


  centeredText(
    `Verify at www.myacademictutor.com/certificate/${certificate.certificate_code}`,
    60,
    7.5,
    sans,
    rgb(
      0.40,
      0.38,
      0.35
    )
  );


  const bytes =
  await pdf.save();


const pdfBody =
  Uint8Array
    .from(
      bytes
    )
    .buffer;


return new Response(
  pdfBody,
  {
    status:
      200,

    headers: {
      "Content-Type":
        "application/pdf",

      "Content-Disposition":
        `attachment; filename="${safeFilename(
          certificate
            .course_title
        )}-certificate.pdf"`,

      "Cache-Control":
        "private, no-store",
    },
  }
);
}
