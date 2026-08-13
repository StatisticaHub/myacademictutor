import type {
  Metadata,
} from "next";

import Link from "next/link";

import {
  createClient,
} from "@/lib/supabase/server";


export const dynamic =
  "force-dynamic";


export const metadata:
  Metadata = {

  title:
    "Verify Certificate",

  description:
    "Verify a My Academic Tutor course certificate.",

  robots: {
    index:
      false,
    follow:
      true,
  },
};


type PageProps = {
  params:
    Promise<{
      code:
        string;
    }>;
};


function formatDate(
  value:
    string
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


export default async function VerifyCertificatePage({
  params,
}: PageProps) {

  const {
    code,
  } =
    await params;


  const cleanCode =
    decodeURIComponent(
      code
    )
      .trim()
      .toUpperCase();


  const supabase =
    await createClient();


  const {
    data,
    error,
  } =
    await supabase.rpc(
      "verify_certificate",
      {
        p_certificate_code:
          cleanCode,
      }
    );


  const certificate =
    Array.isArray(
      data
    )
      ? data[0]
      : null;


  const valid =
    !error &&
    certificate &&
    certificate.status ===
      "valid";


  return (
    <main className="certificate-verify-page">

      <section className="certificate-verify-hero">
        <div className="certificate-verify-shell">

          <span>
            Certificate verification
          </span>

          <h1>
            {valid
              ? "Certificate verified."
              : "Certificate not verified."}
          </h1>

          <p>
            Certificate ID{" "}
            <strong>
              {cleanCode}
            </strong>
          </p>

        </div>
      </section>


      <section className="certificate-verify-content">
        <div className="certificate-verify-shell">

          {valid ? (

            <div className="certificate-verify-card valid">

              <div className="certificate-verify-status">
                ✓ Valid certificate
              </div>


              <dl>

                <div>
                  <dt>
                    Learner
                  </dt>

                  <dd>
                    {certificate
                      .learner_name}
                  </dd>
                </div>


                <div>
                  <dt>
                    Course
                  </dt>

                  <dd>
                    {certificate
                      .course_title}
                  </dd>
                </div>


                <div>
                  <dt>
                    Completed
                  </dt>

                  <dd>
                    {formatDate(
                      certificate
                        .completed_at
                    )}
                  </dd>
                </div>


                <div>
                  <dt>
                    Final assessment
                  </dt>

                  <dd>
                    {certificate
                      .final_assessment_percentage ===
                    null
                      ? "Not recorded"
                      : `${Number(
                          certificate
                            .final_assessment_percentage
                        ).toFixed(
                          0
                        )}%`}
                  </dd>
                </div>


                <div>
                  <dt>
                    Issued
                  </dt>

                  <dd>
                    {formatDate(
                      certificate
                        .issued_at
                    )}
                  </dd>
                </div>

              </dl>

            </div>

          ) : (

            <div className="certificate-verify-card invalid">

              <div className="certificate-verify-status">
                No valid certificate found
              </div>

              <p>
                Check the certificate
                ID carefully. A revoked
                or unknown certificate
                will not be shown as
                valid.
              </p>

            </div>

          )}


          <div className="certificate-verify-actions">

            <Link
              href="/"
              className="button"
            >
              My Academic Tutor
            </Link>


            <Link
              href="/certificate-policy"
              className="button button-outline"
            >
              Certificate policy
            </Link>

          </div>

        </div>
      </section>

    </main>
  );
}
