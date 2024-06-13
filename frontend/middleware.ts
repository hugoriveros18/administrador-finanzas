import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith("/categorias") ||
    request.nextUrl.pathname.startsWith("/cuentas") ||
    request.nextUrl.pathname.startsWith("/trasacciones")
  ) {
    let authToken = request.cookies.get("auth-token")?.value;

    if (!authToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const response = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: `auth-token=${authToken}`,
        },
        body: JSON.stringify({
          query: `
          query IsAuth {
            isAuth
          }
        `,
        }),
      });

      const result = await response.json();

      if (result.data.isAuth) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else if (
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/signup")
  ) {
    let authToken = request.cookies.get("auth-token")?.value;

    if (authToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}
