import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

export default withAuth(
  /* Augments requests with the session user's token */
  /* The middleware function will only be invoked if the authorized callback returns true. */
  function middleware(request: NextRequestWithAuth){
    console.log('middleware');

    if (request.nextUrl.pathname.startsWith("/app/admin/dashboard")
      && request.nextauth.token?.role !== "admin") {
      return NextResponse.rewrite(
        new URL("/403", request.url)
      )
    }

  },
  {
    callbacks: {
      authorized: ({token}) => {
        console.log(token);
        return token?.role === 'admin' || token?.role === 'user'
      }
    }
  }

)

export const config = {matcher: ['/app/collection', '/app/admin/dashboard']}