import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define a list of public routes that don't require authentication
const publicRoutes = ['/login', '/auth/signup'];

export function middleware(request: NextRequest) {
  // Get the token from cookies (or wherever you store it)
  const token = request.cookies.get('token');

  // Check if the request is for a public route
  const isPublicRoute = publicRoutes.some(route => request.nextUrl.pathname.startsWith(route));

  // If the user is not authenticated and trying to access a protected route
  if (!token && !isPublicRoute) {
    // Redirect to the login page
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Specify which paths this middleware should apply to
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'], // Exclude API routes and static files
};