// middleware.js atau pages/_middleware.js
import {NextResponse} from 'next/server';
import {getState as getUserState} from '@/lib/useUserStore';
import {getState as getAuthState} from '@/lib/authStore';

export async function middleware(request) {
    const { pathname } = request.nextUrl;

  if (!getAuthState && !pathname.startsWith('/login') && !pathname.startsWith('/callback')) {
    // Redirect to login page if no token is found
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Optionally, validate the token (e.g., with an API call)

  // Fetch user profile from your Zustand store or an API

  if (!getUserState && !pathname.startsWith('/login') && !pathname.startsWith('/callback')) {
    // Fetch user profile from an API if not available in the Zustand store
    // Example:
    // const response = await fetch('https://api.example.com/profile', {
    //   headers: { 'Authorization': `Bearer ${token}` }
    // });
    // const userProfile = await response.json();

    // If profile is missing or incomplete, redirect to profile completion page
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  // Continue to the requested page if the profile is complete
  return NextResponse.next();
}

export const config = {
  matcher: ['/store/:path*', '/cart/:path*', '/products/:path*'],
}