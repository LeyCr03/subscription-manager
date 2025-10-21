import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { URL } from 'url';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  console.log({accessToken})

  const protectedRoutes = ['/dashboard']; // Example protected routes

  const authRoutes = ['/login', '/register'];

 /* if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    if (!accessToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (authRoutes.includes(request.nextUrl.pathname)) {
    if (accessToken) {
      return NextResponse.redirect(new URL('/', request.url)); // Redirect logged-in users away from auth pages
    }
  }

  return NextResponse.next();*/
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}