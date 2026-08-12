import { createServerClient } from "@supabase/ssr";
import {
  NextResponse,
  type NextRequest,
} from "next/server";

export async function updateSession(
  request: NextRequest
) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env
      .NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet, headers) {
          /*
           * Update the request cookies.
           */
          cookiesToSet.forEach(
            ({ name, value }) => {
              request.cookies.set(
                name,
                value
              );
            }
          );

          /*
           * Create the response using
           * the updated request.
           */
          response = NextResponse.next({
            request,
          });

          /*
           * Send refreshed cookies
           * back to the browser.
           */
          cookiesToSet.forEach(
            ({
              name,
              value,
              options,
            }) => {
              response.cookies.set(
                name,
                value,
                options
              );
            }
          );

          /*
           * Supabase may provide
           * cache-control headers
           * during session refresh.
           */
          Object.entries(headers).forEach(
            ([key, value]) => {
              response.headers.set(
                key,
                value
              );
            }
          );
        },
      },
    }
  );

  /*
   * Validate / refresh the JWT.
   *
   * Do not replace this with
   * getSession() for server-side
   * authentication.
   */
  await supabase.auth.getClaims();

  return response;
}