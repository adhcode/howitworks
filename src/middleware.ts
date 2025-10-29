import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define which routes are PUBLIC (no authentication required)
const publicRoutes = [
  "/",
  "/about",
  "/blog",
  "/contact",
  "/login",
  "/properties",
  "/services",
  "/investment-form",
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if it's a public route
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );

  // Allow public routes
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // For protected routes, we'll handle authentication on the client side
  // This middleware just ensures the routes exist
  if (pathname.startsWith('/admin') || 
      pathname.startsWith('/realtor') || 
      pathname.startsWith('/investor')) {
    return NextResponse.next();
  }

  // Redirect unknown routes to home
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - *.svg, *.png, *.jpg, *.jpeg, *.gif, *.webp (image files)
     * - *.js, *.css (static assets)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|js|css)$).*)",
  ],
}; 