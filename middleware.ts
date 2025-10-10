import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const authToken = request.cookies.get("auth_token");

    if ((pathname === '/auth' || pathname === '/') && !authToken?.value) {
        console.log('redirect2');

        return NextResponse.next();
    }

    if (!authToken?.value) {
        console.log('redirect');
        return NextResponse.redirect(new URL('/auth', request.url))
    }

    try {
        await jwtVerify(authToken.value, new TextEncoder().encode('a-string-secret-at-least-256-bits-long'))

        if (pathname === '/auth' || pathname === '/') return NextResponse.redirect(new URL('/network/browse', request.url));
    } catch {
        return NextResponse.redirect(new URL('/auth', request.url))
    }

    return NextResponse.next();
}

// Filter routes that allow middleware
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}